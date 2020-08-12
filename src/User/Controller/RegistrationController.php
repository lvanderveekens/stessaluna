<?php declare(strict_types=1);

namespace Stessaluna\User\Controller;

use JsonMapper;
use Stessaluna\AbstractController;
use Stessaluna\User\Dto\RegistrationRequest;
use Stessaluna\User\Entity\User;
use Stessaluna\User\Repository\UserRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

/**
 * @Route("/api/register")
 */
class RegistrationController extends AbstractController
{
    /** @var UserRepository */
    private $userRepository;

    /** @var UserPasswordEncoderInterface */
    private $passwordEncoder;

    public function __construct(UserRepository $userRepository, UserPasswordEncoderInterface $passwordEncoder)
    {
        $this->userRepository = $userRepository;
        $this->passwordEncoder = $passwordEncoder;
    }

    /**
     * @Route(methods={"POST"})
     */
    public function register(Request $request): Response
    {
        // TODO: move to service
        $registrationRequest = new RegistrationRequest();
        (new JsonMapper())->map(json_decode($request->getContent()), $registrationRequest);

        if ($this->userRepository->findByEmail($registrationRequest->email) != null) {
            throw new BadRequestHttpException("Email already taken");
        }

        if ($this->userRepository->findByUsername($registrationRequest->username) != null) {
            throw new BadRequestHttpException("Username already taken");
        }

        $user = new User();
        $user->setEmail($registrationRequest->email);
        $user->setUsername($registrationRequest->username);
        $user->setPassword($this->passwordEncoder->encodePassword($user, $registrationRequest->password));
        $user->setCountry($registrationRequest->country);

        $this->userRepository->save($user);

        return new Response();
    }
}