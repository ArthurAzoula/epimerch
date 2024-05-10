<?php

namespace App\Controller;

use App\Entity\Order;
use App\Service\ClientService;
use App\Service\OrderService;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use App\Utils\Response;
use App\Utils\HttpStatus;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Console\Output\ConsoleOutput;
use Symfony\Component\Uid\Ulid;

class OrderController extends AbstractController
{

    private OrderService $orderService;
    

    public function __construct(OrderService $orderService)
    {
        $this->orderService = $orderService;
    }


    #[Route('/orders', name: 'orders', methods: ['GET'])]
    public function index(ClientService $clientService): Response
    {
        try {
            $mail = $this->getUser()->getUserIdentifier();
            
            $client = $clientService->getClientByEmail($mail);

            if (!$client) {
                return Response::error("Cet utilisateur n'existe pas", HttpStatus::NOT_FOUND);
            }
            
            $orders = $this->orderService->getOrdersByClient($client->getId());
            
            return Response::json($orders, HttpStatus::OK);
        } catch (\Exception $e) {
            return Response::error($e->getMessage(), HttpStatus::INTERNAL_SERVER_ERROR);
        }
    }
    
    #[Route('/admin/orders', name: 'admin_orders', methods: ['GET'])]
    public function adminIndex(): Response
    {
        try {
            $orders = $this->orderService->getAll();
            
            return Response::json($orders, HttpStatus::OK);
        } catch (\Exception $e) {
            return Response::error($e->getMessage(), HttpStatus::INTERNAL_SERVER_ERROR);
        }
    }

    #[Route('/orders/{id}', name: 'get_order', methods: ['GET'])]
    public function get(Ulid $id): Response
    {
        try {
            $order = $this->orderService->getOrderById($id);

            if ($order === null) {
                return Response::error("Order with id $id not found", HttpStatus::NOT_FOUND);
            }

            $data = $order->jsonSerialize();

            return Response::json($data, HttpStatus::OK);
        } catch (\Exception $e) {
            return Response::error($e->getMessage(), HttpStatus::INTERNAL_SERVER_ERROR);
        }
    }

    #[Route('/orders/clients/{id}', name: 'get_users_order', methods: ['GET'])] 
    public function getOrdersByClient(Ulid $id): Response
    {
        try {
            $orders = $this->orderService->getOrdersByClient($id);

            return Response::json($orders, HttpStatus::OK);
        } catch (\Exception $e) {
            return Response::error($e->getMessage(), HttpStatus::INTERNAL_SERVER_ERROR);
        }
    }

    #[Route('/orders/{id}/products', name: 'get_order_products', methods: ['GET'])]
    public function getProductsByOrder(Ulid $id): Response
    {
        try {
            $products = $this->orderService->getProductsByOrder($id);

            return Response::json($products, HttpStatus::OK);
        } catch (\Exception $e) {
            return Response::error($e->getMessage(), HttpStatus::INTERNAL_SERVER_ERROR);
        }
    }

    #[Route('/orders', name: 'create_order', methods: ['POST'])]
    public function create(Request $request, ValidatorInterface $validator, ClientService $clientService): Response
    {
        try {
            $data = json_decode($request->getContent(), true);
            
            $order = new Order();
            
            $order->jsonDeserialize($data, $clientService);
            
            $errors = $validator->validate($order);

            if (count($errors) > 0) {
                return Response::error($errors, HttpStatus::BAD_REQUEST);
            }

            $order = $this->orderService->create($order);
            
            return Response::json($order->jsonSerialize(), HttpStatus::CREATED);
        } catch (\Exception $e) {
            (new ConsoleOutput())->writeln($e->getMessage());
            return Response::error($e->getMessage(), HttpStatus::INTERNAL_SERVER_ERROR);
        }
    }

    #[Route('/orders/{id}', name: 'update_order', methods: ['PUT'])]
    public function update(Ulid $id, Request $request, ValidatorInterface $validator, OrderService $orderService, ClientService $clientService): Response
    {
        try {
            $data = json_decode($request->getContent(), true);
            
            $order = $orderService->getOrderById($id);
            
            $order->jsonDeserialize($data, $clientService);
            
            $errors = $validator->validate($order);

            if (count($errors) > 0) {
                return Response::error($errors, HttpStatus::BAD_REQUEST);
            }

            $order = $this->orderService->update($id, $order);
            
            return Response::json($order->jsonSerialize(), HttpStatus::OK);
        } catch (\Exception $e) {
            return Response::error($e->getMessage(), HttpStatus::INTERNAL_SERVER_ERROR);
        }
    }

    #[Route('/orders/{id}', name: 'delete_order', methods: ['DELETE'])]
    public function delete(Ulid $id): Response
    {
        try {
            $this->orderService->delete($id);

            return Response::json(null, HttpStatus::NO_CONTENT);
        } catch (\Exception $e) {
            return Response::error($e->getMessage(), HttpStatus::INTERNAL_SERVER_ERROR);
        }
    }
}
