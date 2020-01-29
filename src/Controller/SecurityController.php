<?php

namespace App\Controller;

use Gesdinet\JWTRefreshTokenBundle\Entity\RefreshToken;
use Psr\Log\LoggerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Cookie;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class SecurityController extends AbstractController
{

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
            ->findBy(array('username' => $user->getUserName()));

        foreach ($refreshTokens as $refreshToken) {
            $em->remove($refreshToken);
        }
        $em->flush();
        $this->logger->debug('Removed ' . count($refreshTokens) . ' refresh token(s).');

        $response = new Response();
        $response->headers->clearCookie("access_token");
        $response->headers->clearCookie("refresh_token");
        return $response;
    }
}