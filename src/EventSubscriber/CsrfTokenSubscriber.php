<?php

/*
 * (c) Kévin Dunglas <dunglas@gmail.com>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace App\EventSubscriber;

use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\Cookie;
use Symfony\Component\HttpKernel\Event\ResponseEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Security\Csrf\CsrfTokenManagerInterface;

class CsrfTokenSubscriber implements EventSubscriberInterface
{
    /**
     * @var CsrfTokenManagerInterface
     */
    protected $csrfTokenManager;

    public function __construct(CsrfTokenManagerInterface $csrfTokenManager)
    {
        $this->csrfTokenManager = $csrfTokenManager;
    }

    public function setCsrfTokenCookie(ResponseEvent $event)
    {
        // TODO: do I need this check?
        if (!$event->isMasterRequest()) {
            return;
        }

        // TODO: don't include in responses from /api

        // TODO: make cookie secure later
        $event->getResponse()->headers->setCookie(new Cookie(
            "csrf_token",
            $this->csrfTokenManager->getToken("react")->getValue(),
            0 /* expire */,
            "/" /* path */,
            null /* domain */,
            false /* secure */,
            false /* httpOnly */,
            false /* raw */,
            Cookie::SAMESITE_STRICT
        ));
    }

    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::RESPONSE => 'setCsrfTokenCookie'
        ];
    }
}