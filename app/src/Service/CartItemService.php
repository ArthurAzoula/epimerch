<?php 

namespace App\Service;

use App\Entity\CartItem;
use App\Repository\CartItemRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Uid\Ulid;

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

    public function getCartItemById(Ulid $id): ?CartItem
    {
        return $this->cartItemRepository->find($id);
    }
    
    public function create(CartItem $cartItem): CartItem
    {
        $this->entityManager->persist($cartItem);
        $this->entityManager->flush();

        return $cartItem;
    }

    public function update(Ulid $id, CartItem $cartItem): CartItem
    {
        $existingCartItem = $this->getCartItemById($id);

        if ($existingCartItem === null) {
            throw new \Exception("CartItem with id $id not found");
        }

        $existingCartItem->setCart($cartItem->getCart());
        $existingCartItem->setProduct($cartItem->getProduct());
        $existingCartItem->setQuantity($cartItem->getQuantity());
        $existingCartItem->setPrice($cartItem->getPrice());

        $this->entityManager->flush();

        return $existingCartItem;
    }

    public function delete(Ulid $id): void
    {
        $cartItem = $this->getCartItemById($id);

        if ($cartItem === null) {
            throw new \Exception("CartItem with id $id not found");
        }

        $this->entityManager->remove($cartItem);
        $this->entityManager->flush();
    }
}