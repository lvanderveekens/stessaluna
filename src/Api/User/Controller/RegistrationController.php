<?php declare(strict_types=1);

namespace Stessaluna\Api\User\Controller;

use Stessaluna\Domain\User\Entity\User;
use Stessaluna\Domain\User\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

/**
 * @Route("/api/register")
 */
class RegistrationController extends AbstractController
{
    private UserRepository $userRepository;
    private UserPasswordEncoderInterface $passwordEncoder;

    public function __construct(UserRepository $userRepository, UserPasswordEncoderInterface $passwordEncoder)
    {
        $this->userRepository = $userRepository;
        $this->passwordEncoder = $passwordEncoder;
    }

    /**
     * @Route(methods={"POST"})
     */
    public function register(Request $request) : Response
    {
        $json = json_decode($request->getContent(), true);

        $user = new User();
        $user->setUsername($json['username']);

        $password = $this->passwordEncoder->encodePassword($user, $json['password']);
        $user->setPassword($password);

        $user = $this->userRepository->save($user);
        return new Response();
    }
}