<?php

namespace Stessaluna\Auth\Token\EventSubscriber;

use Lexik\Bundle\JWTAuthenticationBundle\Event\AuthenticationFailureEvent;
use Lexik\Bundle\JWTAuthenticationBundle\Event\AuthenticationSuccessEvent;
use Lexik\Bundle\JWTAuthenticationBundle\Events;
use Lexik\Bundle\JWTAuthenticationBundle\Response\JWTAuthenticationFailureResponse;
use Psr\Log\LoggerInterface;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\Cookie;

class AccessTokenSubscriber implements EventSubscriberInterface
{
    private $params;
    private $logger;

    public function __construct(ParameterBagInterface $params, LoggerInterface $logger)
    {
        $this->params = $params;
        $this->logger = $logger;
    }

    public static function getSubscribedEvents()
    {
        return [
            Events::AUTHENTICATION_SUCCESS => 'handleAuthenticationSuccess',
            Events::AUTHENTICATION_FAILURE => 'handleAuthenticationFailure'
        ];
    }

    public function handleAuthenticationSuccess(AuthenticationSuccessEvent $event)
    {
        $token = $event->getData()['token'];
        if ($token) {
            $this->logger->info("@@@ New token found");
            $tokenTtl = $this->params->get("lexik_jwt_authentication.token_ttl");

            $response = $event->getResponse();
            $response->headers->setCookie(
                new Cookie(
                    "access_token",
                    $token,
                    new \DateTime('+' . $tokenTtl . ' seconds'),
                    "/",
                    null,
                    true /* secure */,
                    true,
                    false,
                    'strict'
                )
            );
        }
    }

    public function handleAuthenticationFailure(AuthenticationFailureEvent $event)
    {
        $response = new JWTAuthenticationFailureResponse("Bad credentials");
        $event->setResponse($response);
    }
}
