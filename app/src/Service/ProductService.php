<?php 

namespace App\Service;

use App\Entity\Product;
use App\Repository\ProductRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Uid\Ulid;

class ProductService
{
    private ProductRepository $productRepository;
    private EntityManagerInterface $entityManager;

    public function __construct(ProductRepository $productRepository, EntityManagerInterface $entityManager)
    {
        $this->productRepository = $productRepository;
        $this->entityManager = $entityManager;
    }

    public function getAll(): ?array
    {
        return $this->productRepository->findAll();
    }

    public function getProductById(Ulid $id): ?Product
    {
        return $this->productRepository->find($id);
    }

    public function create(Product $product): Product
    {
        $this->entityManager->persist($product);
        $this->entityManager->flush();

        return $product;
    }

    public function update(Ulid $id, Product $product): Product
    {
        $existingProduct = $this->getProductById($id);

        if ($existingProduct === null) {
            throw new \Exception("Product with id $id not found");
        }

        $existingProduct->setName($product->getName());
        $existingProduct->setPrice($product->getPrice());
        $existingProduct->setDescription($product->getDescription());
        $existingProduct->setCategory($product->getCategory());

        $this->entityManager->flush();

        return $existingProduct;
    }

    public function delete(Ulid $id): void
    {
        $product = $this->getProductById($id);

        if ($product === null) {
            throw new \Exception("Product with id $id not found");
        }

        $this->entityManager->remove($product);
        $this->entityManager->flush();
    }

    public function getProductsByCategory(string $category): ?array
    {
        return $this->productRepository->findBy(['category' => $category]);
    }

    public function getProductsByGender(string $gender): ?array
    {
        return $this->productRepository->findBy(['genre' => $gender]);
    }

    public function getProductsByPriceRange(float $min, float $max): ?array
    {
        return $this->productRepository->findByPriceRange($min, $max);
    }

    public function getProductsBySearchTerm(string $searchTerm): ?array
    {
        return $this->productRepository->findBySearchTerm($searchTerm);
    }

    public function getProductsByCategoryAndPriceRange(string $category, float $min, float $max): ?array
    {
        return $this->productRepository->findByCategoryAndPriceRange($category, $min, $max);
    }

}

