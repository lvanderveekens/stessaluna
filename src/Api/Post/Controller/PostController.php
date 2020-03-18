<?php

namespace Stessaluna\Api\Post\Controller;

use Exception;
use Psr\Log\LoggerInterface;
use Stessaluna\Api\Post\Aorb\Dto\AorbChoiceDto;
use Stessaluna\Api\Post\Aorb\Dto\AorbPostDto;
use Stessaluna\Api\Post\Aorb\Dto\AorbSentenceDto;
use Stessaluna\Api\Post\Comment\Dto\CommentConverter;
use Stessaluna\Api\Post\Dto\PostDto;
use Stessaluna\Api\User\Dto\UserConverter;
use Stessaluna\Domain\Post\Aorb\Entity\AorbPost;
use Stessaluna\Domain\Post\Entity\Post;
use Stessaluna\Domain\Post\Service\PostCreator;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/api/posts")
 */
class PostController extends AbstractController
{
    private $logger;

    private $commentConverter;

    private $userConverter;

    private $postCreator;

    public function __construct(
        LoggerInterface $logger,
        UserConverter $userConverter,
        CommentConverter $commentConverter,
        PostCreator $postCreator
    ) {
        $this->logger = $logger;
        $this->userConverter = $userConverter;
        $this->commentConverter = $commentConverter;
        $this->postCreator = $postCreator;
    }

    /**
     * @Route(methods={"GET"})
     */
    public function getPosts(): JsonResponse
    {
        $posts = $this->getDoctrine()
            ->getRepository(Post::class)
            ->findAll();

        return $this->json(array_map(function ($post) {
            return $this->convertToDto($post);
        }, $posts));
    }

    /**
     * @Route(methods={"POST"})
     */
    public function createPost(Request $request): JsonResponse
    {
        $type = $request->get('type');
        switch ($type) {
            case 'aorb':
                $post = $this->postCreator->createAorbPost($request->get('sentences'), $this->getUser());
                break;
            default:
                throw new BadRequestHttpException("Received unknown post type: $type");
        }
        return $this->json($this->convertToDto($post));
    }

    /**
     * @Route("/{id}", methods={"DELETE"})
     */
    public function deletePostById(int $id)
    {
        $em = $this->getDoctrine()->getManager();
        // TODO: what if $id does not exist? return 404
        $post = $em->getRepository(Post::class)->find($id);

        if ($this->getUser()->getId() != $post->getUser()->getId()) {
            throw new AccessDeniedHttpException("Only the author can delete this post");
        }

        if ($post->getImageFilename()) {
            try {
                $imagesDir = $this->getParameter('images_directory');
                unlink($imagesDir . '/' . $post->getImageFilename());
            } catch (Exception $e) {
                $this->logger->error($e);
            }
        }

        $em->remove($post);
        $em->flush();

        return new Response('Deleted post with id ' . $id);
    }

    private function convertToDto(Post $post): PostDto
    {
        if ($post instanceof AorbPost) {
            $dto = new AorbPostDto();

            $sentences = array_map(function ($s) {
                $choice = new AorbChoiceDto($s->getChoiceA(), $s->getChoiceB());
                return new AorbSentenceDto($s->getTextBefore(), $choice, $s->getTextAfter());
            }, $post->getSentences()->toArray());

            $dto->setSentences($sentences);

            $userDto = $this->userConverter->toDto($post->getUser());

            $dto->setId($post->getId());
            // $dto->setText($post->getText());
            $dto->setUser($userDto);
            $dto->setCreatedAt($post->getCreatedAt());

            $comments = array_map(function ($comment) {
                return $this->commentConverter->toDto($comment);
            }, $post->getComments()->toArray());

            $dto->setComments($comments);
            $dto->setAvatar($userDto->getAvatar());
        }


        // $dto = new PostDto();

        // if ($post->getImageFilename()) {
            // TODO: move base upload path to a common place
            // $dto->setImage('/uploads/images/' .  $post->getImageFilename());
        // }
        return $dto;
    }
}