<?php

namespace Stessaluna\Auth\Controller;

use Gesdinet\JWTRefreshTokenBundle\Entity\RefreshToken;
use Psr\Log\LoggerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class LogoutController extends AbstractController
{
    /** @var LoggerInterface */
    private $logger;

    public function __construct(LoggerInterface $logger)
    {
        $this->logger = $logger;
    }

    /**
     * @Route("/api/logout", methods={"POST"})
     */
    public function logOut(Request $request): Response
    {
        $user = $this->getUser();
        $em = $this->getDoctrine()->getManager();

        $refreshTokens = $em->getRepository(RefreshToken::class)
            ->findBy(['username' => $user->getUserName()]);

        foreach ($refreshTokens as $refreshToken) {
            $em->remove($refreshToken);
        }
        $em->flush();
        $this->logger->debug('Removed '.count($refreshTokens).' refresh token(s).');

        $response = new Response();
        $response->headers->clearCookie('access_token');
        $response->headers->clearCookie('refresh_token');
        return $response;
    }
}