<?php

namespace Stessaluna\Auth\Token\EventSubscriber;

use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\Cookie;
use Symfony\Component\HttpKernel\Event\RequestEvent;
use Symfony\Component\HttpKernel\Event\ResponseEvent;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Security\Csrf\CsrfToken;
use Symfony\Component\Security\Csrf\CsrfTokenManagerInterface;

class CsrfTokenSubscriber implements EventSubscriberInterface
{
    private const TOKEN_ID = 'react';

    /**
     * @var CsrfTokenManagerInterface
     */
    private $csrfTokenManager;

    public function __construct(CsrfTokenManagerInterface $csrfTokenManager)
    {
        $this->csrfTokenManager = $csrfTokenManager;
    }

    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::REQUEST => 'validateCsrfToken',
            KernelEvents::RESPONSE => 'setCsrfTokenCookie'
        ];
    }

    public function setCsrfTokenCookie(ResponseEvent $event)
    {
        $request = $event->getRequest();
        if ($request->getMethod() !== 'GET' || self::startsWith($request->getPathInfo(), '/api')) {
            return;
        }

        $event->getResponse()->headers->setCookie(new Cookie(
            "csrf_token",
            $this->csrfTokenManager->getToken(self::TOKEN_ID)->getValue(),
            0 /* expire */,
            "/" /* path */,
            null /* domain */,
            true /* secure */,
            false /* httpOnly */,
            false /* raw */,
            Cookie::SAMESITE_STRICT
        ));
    }

    public function validateCsrfToken(RequestEvent $event)
    {
        // $request = $event->getRequest();
        // if (
        //     !in_array($request->getMethod(), array('POST', 'PUT', 'PATCH', 'DELETE', 'LINK'))
        //     || !self::startsWith($request->getPathInfo(), '/api')
        // ) {
        //     return;
        // }

        // $token = $event->getRequest()->headers->get('X-CSRF-Token');
        // if (!$token || !$this->csrfTokenManager->isTokenValid(new CsrfToken(self::TOKEN_ID, $token))) {
        //     throw new AccessDeniedHttpException('Bad CSRF token.');
        // }
    }

    private static function startsWith($fullString, $part)
    {
        return strpos($fullString, $part) === 0;
    }
}