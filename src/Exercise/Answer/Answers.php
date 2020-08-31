<?php
declare(strict_types=1);


namespace Stessaluna\Exercise\Answer;


use Stessaluna\Exercise\Answer\Entity\Answer;
use Stessaluna\User\Entity\User;

class Answers
{
    public static function findByUser(array $answers, ?User $user): ?Answer
    {
        if ($user === null) {
            return null;
        }

        $answer = null;
        // TODO: use functional find?
        $answersFromUser = array_values(array_filter(
            $answers,
            function (Answer $answer) use ($user) {
                return $answer->getUser() === $user;
            }
        ));

        if (count($answersFromUser) > 0) {
            $answer = $answersFromUser[0];
        }
        return $answer;
    }
}
