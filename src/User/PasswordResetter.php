<?php
declare(strict_types=1);

namespace Stessaluna\User;

use Psr\Log\LoggerInterface;
use Stessaluna\User\Repository\UserRepository;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Address;
use SymfonyCasts\Bundle\ResetPassword\ResetPasswordHelperInterface;

class PasswordResetter
{
    /**
     * @var MailerInterface
     */
    private $mailer;
    /**
     * @var UserRepository
     */
    private $userRepository;
    /**
     * @var ResetPasswordHelperInterface
     */
    private $resetPasswordHelper;
    /**
     * @var LoggerInterface
     */
    private $logger;

    public function __construct(MailerInterface $mailer, UserRepository $userRepository,
                                ResetPasswordHelperInterface $resetPasswordHelper, LoggerInterface $logger)
    {
        $this->mailer = $mailer;
        $this->userRepository = $userRepository;
        $this->resetPasswordHelper = $resetPasswordHelper;
        $this->logger = $logger;
    }

    public function sendPasswordResetMail(string $email)
    {
        $user = $this->userRepository->findOneBy(['email' => $email]);
        if (!$user) {
            return;
        }

        // TODO: how to present these kinds of submit errors to the user?
        $resetToken = $this->resetPasswordHelper->generateResetToken($user);

        $email = (new TemplatedEmail())
            ->from(new Address('support@stessaluna.com', 'Stessaluna Support'))
            ->to($user->getEmail())
            ->subject('Your password reset request')
            ->htmlTemplate('reset_password/email.html.twig')
            ->context([
                'resetToken' => $resetToken,
                'tokenLifetime' => $this->resetPasswordHelper->getTokenLifetime(),
            ]);

        $this->mailer->send($email);
    }
}