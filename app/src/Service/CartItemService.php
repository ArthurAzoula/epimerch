<?php 

namespace App\Service;

use App\Entity\CartItem;
use App\Repository\CartItemRepository;
use Doctrine\ORM\EntityManagerInterface;

class CartItemService
{
    private CartItemRepository $cartItemRepository;
    private EntityManagerInterface $entityManager;

    public function __construct(CartItemRepository $cartItemRepository, EntityManagerInterface $entityManager)
    {
        $this->cartItemRepository = $cartItemRepository;
        $this->entityManager = $entityManager;
    }

    public function getAll(): ?array
    {
        return $this->cartItemRepository->findAll();
    }

    public function getCartItemById(int $id): ?CartItem
    {
        return $this->cartItemRepository->find($id);
    }
    
    public function create(CartItem $cartItem): CartItem
    {
        $this->entityManager->persist($cartItem);
        $this->entityManager->flush();

        return $cartItem;
    }

    public function update(CartItem $cartItem): CartItem
    {
        $this->entityManager->flush();

        return $cartItem;
    }

    public function delete(CartItem $cartItem): void
    {
        $this->entityManager->remove($cartItem);
        $this->entityManager->flush();
    }
}