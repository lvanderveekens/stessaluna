<?php

namespace App\EventSubscriber;

use Symfony\Component\HttpFoundation\Cookie;
use Lexik\Bundle\JWTAuthenticationBundle\Events;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Event\AuthenticationSuccessEvent;
use Psr\Log\LoggerInterface;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;

class AccessTokenSubscriber implements EventSubscriberInterface
{
    private $params;
    private $logger;

    public function __construct(ParameterBagInterface $params, LoggerInterface $logger)
    {
        $this->params = $params;
        $this->logger = $logger;
    }

    public function setAccessTokenCookie(AuthenticationSuccessEvent $event)
    {
        $token = $event->getData()['token'];
        if ($token) {
            $this->logger->info("@@@ New token found");
            $tokenTtl = $this->params->get("lexik_jwt_authentication.token_ttl");

            $response = $event->getResponse();
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
    }

    public static function getSubscribedEvents()
    {
        return [
            Events::AUTHENTICATION_SUCCESS => 'setAccessTokenCookie'
        ];
    }
}
