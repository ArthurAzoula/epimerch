<?php

namespace App\Controller;

use App\Entity\Product;
use App\Service\ProductService;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use App\Utils\Response;
use App\Utils\HttpStatus;
use Symfony\Component\Uid\Ulid;

class ProductController
{
    private ProductService $productService;

    public function __construct(ProductService $productService)
    {
        $this->productService = $productService;
    }

    #[Route('/products', name: 'products', methods: ['GET'])]
    public function index(): Response
    {
        try {
            $products = $this->productService->getAll();

            return Response::json($products, HttpStatus::OK);
        } catch (\Exception $e) {
            return Response::error($e->getMessage(), HttpStatus::INTERNAL_SERVER_ERROR);
        }
    }

    #[Route('/products/{id}', name: 'get_product', methods: ['GET'])]
    public function get(Ulid $id): Response
    {
        try {
            $product = $this->productService->getProductById($id);

            if ($product === null) {
                return Response::error("Product with id $id not found", HttpStatus::NOT_FOUND);
            }

            $data = $product->jsonSerialize();

            return Response::json($data, HttpStatus::OK);
        } catch (\Exception $e) {
            return Response::error($e->getMessage(), HttpStatus::INTERNAL_SERVER_ERROR);
        }
    }

    #[Route('/products', name: 'create_product', methods: ['POST'])]
    public function create(Request $request, ValidatorInterface $validator): Response
    {
        try {
            $data = json_decode($request->getContent(), true);
            
            $product = new Product();
        
            $product->jsonDeserialize($data);

            $errors = $validator->validate($product);

            if (count($errors) > 0) {
                return Response::json($errors, HttpStatus::BAD_REQUEST);
            }

            $this->productService->create($product);

            return Response::json($product, HttpStatus::CREATED);
        } catch (\Exception $e) {
            return Response::error($e->getMessage(), HttpStatus::INTERNAL_SERVER_ERROR);
        }
    }

    #[Route('/products/{id}', name: 'update_product', methods: ['PUT'])]
    public function update(Ulid $id, Request $request, ValidatorInterface $validator, ProductService $productService): Response
    {
        try {
            $data = json_decode($request->getContent(), true);
            
            $product = $productService->getProductById($id);
            
            $product->jsonDeserialize($data);

            $errors = $validator->validate($product);

            if (count($errors) > 0) {
                return Response::json($errors, HttpStatus::BAD_REQUEST);
            }

            $product = $this->productService->update($id, $product);

            return Response::json($product, HttpStatus::OK);
        } catch (\Exception $e) {
            return Response::error($e->getMessage(), HttpStatus::INTERNAL_SERVER_ERROR);
        }
    }

    #[Route('/products/{id}', name: 'delete_product', methods: ['DELETE'])]
    public function delete(Ulid $id): Response
    {
        try {
            $this->productService->delete($id);

            return Response::success("Le produit a bien été supprimé.", HttpStatus::OK);
        } catch (\Exception $e) {
            return Response::error($e->getMessage(), HttpStatus::INTERNAL_SERVER_ERROR);
        }
    }
}