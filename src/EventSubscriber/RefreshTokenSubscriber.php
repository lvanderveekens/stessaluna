<?php

namespace App\EventSubscriber;

use Lexik\Bundle\JWTAuthenticationBundle\Event\AuthenticationSuccessEvent;
use Lexik\Bundle\JWTAuthenticationBundle\Events;
use Psr\Log\LoggerInterface;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\Cookie;
use Symfony\Component\HttpKernel\Event\RequestEvent;
use Symfony\Component\HttpKernel\KernelEvents;

class RefreshTokenSubscriber implements EventSubscriberInterface {

    private $params;
    private $logger;

    public function __construct(ParameterBagInterface $params, LoggerInterface $logger)
    {
        $this->params = $params;
        $this->logger = $logger;
    }

    public function setRefreshTokenAttribute(RequestEvent $event) {
        $request = $event->getRequest();
        // The GesdinetJWTRefreshTokenBundle expects the refresh token at a certain place in the request
        $request->attributes->set('refresh_token', $request->cookies->get('refresh_token'));
    }

    public function setRefreshTokenCookie(AuthenticationSuccessEvent $event)
    {
        $refreshToken = $event->getData()['refresh_token'];
        if ($refreshToken) {
            $this->logger->info("@@@ New refresh token");
            $refreshTokenTtl = $this->params->get("gesdinet_jwt_refresh_token.ttl");

            $response = $event->getResponse();
            $response->headers->setCookie(
                // TODO: set secure to true when using https
                new Cookie(
                    "refresh_token",
                    $refreshToken,
                    new \DateTime('+' . $refreshTokenTtl . ' seconds'),
                    "/",
                    null,
                    false,
                    true,
                    false,
                    'strict'
                )
            );
        }
    }

    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::REQUEST => 'setRefreshTokenAttribute',
            Events::AUTHENTICATION_SUCCESS => 'setRefreshTokenCookie'
        ];
    }
}