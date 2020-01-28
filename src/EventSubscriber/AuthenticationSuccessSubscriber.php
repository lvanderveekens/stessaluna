<?php

namespace App\EventSubscriber;

use Symfony\Component\HttpFoundation\Cookie;
use Lexik\Bundle\JWTAuthenticationBundle\Events;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Event\AuthenticationSuccessEvent;
use Psr\Log\LoggerInterface;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;
use Symfony\Component\HttpFoundation\Response;

class AuthenticationSuccessSubscriber implements EventSubscriberInterface
{
    public static function getSubscribedEvents()
    {
        return [
            Events::AUTHENTICATION_SUCCESS => 'onAuthenticationSuccess'
        ];
    }

    private $params;
    private $logger;

    public function __construct(ParameterBagInterface $params, LoggerInterface $logger)
    {
        $this->params = $params;
        $this->logger = $logger;
    }

    public function onAuthenticationSuccess(AuthenticationSuccessEvent $event)
    {
        $response = $event->getResponse();

        $token = $event->getData()['token'];
        if ($token) {
            $this->setTokenCookie($response, $token);
        }

        $refreshToken = $event->getData()['refresh_token'];
        if ($refreshToken) {
            $this->setRefreshTokenCookie($response, $refreshToken);
        }
    }

    private function setTokenCookie(Response $response, string $token)
    {
        $this->logger->info("@@@ New token found");
        $tokenTtl = $this->params->get("lexik_jwt_authentication.token_ttl");
        $response->headers->setCookie(
            // TODO: set secure to true when using https
            new Cookie(
                "access_token",
                $token,
                new \DateTime('+' . $tokenTtl . ' seconds'),
                "/",
                null,
                false,
                true,
                false,
                'strict'
            )
        );
    }

    private function setRefreshTokenCookie(Response $response, string $refreshToken) 
    {
        $this->logger->info("@@@ New refresh token");
        $refreshTokenTtl = $this->params->get("gesdinet_jwt_refresh_token.ttl");
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
