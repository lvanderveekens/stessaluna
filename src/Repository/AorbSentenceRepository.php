<?php

namespace App\Repository;

use App\Entity\AorbSentence;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;

/**
 * @method AorbSentences|null find($id, $lockMode = null, $lockVersion = null)
 * @method AorbSentences|null findOneBy(array $criteria, array $orderBy = null)
 * @method AorbSentences[]    findAll()
 * @method AorbSentences[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class AorbSentenceRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, AorbSentence::class);
    }

    // /**
    //  * @return AorbSentences[] Returns an array of AorbSentences objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('a')
            ->andWhere('a.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('a.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?AorbSentences
    {
        return $this->createQueryBuilder('a')
            ->andWhere('a.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
