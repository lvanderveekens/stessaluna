<?php
declare(strict_types=1);


namespace Stessaluna\Validation;


use Symfony\Component\Validator\Validator\ValidatorInterface;

class ValidatorWrapper
{
    /**
     * @var ValidatorInterface
     */
    private $validator;

    public function __construct(ValidatorInterface $validator)
    {
        $this->validator = $validator;
    }

    public function validate($value)
    {
        $errors = $this->validator->validate($value);
        if (count($errors) > 0) {
            throw new ValidationException($errors->get(0)->getMessage());
        }
    }
}