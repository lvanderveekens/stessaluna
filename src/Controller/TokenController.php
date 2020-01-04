<?php

namespace App\Controller;

use App\Entity\User;
use Lexik\Bundle\JWTAuthenticationBundle\Encoder\JWTEncoderInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Security\Core\Exception\BadCredentialsException;

/**
 * @Route("/api/token")
 */
class TokenController extends AbstractController {

    /**
     * @Route("/", methods={"POST"})
     */
    public function createToken(
        Request $request,
        UserPasswordEncoderInterface $passwordEncoder,
        JWTEncoderInterface $jwtEncoder
    ) {
        // TODO: get username and password from json body?

        $user = $this->getDoctrine()
            ->getRepository(User::class)
            ->findOneBy(['username' => $request->getUser()]);
        if (!$user) {
            throw $this->createNotFoundException('User not found');
        }

        $isValid = $passwordEncoder->isPasswordValid($user, $request->getPassword());
        if (!$isValid) {
            throw new BadCredentialsException();
        }

        $token = $jwtEncoder->encode([
            'username' => $user->getUsername(),
            'exp' => time() + 3600 // expires after 1 hour 
        ]);
        return $this->json(['token' => $token]);
    }
}