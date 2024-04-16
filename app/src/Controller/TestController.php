<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class TestController extends AbstractController
{
    #[Route('/d', name: 'homepage')]
    public function index(): Response
    {
        // return json response
        return new Response(json_encode(['message' => 'Hello World!']));
    }
    
    #[Route('/test', name: 'test')]
    public function test(): Response
    {
        // return json response
        return new Response(json_encode(['message' => 'Test Route']));
    }
}