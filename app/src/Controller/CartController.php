<?php

namespace App\Controller;

use App\Entity\Cart;
use App\Service\AddressService;
use App\Service\CartService;
use App\Service\ClientService;
use App\Service\OrderService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use App\Utils\Response;
use App\Utils\HttpStatus;
use Symfony\Component\Console\Output\ConsoleOutput;
use Symfony\Component\Uid\Ulid;
use Symfony\Component\Uid\Uuid;

class CartController extends AbstractController
{

    private CartService $cartService;
    private OrderService $orderService;

    public function __construct(CartService $cartService, OrderService $orderService)
    {
        $this->cartService = $cartService;
        $this->orderService = $orderService;
    }
    
    #[Route('/carts/cart', name: 'get_cart', methods: ['GET'])]
    public function getCart(ClientService $clientService): Response
    {
        try {
            $mail = $this->getUser()->getUserIdentifier();
            $client = $clientService->getClientByEmail($mail);
            if (!$client) {
                return Response::error("Cet utilisateur n'existe pas", HttpStatus::NOT_FOUND);
            }
            
            $cart = $client->getCart();
            
            return Response::json($cart, HttpStatus::OK);
        } catch (\Exception $e) {
            return Response::error($e->getMessage(), HttpStatus::INTERNAL_SERVER_ERROR);
        }
    }
    
    #[Route('/carts/cart', name: 'update_cart_address', methods: ['PUT'])]
    public function updateCart(Request $request, ClientService $clientService, AddressService $addressService, ValidatorInterface $validator): Response
    {
        try {
            $mail = $this->getUser()->getUserIdentifier();
            $client = $clientService->getClientByEmail($mail);
            if (!$client) {
                return Response::error("Cet utilisateur n'existe pas", HttpStatus::NOT_FOUND);
            }
            
            $content = $request->getContent();
            $data = json_decode($content, true);
            
            $cart = $client->getCart();
            
            if(isset($data['address']) && !empty($data['address'])) {
                $address = $addressService->getAddressById(Ulid::fromString($data['address']));
                $cart->setAddress($address);
            } else {
                $cart->setAddress(null);
            }
            
            $errors = $validator->validate($cart);
            if (count($errors) > 0) {
                return Response::error((string) $errors, HttpStatus::BAD_REQUEST);
            }
            
            $this->cartService->update($cart->getId(), $cart);
            
            return Response::json($cart, HttpStatus::OK);
        } catch (\Exception $e) {
            (new ConsoleOutput())->writeln($e->getMessage());
            return Response::error($e->getMessage(), HttpStatus::INTERNAL_SERVER_ERROR);
        }
    }

    #[Route('/carts/validate', name: 'validate_cart', methods: ['POST'])]
    public function validateCart(ClientService $clientService, CartService $cartService): Response
    {
        try {

            $mail = $this->getUser()->getUserIdentifier();

            $client = $clientService->getClientByEmail($mail);

            if (!$client) {
                return Response::error("Cet utilisateur n'existe pas", HttpStatus::NOT_FOUND);
            }
            
            $cartId = Ulid::fromString($client->getCart()->getId());
            
            $cart = $cartService->getCartById($cartId);
            
            if($cart === null){
                return Response::error("Le panier n'existe pas", HttpStatus::NOT_FOUND);
            }
            
            if($cart->getCartItems()->count() === 0){
                return Response::error("Le panier est vide", HttpStatus::BAD_REQUEST);
            }

            $orderId = $this->cartService->validateCart($cartId, $client);
            
            if($orderId === null){
                return Response::error("Impossible de valider le panier", HttpStatus::INTERNAL_SERVER_ERROR);
            }

            return Response::success('Panier validé', HttpStatus::CREATED);
        } catch (\Exception $e) {
            (new ConsoleOutput())->writeln($e->getMessage());
            return Response::error($e->getMessage(), HttpStatus::INTERNAL_SERVER_ERROR);
        }
    }

    #[Route('/carts/{productId}', name: 'add_product_to_cart', methods: ['POST'])]
    public function addProduct($productId, Request $request, ClientService $clientService, SerializerInterface $serializer, ValidatorInterface $validator): Response
    {
        try {

            $mail = $this->getUser()->getUserIdentifier();

            $client = $clientService->getClientByEmail($mail);

            if (!$client) {
                return Response::error("Cet utilisateur n'existe pas", HttpStatus::NOT_FOUND);
            }

            $cartId = new Ulid($client->getCart()->getId());

            $productId = Uuid::fromString($productId);

            $quantity = $request->get('quantity');

            $productId = Ulid::fromString($productId);
            $cartId = Ulid::fromString($cartId);

            $cart = $this->cartService->addProductToCart($cartId, $productId, $quantity ?? 1);

            return Response::json($cart->jsonSerialize(), HttpStatus::CREATED);
        } catch (\Exception $e) {
            return Response::error($e->getMessage(), HttpStatus::INTERNAL_SERVER_ERROR);
        }
    }

    #[Route('/carts', name: 'get_products_from_cart', methods: ['GET'])]
    public function getProducts(ClientService $clientService): Response
    {

        $email = $this->getUser()->getUserIdentifier();

        $client = $clientService->getClientByEmail($email);

        if (!$client) {
            return Response::error("Cet utilisateur n'existe pas", HttpStatus::NOT_FOUND);
        }

        $cartId = Ulid::fromString($client->getCart()->getId());

        try {
            $products = $this->cartService->getProductsFromCart($cartId);

            return Response::json($products, HttpStatus::OK);
        } catch (\Exception $e) {
            return Response::error($e->getMessage(), HttpStatus::INTERNAL_SERVER_ERROR);
        }
    }

    #[Route('/carts/{productId}', name: 'delete_product_from_cart', methods: ['DELETE'])]
    public function deleteProduct($productId, ClientService $clientService, SerializerInterface $serializer, ValidatorInterface $validator): Response
    {
        try {

            $mail = $this->getUser()->getUserIdentifier();

            $client = $clientService->getClientByEmail($mail);

            if (!$client) {
                return Response::error("Cet utilisateur n'existe pas", HttpStatus::NOT_FOUND);
            }

            $cartId = Ulid::fromString($client->getCart()->getId());

            $productId = Ulid::fromString($productId);

            $cart = $this->cartService->removeProductFromCart($cartId, $productId);

            return Response::success("Produit retiré du panier.", HttpStatus::OK);
        } catch (\Exception $e) {
            return Response::error($e->getMessage(), HttpStatus::INTERNAL_SERVER_ERROR);
        }
    }

    #[Route('/carts/{productId}', name: 'update_product_quantity', methods: ['PUT'])]
    public function updateProductQuantity($productId, Request $request, ClientService $clientService, SerializerInterface $serializer, ValidatorInterface $validator): Response
    {
        try {

            $mail = $this->getUser()->getUserIdentifier();

            $client = $clientService->getClientByEmail($mail);

            if (!$client) {
                return Response::error("Cet utilisateur n'existe pas", HttpStatus::NOT_FOUND);
            }

            $cartId = Ulid::fromString($client->getCart()->getId());

            $productId = Ulid::fromString($productId);

            $content = $request->getContent();
            $data = json_decode($content, true);
            $quantity = $data['quantity'];

            $cart = $this->cartService->updateProductQuantity($cartId, $productId, $quantity);

            return Response::json($cart->jsonSerialize(), HttpStatus::OK);
        } catch (\Exception $e) {
            return Response::error($e->getMessage(), HttpStatus::INTERNAL_SERVER_ERROR);
        }
    }
}
