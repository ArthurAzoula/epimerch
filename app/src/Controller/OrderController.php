<?php

namespace App\Controller;

use App\Entity\Order;
use App\Service\OrderService;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use App\Utils\Response;
use App\Utils\HttpStatus;

class OrderController
{

    private OrderService $orderService;

    public function __construct(OrderService $orderService)
    {
        $this->orderService = $orderService;
    }


    #[Route('/orders', name: 'orders', methods: ['GET'])]
    public function index(): Response
    {
        try {
            $orders = $this->orderService->getAll();

            foreach ($orders as $order) {
                $data[] = $order->jsonSerialize();
            }

            return Response::json($data, HttpStatus::OK);
        } catch (\Exception $e) {
            return Response::error($e->getMessage(), HttpStatus::INTERNAL_SERVER_ERROR);
        }
    }

    #[Route('/orders/{id}', name: 'get_order', methods: ['GET'])]
    public function get(int $id): Response
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

    #[Route('/orders', name: 'create_order', methods: ['POST'])]
    public function create(Request $request, SerializerInterface $serializer, ValidatorInterface $validator): Response
    {
        try {
            $order = $serializer->deserialize($request->getContent(), Order::class, 'json');
            $errors = $validator->validate($order);

            if (count($errors) > 0) {
                return Response::error($errors, HttpStatus::BAD_REQUEST);
            }

            $order = $this->orderService->create($order);
            $data = $order->jsonSerialize();

            return Response::json($data, HttpStatus::CREATED);
        } catch (\Exception $e) {
            return Response::error($e->getMessage(), HttpStatus::INTERNAL_SERVER_ERROR);
        }
    }

    #[Route('/orders/{id}', name: 'update_order', methods: ['PUT'])]
    public function update(int $id, Request $request, SerializerInterface $serializer, ValidatorInterface $validator): Response
    {
        try {
            $order = $serializer->deserialize($request->getContent(), Order::class, 'json');
            $errors = $validator->validate($order);

            if (count($errors) > 0) {
                return Response::error($errors, HttpStatus::BAD_REQUEST);
            }

            $order = $this->orderService->update($id, $order);
            $data = $order->jsonSerialize();

            return Response::json($data, HttpStatus::OK);
        } catch (\Exception $e) {
            return Response::error($e->getMessage(), HttpStatus::INTERNAL_SERVER_ERROR);
        }
    }

    #[Route('/orders/{id}', name: 'delete_order', methods: ['DELETE'])]
    public function delete(int $id): Response
    {
        try {

            $this->orderService->delete($id);

            return Response::json(null, HttpStatus::NO_CONTENT);
        } catch (\Exception $e) {
            return Response::error($e->getMessage(), HttpStatus::INTERNAL_SERVER_ERROR);
        }
    }
}