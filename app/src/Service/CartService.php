<?php

namespace App\Service;

use App\Entity\Cart;
use App\Repository\CartRepository;
use Doctrine\ORM\EntityManagerInterface;

class CartService
{
    private CartRepository $cartRepository;
    private EntityManagerInterface $entityManager;

    public function __construct(CartRepository $cartRepository, EntityManagerInterface $entityManager)
    {
        $this->cartRepository = $cartRepository;
        $this->entityManager = $entityManager;
    }

    public function getAll(): ?array
    {
        return $this->cartRepository->findAll();
    }

    public function getCartById(int $id): ?Cart
    {
        return $this->cartRepository->find($id);
    }

    public function create(Cart $cart): Cart
    {
        $this->entityManager->persist($cart);
        $this->entityManager->flush();

        return $cart;
    }

    public function update(Cart $cart): Cart
    {
        $this->entityManager->flush();

        return $cart;
    }

    public function delete(Cart $cart): void
    {
        $this->entityManager->remove($cart);
        $this->entityManager->flush();
    }
}

