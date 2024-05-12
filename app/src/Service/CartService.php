<?php

namespace App\Service;

use App\Entity\Cart;
use App\Entity\Order;
use App\Entity\OrderItem;
use App\Repository\CartRepository;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\CartItem;
use App\Entity\Client;
use App\Entity\Product;
use App\Repository\CartItemRepository;
use App\Repository\ProductRepository;
use Symfony\Component\Console\Output\ConsoleOutput;
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

        $existingCart->setClient($cart->getClient());
        $existingCart->setCartItems($cart->getCartItems());
        $existingCart->setAddress($cart->getAddress());

        $this->entityManager->flush();

        return $existingCart;
    }

    public function updateProductQuantity(Ulid $cartId, Ulid $productId, int $quantity): Cart
    {
        $cart = $this->getCartById($cartId);

        if ($cart === null) {
            throw new \Exception("Cart with id $cartId not found");
        }

        $cartItem = $this->cartItemRepository->findOneBy(['cart' => $cartId, 'product' => $productId]);

        if ($cartItem === null) {
            throw new \Exception("Product with id $productId not found in cart with id $cartId");
        }

        $cartItem->setQuantity($quantity);

        $this->entityManager->flush();

        return $cart;
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

    public function validateCart(Ulid $cartId, Client $client): Ulid
    {
        $cart = $this->getCartById($cartId);

        if ($cart === null) {
            throw new \Exception("Cart with id $cartId not found");
        }

        $order = new Order();

        foreach ($cart->getCartItems() as $cartItem) {
            $orderItem = new OrderItem();
            $orderItem->setProduct($cartItem->getProduct());
            $orderItem->setQuantity($cartItem->getQuantity());
            $orderItem->setPrice($cartItem->getPrice());
            $orderItem->setTotal($cartItem->getPrice() * $cartItem->getQuantity());
            $order->addOrderItem($orderItem);
            $order->setTotalPrice($order->getTotalPrice() + $orderItem->getTotal());
            $this->entityManager->remove($cartItem);
        }
        
        $order->setAddress($cart->getAddress());

        $client->addOrder($order);

        $order->setClient($client);

        $this->entityManager->persist($order);
        
        $this->entityManager->flush();

        return $order->getId();
    }
}
