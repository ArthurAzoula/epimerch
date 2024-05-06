<?php

namespace App\Service;

use App\Entity\Cart;
use App\Repository\CartRepository;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\CartItem;
use App\Entity\Product;
use App\Repository\CartItemRepository;
use App\Repository\ProductRepository;
use Symfony\Component\Uid\Ulid;

class CartService
{
    private CartRepository $cartRepository;
    private CartItemRepository $cartItemRepository;
    private ProductRepository $productRepository;
    private EntityManagerInterface $entityManager;

    public function __construct(CartRepository $cartRepository, EntityManagerInterface $entityManager, ProductRepository $productRepository, CartItemRepository $cartItemRepository)
    {
        $this->cartRepository = $cartRepository;
        $this->entityManager = $entityManager;
        $this->productRepository = $productRepository;
        $this->cartItemRepository = $cartItemRepository;
    }

    public function getAll(): ?array
    {
        return $this->cartRepository->findAll();
    }

    public function getCartById(Ulid $id): ?Cart
    {
        return $this->cartRepository->find($id);
    }

    public function create(Cart $cart): Cart
    {
        $this->entityManager->persist($cart);
        $this->entityManager->flush();

        return $cart;
    }

    public function getProductsFromCart(Ulid $cartId): ?array
    {
        return $this->cartItemRepository->getProductsFromCart($cartId);
    }

    public function addProductToCart(Ulid $cartId, Ulid $productId, int $quantity): Cart
    {
        $cart = $this->getCartById($cartId);

        if ($cart === null) {
            throw new \Exception("Cart with id $cartId not found");
        }

        $product = $this->productRepository->find($productId);

        if ($product === null) {
            throw new \Exception("Product with id $productId not found");
        }

        $cartItem = new CartItem();
        $cartItem->setProduct($product);
        $cartItem->setQuantity($quantity);
        $cartItem->setPrice($product->getPrice());


        $cart->addCartItem($cartItem);  

        $this->entityManager->persist($cartItem);
        $this->entityManager->flush();

        return $cart;
    }

    public function removeProductFromCart(Ulid $cartId, Ulid $productId): Cart
    {
        $cart = $this->getCartById($cartId);

        if ($cart === null) {
            throw new \Exception("Cart with id $cartId not found");
        }

        $cartItem = $this->cartItemRepository->findOneBy(['cart' => $cartId, 'product' => $productId]);

        if ($cartItem === null) {
            throw new \Exception("Product with id $productId not found in cart with id $cartId");
        }

        $cart->removeCartItem($cartItem);

        $this->entityManager->remove($cartItem);
        $this->entityManager->flush();

        return $cart;
    }

    public function update(Ulid $id, Cart $cart): Cart
    {
        $existingCart = $this->getCartById($id);

        if ($existingCart === null) {
            throw new \Exception("Cart with id $id not found");
        }

        $existingCart->setUser($cart->getUser());
        $existingCart->setTotalAmount($cart->getTotalAmount());

        $this->entityManager->flush();

        return $existingCart;
    }

    public function delete(Ulid $id): void
    {
        $cart = $this->getCartById($id);

        if ($cart === null) {
            throw new \Exception("Cart with id $id not found");
        }

        $this->entityManager->remove($cart);
        $this->entityManager->flush();   
    }
}

