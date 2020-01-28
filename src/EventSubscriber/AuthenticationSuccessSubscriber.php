<?php

namespace App\EventSubscriber;

use Symfony\Component\HttpFoundation\Cookie;
use Lexik\Bundle\JWTAuthenticationBundle\Events;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Event\AuthenticationSuccessEvent;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;
use Symfony\Component\HttpFoundation\Response;

class AuthenticationSuccessSubscriber implements EventSubscriberInterface
{
    private $params;

    public function __construct(ParameterBagInterface $params)
    {
        $this->params = $params;
    }

    public static function getSubscribedEvents()
    {
        return [
            Events::AUTHENTICATION_SUCCESS => 'onAuthenticationSuccess'
        ];
    }

    public function onAuthenticationSuccess(AuthenticationSuccessEvent $event)
    {
        $eventData = $event->getData();

        if (isset($eventData['token']) && isset($eventData['refresh_token'])) {
            $response = $event->getResponse();
            $this->setTokenCookie($response, $eventData['token']);
            $this->setRefreshTokenCookie($response, $eventData['refresh_token']);
        }
    }

    private function setTokenCookie(Response $response, string $token)
    {
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
