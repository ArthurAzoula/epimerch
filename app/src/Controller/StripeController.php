<?php

namespace App\Controller;

use App\Service\OrderService;
use App\Utils\HttpStatus;
use App\Utils\Response;
use Stripe\PaymentIntent;
use Stripe\Stripe;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Console\Output\ConsoleOutput;
use Symfony\Component\Dotenv\Dotenv;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Uid\Ulid;

class StripeController extends AbstractController {
  
  #[Route('/stripe/{orderId}', name: 'stripe_client_secret', methods: ['GET'])]
  public function getClientSecret(Ulid $orderId, OrderService $orderService): Response {
    try {
      $order = $orderService->getOrderById($orderId);
    
      $totalAmount = 0;
      
      foreach($order->getOrderItems() as $orderItem) {
        $totalAmount += $orderItem->getPrice() * $orderItem->getQuantity() * 100;
      }
      
      if($order === null) {
        return Response::error('Achats non trouvés', HttpStatus::BAD_REQUEST);
      }
      
      $dotenv = new Dotenv();
      $dotenv->loadEnv(__DIR__.'/../../.env');
      
      Stripe::setApiKey($_ENV['STRIPE_SECRET_KEY']);
      
      $intent = PaymentIntent::create([
        'amount' => $totalAmount,
        'currency' => 'eur',
        'payment_method_types' => ['card', 'paypal'],
      ]);
      
      return Response::json(['client_secret' => $intent->client_secret], HttpStatus::OK);
    } catch(\Exception $e) {
      (new ConsoleOutput())->writeln($e->getMessage());
      return Response::error($e->getMessage(), HttpStatus::INTERNAL_SERVER_ERROR);
    }
  }
  
}