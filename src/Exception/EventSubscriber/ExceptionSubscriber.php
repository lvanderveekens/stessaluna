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
use SymfonyCasts\Bundle\ResetPassword\Exception\ResetPasswordExceptionInterface;

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
        $message = $exception->getMessage();

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
        } elseif ($exception instanceof ResetPasswordExceptionInterface) {
            $response->setStatusCode(Response::HTTP_BAD_REQUEST);
            $message = $exception->getReason();
        } else {
            $response->setStatusCode(Response::HTTP_INTERNAL_SERVER_ERROR);
            // don't leak internal error messages to the client
            $message = "Something went wrong...";
        }

        $response->setJson(json_encode(array(
            'status'    => $response->getStatusCode(),
            'message'   => $message
        ))) ;

        $event->setResponse($response);
    }
}