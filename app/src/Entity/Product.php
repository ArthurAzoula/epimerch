<?php

namespace App\Entity;

use App\Repository\ProductRepository;
use Category;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Genre;
use Lombok\Getter;
use Lombok\Setter;

#[ORM\Entity(repositoryClass: ProductRepository::class)]
class Product extends AbstractEntity
{

    #[ORM\Column(length: 255)]
    #[Getter, Setter]
    private ?string $name = null;

    #[ORM\Column(length: 255)]
    #[Getter, Setter]
    private ?string $description = null;

    #[ORM\Column(length: 255)]
    #[Getter, Setter]
    private ?string $photo = null;

    #[ORM\Column]
    #[Getter, Setter]
    private ?float $price = null;

    #[ORM\OneToMany(targetEntity: OrderItem::class, mappedBy: 'product')]
    #[Getter, Setter]
    private ?Collection $orderItems = null;

    #[ORM\OneToMany(targetEntity: CartItem::class, mappedBy: 'product')]
    #[Getter, Setter]
    private ?Collection $cartItems = null;
    
    private Category $category;

    private Genre $genre;



    public function __construct()
    {
        $this->orderItems = new ArrayCollection();
    }

    public function addOrderItem(OrderItem $orderItem): static
    {
        if (!$this->orderItems->contains($orderItem)) {
            $this->orderItems[] = $orderItem;
            $orderItem->setProduct($this);
        }

        return $this;
    }

    public function removeOrderItem(OrderItem $orderItem): static
    {
        if ($this->orderItems->removeElement($orderItem)) {
            // set the owning side to null (unless already changed)
            if ($orderItem->getProduct() === $this) {
                $orderItem->setProduct(null);
            }
        }

        return $this;
    }

    public function addCartItem(CartItem $cartItem): static
    {
        if (!$this->cartItems->contains($cartItem)) {
            $this->cartItems[] = $cartItem;
            $cartItem->setProduct($this);
        }

        return $this;
    }

    public function removeCartItem(CartItem $cartItem): static
    {
        if ($this->cartItems->removeElement($cartItem)) {
            // set the owning side to null (unless already changed)
            if ($cartItem->getProduct() === $this) {
                $cartItem->setProduct(null);
            }
        }

        return $this;
    }

    public function jsonSerialize(): mixed
    {
        return array_merge(parent::jsonSerialize(),
        array(
            'name' => $this->getName(),
            'description' => $this->getDescription(),
            'photo' => $this->getPhoto(),
            'price' => $this->getPrice(),
            'category' => $this->getCategory(),
            'genre' => $this->getGenre()
        ));
    }
}
