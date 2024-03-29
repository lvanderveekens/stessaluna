<?php
declare(strict_types=1);

namespace Stessaluna\User\Controller;

use Stessaluna\AbstractController;
use Stessaluna\User\PasswordResetter;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\Routing\Annotation\Route;
use SymfonyCasts\Bundle\ResetPassword\Controller\ResetPasswordControllerTrait;
use SymfonyCasts\Bundle\ResetPassword\ResetPasswordHelperInterface;

/**
 * @Route("/api/reset-password")
 */
class ResetPasswordController extends AbstractController
{
    use ResetPasswordControllerTrait;

    private $resetPasswordHelper;

    /**
     * @var PasswordResetter
     */
    private $passwordResetter;

    public function __construct(ResetPasswordHelperInterface $resetPasswordHelper, PasswordResetter $passwordResetter)
    {
        $this->resetPasswordHelper = $resetPasswordHelper;
        $this->passwordResetter = $passwordResetter;
    }

    /**
     * Send a mail containing a password reset link.
     *
     * @Route(methods={"POST"})
     */
    public function sendPasswordResetMail(Request $request): Response
    {
        $this->passwordResetter->sendPasswordResetMail(
            $request->get('email')
        );
        return new Response();
    }

    /**
     * Validates and process the reset URL that the user clicked in their email.
     *
     * @Route("/reset", methods={"POST"})
     */
    public function reset(Request $request): Response
    {
        $token = $request->get('token');
        if (!$token) {
            throw new BadRequestHttpException("Password reset token not found");
        }

        $this->passwordResetter->reset($token, $request->get('newPassword'));
        return new Response();
    }
}
