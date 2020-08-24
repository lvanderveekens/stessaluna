<?php

declare(strict_types=1);

namespace Stessaluna\Vote\Repository;

use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;
use Psr\Log\LoggerInterface;
use Stessaluna\Vote\Entity\Vote;

/**
 * @method Vote|null find($id, $lockMode = null, $lockVersion = null)
 * @method Vote|null findOneBy(array $criteria, array $orderBy = null)
 * @method Vote[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class VoteRepository extends ServiceEntityRepository
{
    /** @var LoggerInterface */
    private $logger;

    public function __construct(ManagerRegistry $registry, LoggerInterface $logger)
    {
        parent::__construct($registry, Vote::class);
        $this->logger = $logger;
    }

    public function save(Vote $Vote): Vote
    {
        $this->getEntityManager()->persist($Vote);
        $this->getEntityManager()->flush();
        return $Vote;
    }

    public function delete(Vote $Vote)
    {
        $this->getEntityManager()->remove($Vote);
        $this->getEntityManager()->flush();
    }
}