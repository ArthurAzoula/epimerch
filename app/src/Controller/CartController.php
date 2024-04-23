<?php

namespace App\Controller;

use App\Entity\Cart;
use App\Service\CartService;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use App\Utils\Response;
use App\Utils\HttpStatus;

class CartController
{

    private CartService $cartService;

    public function __construct(CartService $cartService)
    {
        $this->cartService = $cartService;
    }

    #[Route('/carts', name: 'carts', methods: ['GET'])]
    public function index(): Response
    {
        try {
            $carts = $this->cartService->getAll();

            foreach ($carts as $cart) {
                $data[] = $cart->jsonSerialize();
            }

            return Response::json($data, HttpStatus::OK);
        } catch (\Exception $e) {
            return Response::error($e->getMessage(), HttpStatus::INTERNAL_SERVER_ERROR);
        }
    }

    #[Route('/carts/{id}', name: 'get_cart', methods: ['GET'])]
    public function get(int $id): Response
    {
        try {
            $cart = $this->cartService->getCartById($id);

            if ($cart === null) {
                return Response::error("Cart with id $id not found", HttpStatus::NOT_FOUND);
            }

            $data = $cart->jsonSerialize();

            return Response::json($data, HttpStatus::OK);
        } catch (\Exception $e) {
            return Response::error($e->getMessage(), HttpStatus::INTERNAL_SERVER_ERROR);
        }
    }

    #[Route('/carts', name: 'create_cart', methods: ['POST'])]
    public function create(Request $request, SerializerInterface $serializer, ValidatorInterface $validator): Response
    {
        try {
            $cart = $serializer->deserialize($request->getContent(), Cart::class, 'json');
            $errors = $validator->validate($cart);

            if (count($errors) > 0) {
                return Response::error($errors, HttpStatus::BAD_REQUEST);
            }

            $this->cartService->create($cart);

            return Response::json($cart->jsonSerialize(), HttpStatus::CREATED);
        } catch (\Exception $e) {
            return Response::error($e->getMessage(), HttpStatus::INTERNAL_SERVER_ERROR);
        }
    }

    /**
    #[Route('/carts/{productId}', name: 'add_product_to_cart', methods: ['POST'])]
    public function addProduct(int $productId, Request $request, SerializerInterface $serializer, ValidatorInterface $validator): Response
    {
        try {
            $cart = $serializer->deserialize($request->getContent(), Cart::class, 'json');
            $errors = $validator->validate($cart);

            if (count($errors) > 0) {
                return Response::error($errors, HttpStatus::BAD_REQUEST);
            }

            $this->cartService->addProduct($productId, $cart);

            return Response::json($cart->jsonSerialize(), HttpStatus::CREATED);
        } catch (\Exception $e) {
            return Response::error($e->getMessage(), HttpStatus::INTERNAL_SERVER_ERROR);
        }
    }
    */

    #[Route('/carts/{id}', name: 'update_cart', methods: ['PUT'])]
    public function update(int $id, Request $request, SerializerInterface $serializer, ValidatorInterface $validator): Response
    {
        try {
            $cart = $serializer->deserialize($request->getContent(), Cart::class, 'json');
            $errors = $validator->validate($cart);

            if (count($errors) > 0) {
                return Response::error($errors, HttpStatus::BAD_REQUEST);
            }

            $this->cartService->update($id, $cart);

            return Response::json($cart->jsonSerialize(), HttpStatus::OK);
        } catch (\Exception $e) {
            return Response::error($e->getMessage(), HttpStatus::INTERNAL_SERVER_ERROR);
        }
    }

    #[Route('/carts/{id}', name: 'delete_cart', methods: ['DELETE'])]
    public function delete(int $id): Response
    {
        try {

            $this->cartService->delete($id);

            return Response::json(null, HttpStatus::NO_CONTENT);
        } catch (\Exception $e) {
            return Response::error($e->getMessage(), HttpStatus::INTERNAL_SERVER_ERROR);
        }
    }
}
