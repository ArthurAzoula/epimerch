<?php

namespace App\Controller;

use App\Utils\Response;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;
use Symfony\Component\Routing\Annotation\Route;

class TestController extends AbstractController
{
    
    #[Route('/d', name: 'homepage')]
    public function index(MailerInterface $mailer): Response
    {
        $email = (new Email())
            ->from('projetepitechmsc@gmail.com')
            ->to('bryanferrando59@gmail.com')
            ->subject('Time for Symfony Mailer!')
            ->text('Sending emails is fun again!')
            ->html('<p>See Twig integration for better HTML integration!</p>');
        
        $mailer->send($email);
        
        // return json response
        return new Response(['message' => 'Hello World!']);
    }
    
    #[Route('/test', name: 'test')]
    public function test(): Response
    {
        // return json response
        return new Response(json_encode(['message' => 'Test Route']));
    }
}