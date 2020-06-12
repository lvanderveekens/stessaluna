<?php

declare(strict_types=1);

namespace Stessaluna\Exception\EventSubscriber;

use Google\Cloud\ErrorReporting\Bootstrap;
use Psr\Log\LoggerInterface;
use Stessaluna\Exception\NotAuthorException;
use Stessaluna\Exception\NotFoundException;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Event\ExceptionEvent;
use Symfony\Component\HttpKernel\Exception\HttpExceptionInterface;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\HttpKernel\KernelInterface;

class ExceptionSubscriber implements EventSubscriberInterface
{
    /** @var LoggerInterface */
    private $logger;

    /** @var KernelInterface */
    private $kernel;

    public function __construct(LoggerInterface $logger, KernelInterface $kernel)
    {
        $this->logger = $logger;
        $this->kernel = $kernel;
    }

    public static function getSubscribedEvents()
    {
        return array(
            KernelEvents::EXCEPTION => 'onExceptionEvent'
        );
    }

    public function onExceptionEvent(ExceptionEvent $event)
    {
        $this->logger->warning("ON EXCEPTION EVENT");

        $exception = $event->getThrowable();

        if ($this->kernel->getEnvironment() === 'prod') {
            Bootstrap::init();
            Bootstrap::exceptionHandler($exception);
        }

        $this->logger->error($exception);

        $response = new JsonResponse();

        if ($exception instanceof HttpExceptionInterface) {
            $response->setStatusCode($exception->getStatusCode());
            $response->headers->replace($exception->getHeaders());
        } elseif ($exception instanceof NotFoundException) {
            $response->setStatusCode(Response::HTTP_NOT_FOUND);
        } elseif ($exception instanceof NotAuthorException) {
            $response->setStatusCode(Response::HTTP_FORBIDDEN);
        } else {
            $response->setStatusCode(Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        $response->setJson(json_encode(array(
            'status'    => $response->getStatusCode(),
            'message'   => $exception->getMessage()
        ))) ;

        $event->setResponse($response);
    }
}