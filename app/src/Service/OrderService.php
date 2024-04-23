<?php

namespace App\Service;

use App\Entity\Order;
use App\Repository\OrderRepository;
use Doctrine\ORM\EntityManagerInterface;

class OrderService
{
    private OrderRepository $orderRepository;
    private EntityManagerInterface $entityManager;

    public function __construct(OrderRepository $orderRepository, EntityManagerInterface $entityManager)
    {
        $this->orderRepository = $orderRepository;
        $this->entityManager = $entityManager;
    }

    public function getAll(): ?array
    {
        return $this->orderRepository->findAll();
    }

    public function getOrderById(int $id): ?Order
    {
        return $this->orderRepository->find($id);
    }

    public function create(Order $order): Order
    {
        $this->entityManager->persist($order);
        $this->entityManager->flush();

        return $order;
    }

    public function update(int $id, Order $order): Order
    {
        $existingOrder = $this->getOrderById($id);

        if ($existingOrder === null) {
            throw new \Exception("Order with id $id not found");
        }

        $existingOrder->setOrderDate($order->getOrderDate());
        $existingOrder->setOrderStatus($order->getOrderStatus());
        $existingOrder->setTotalAmount($order->getTotalAmount());

        $this->entityManager->flush();

        return $existingOrder;
    }

    public function delete(int $id): void
    {
        $order = $this->getOrderById($id);

        if ($order === null) {
            throw new \Exception("Order with id $id not found");
        }

        $this->entityManager->remove($order);
        $this->entityManager->flush();
    }
}