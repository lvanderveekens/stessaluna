<?php
declare(strict_types=1);

namespace Stessaluna;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class DefaultController extends AbstractController
{
    /**
     * @Route("/{reactRouting}", name="home", requirements={"reactRouting"="^(?!api).+"}, defaults={"reactRouting": null})
     */
    public function index(Request $request)
    {
        return $this->render('default/index.html.twig');
    }
}