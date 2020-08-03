<?php
declare(strict_types=1);

namespace Stessaluna\User;

use Psr\Log\LoggerInterface;
use Stessaluna\User\Entity\User;
use Stessaluna\User\Repository\UserRepository;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Address;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
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
    /**
     * @var UserPasswordEncoderInterface
     */
    private $passwordEncoder;

    public function __construct(MailerInterface $mailer, UserRepository $userRepository,
                                ResetPasswordHelperInterface $resetPasswordHelper,
                                UserPasswordEncoderInterface $passwordEncoder, LoggerInterface $logger)
    {
        $this->mailer = $mailer;
        $this->userRepository = $userRepository;
        $this->resetPasswordHelper = $resetPasswordHelper;
        $this->passwordEncoder= $passwordEncoder;
        $this->logger = $logger;
    }

    public function sendPasswordResetMail(string $email)
    {
        $user = $this->userRepository->findOneBy(['email' => $email]);
        if (!$user) {
            return;
        }

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

    public function reset(string $token, string $newPassword)
    {
        /** @var User $user */
        $user = $this->resetPasswordHelper->validateTokenAndFetchUser($token);

        // a password reset token should only be used once
        $this->resetPasswordHelper->removeResetRequest($token);

        $encodedPassword = $this->passwordEncoder->encodePassword($user, $newPassword);
        $user->setPassword($encodedPassword);

        $this->userRepository->save($user);
    }
}