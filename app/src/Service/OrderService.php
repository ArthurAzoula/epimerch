<?php

namespace App\Service;

use App\Entity\Order;
use App\Repository\OrderItemRepository;
use App\Repository\OrderRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Uid\Ulid;

class OrderService
{
    private OrderRepository $orderRepository;
    private OrderItemRepository $orderItemRepository;
    private EntityManagerInterface $entityManager;

    public function __construct(OrderRepository $orderRepository, EntityManagerInterface $entityManager, OrderItemRepository $orderItemRepository)
    {
        $this->orderRepository = $orderRepository;
        $this->entityManager = $entityManager;
        $this->orderItemRepository = $orderItemRepository;
    }

    public function getAll(): ?array
    {
        return $this->orderRepository->findAll();
    }

    public function getOrderById(Ulid $id): ?Order
    {
        return $this->orderRepository->find($id);
    }

    public function getOrdersByClient(Ulid $clientId): ?array
    {
        return $this->orderRepository->getOrdersByClient($clientId);
    }
    
    public function getProductsByOrder(Ulid $orderId): ?array
    {
        return $this->orderItemRepository->getProductsByOrder($orderId);
    }

    public function create(Order $order): Order
    {
        $this->entityManager->persist($order);
        $this->entityManager->flush();

        return $order;
    }

    public function update(Ulid $id, Order $order): Order
    {
        $existingOrder = $this->getOrderById($id);

        if ($existingOrder === null) {
            throw new \Exception("Order with id $id not found");
        }
        
        if($order->getTotalPrice() !== null) {
            $existingOrder->setTotalPrice($order->getTotalPrice());
        }
        
        if($order->isPaid() !== null) {
            $existingOrder->setIsPaid($order->isPaid());
        }
        
        $existingOrder->setClient($order->getClient());

        $this->entityManager->flush();

        return $existingOrder;
    }

    public function delete(Ulid $id): void
    {
        $order = $this->getOrderById($id);

        if ($order === null) {
            throw new \Exception("Order with id $id not found");
        }

        $this->entityManager->remove($order);
        $this->entityManager->flush();
    }
}