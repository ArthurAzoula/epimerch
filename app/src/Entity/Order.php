<?php

namespace App\Entity;

use App\Repository\OrderRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Lombok\Getter;
use Lombok\Setter;
use phpDocumentor\Reflection\Types\Boolean;

#[ORM\Entity(repositoryClass: OrderRepository::class)]
#[ORM\Table(name: '`order`')]
class Order extends AbstractEntity
{
    public function __construct()
    {
        $this->products = new ArrayCollection();
    }

    #[ORM\Column]
    #[Getter, Setter]
    private ?float $totalPrice = null;

    #[ORM\Column]
    #[Getter, Setter]
    private ?bool $isPaid = false;

    #[ORM\OneToMany(targetEntity: Product::class, mappedBy: 'order')]
    #[Getter, Setter]
    private Collection $products;

    public function addProduct(Product $product): static
    {
        if (!$this->products->contains($product)) {
            $this->products[] = $product;
            $product->setOrder($this);
        }

        return $this;
    }

    public function removeProduct(Product $product): static
    {
        if ($this->products->removeElement($product)) {
            if ($product->getOrder() === $this) {
                $product->setOrder(null);
            }
        }

        return $this;
    }
}
