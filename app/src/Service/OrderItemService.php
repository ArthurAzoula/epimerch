<?php 

namespace App\Service;

use App\Entity\OrderItem;
use App\Repository\OrderItemRepository;
use Doctrine\ORM\EntityManagerInterface;

class OrderItemService
{
    private OrderItemRepository $orderItemRepository;
    private EntityManagerInterface $entityManager;

    public function __construct(OrderItemRepository $orderItemRepository, EntityManagerInterface $entityManager)
    {
        $this->orderItemRepository = $orderItemRepository;
        $this->entityManager = $entityManager;
    }

    public function getAll(): ?array
    {
        return $this->orderItemRepository->findAll();
    }

    public function getOrderItemById(int $id): ?OrderItem
    {
        return $this->orderItemRepository->find($id);
    }

    public function create(OrderItem $orderItem): OrderItem
    {
        $this->entityManager->persist($orderItem);
        $this->entityManager->flush();

        return $orderItem;
    }

    public function update(int $id, OrderItem $orderItem): OrderItem
    {
        $existingOrderItem = $this->getOrderItemById($id);

        if ($existingOrderItem === null) {
            throw new \Exception("OrderItem with id $id not found");
        }

        $existingOrderItem->setOrder($orderItem->getOrder());
        $existingOrderItem->setProduct($orderItem->getProduct());
        $existingOrderItem->setQuantity($orderItem->getQuantity());
        $existingOrderItem->setPrice($orderItem->getPrice());

        $this->entityManager->flush();

        return $existingOrderItem;
    }

    public function delete(int $id): void	
    {
        $orderItem = $this->getOrderItemById($id);

        if ($orderItem === null) {
            throw new \Exception("OrderItem with id $id not found");
        }

        $this->entityManager->remove($orderItem);
        $this->entityManager->flush();
    }

    public function getOrderItemsByOrderId(int $orderId): ?array
    {
        return $this->orderItemRepository->findBy(['order' => $orderId]);
    }

    public function getOrderItemsByProductId(int $productId): ?array
    {
        return $this->orderItemRepository->findBy(['product' => $productId]);
    }

    public function getOrderItemsByOrderIdAndProductId(int $orderId, int $productId): ?array
    {
        return $this->orderItemRepository->findBy(['order' => $orderId, 'product' => $productId]);
    }

}