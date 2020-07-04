<?php

declare(strict_types=1);

namespace Stessaluna\Image\Repository;

use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;
use Psr\Log\LoggerInterface;
use Stessaluna\Image\Entity\Image;

/**
 * @method Image|null find($id, $lockMode = null, $lockVersion = null)
 * @method Image|null findOneBy(array $criteria, array $orderBy = null)
 * @method Image[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ImageRepository extends ServiceEntityRepository
{
    /** @var LoggerInterface */
    private $logger;

    public function __construct(ManagerRegistry $registry, LoggerInterface $logger)
    {
        parent::__construct($registry, Image::class);
        $this->logger = $logger;
    }

    public function save(Image $image): Image
    {
        $this->getEntityManager()->persist($image);
        $this->getEntityManager()->flush();
        return $image;
    }

    public function delete(Image $image)
    {
        $this->getEntityManager()->remove($image);
        $this->getEntityManager()->flush();
    }

    public function getReference(int $id): Image
    {
        return $this->getEntityManager()->getReference(Image::class, $id);
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