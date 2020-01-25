<?php

namespace App\Controller;

use Gesdinet\JWTRefreshTokenBundle\Entity\RefreshToken;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class SecurityController extends AbstractController
{
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

        return new Response('Removed ' . count($refreshTokens) . ' refresh token(s).');
    }
}