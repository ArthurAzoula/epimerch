<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class TestController
{
    #[Route('/test', name: 'test')]
    public function index(): Response
    {
        // return json response
        return new Response(json_encode(['message' => 'Hello World!']));
    }
}