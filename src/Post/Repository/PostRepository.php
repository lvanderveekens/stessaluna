<?php

declare(strict_types=1);

namespace Stessaluna\Post\Repository;

use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;
use Doctrine\ORM\Tools\Pagination\Paginator;
use Psr\Log\LoggerInterface;
use Stessaluna\Post\Entity\Post;

/**
 * @method Post|null find($id, $lockMode = null, $lockVersion = null)
 * @method Post|null findOneBy(array $criteria, array $orderBy = null)
 * @method Post[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class PostRepository extends ServiceEntityRepository
{
    private LoggerInterface $logger;

    public function __construct(ManagerRegistry $registry, LoggerInterface $logger)
    {
        parent::__construct($registry, Post::class);
        $this->logger = $logger;
    }

    /**
     * @param null|string[] $channels an array of channels (language codes) to filter by
     * @return Post[] all posts
     */
    public function getPosts(?array $channels, ?int $beforeId, ?int $limit): array
    {
        // using DQL here to select everything with one big query
        $qb = $this->getEntityManager()->createQueryBuilder()
            ->select("p, e, a, c")
            ->from($this->getEntityName(), "p")
            ->leftJoin("p.exercise", "e")
            ->leftJoin("e.answers", "a")
            ->leftJoin("p.comments", "c")
            ->orderBy('p.id', 'DESC');

        if ($channels != null) {
            $qb->andWhere("p.channel IN (:channels)")
                ->setParameter("channels", $channels);
        }

        if ($beforeId != null) {
            $qb->andWhere("p.id < ${beforeId}");
        }
        if ($limit != null) {
            $qb->setMaxResults($limit);
        }

        $paginator = new Paginator($qb->getQuery(), $fetchJoinCollection = true);
        $results = [];
        foreach ($paginator as $post) {
            array_push($results, $post);
        }
        return $results;
    }

    public function save(Post $post): Post
    {
        $this->getEntityManager()->persist($post);
        $this->getEntityManager()->flush();
        return $post;
    }

    public function delete(Post $post)
    {
        $this->getEntityManager()->remove($post);
        $this->getEntityManager()->flush();
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