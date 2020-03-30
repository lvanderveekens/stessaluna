<?php 

namespace Stessaluna\Infrastructure\Exercise\Repository;

use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;
use Stessaluna\Domain\Exercise\Entity\Exercise;
use Stessaluna\Domain\Exercise\Repository\ExerciseRepository;

class ExerciseDoctrineRepository extends ServiceEntityRepository implements ExerciseRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Exercise::class);
    }

    function findById(int $id): Exercise
    {
        return $this->find($id);
    }

    function save(Exercise $exercise): Exercise
    {
        $this->getEntityManager()->persist($exercise);
        $this->getEntityManager()->flush();
        return $exercise;
    }

    // /**
    //  * @return Post[] Returns an array of Post objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('p')
            ->andWhere('p.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('p.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Post
    {
        return $this->createQueryBuilder('p')
            ->andWhere('p.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
