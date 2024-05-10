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
use Symfony\Component\Console\Output\ConsoleOutput;

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

    #[ORM\Column(type: 'decimal', scale: 2, precision: 10)]
    #[Getter, Setter]
    private ?float $price = null;

    #[ORM\OneToMany(targetEntity: OrderItem::class, mappedBy: 'product')]
    #[Getter, Setter]
    private ?Collection $orderItems = null;

    #[ORM\OneToMany(targetEntity: CartItem::class, mappedBy: 'product')]
    #[Getter, Setter]
    private ?Collection $cartItems = null;
    
    #[ORM\Column()]
    #[Getter, Setter]
    private Category $category;

    #[ORM\Column()]
    #[Getter, Setter]
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
    
    public function jsonDeserialize(array $data): void
    {
        if(isset($data['name'])){
            $this->name = $data['name'];
        }
        
        if(isset($data['description'])){
            $this->description = $data['description'];
        }
        
        if(isset($data['photo'])){
            $this->photo = $data['photo'];
        }
        
        if(isset($data['price'])){
            $this->price = $data['price'];
        }
        
        if(isset($data['category']) && Category::isValid($data['category'])){
            $this->category = Category::from($data['category']);
        }
        
        if(isset($data['genre']) && Genre::isValid($data['genre'])){
            $this->genre = Genre::from($data['genre']);
        }
    }

    public function jsonSerialize(): mixed
    {
        return array_merge(parent::jsonSerialize(),
        array(
            'name' => $this->name,
            'description' => $this->description,
            'photo' => $this->photo,
            'price' => $this->price,
            'category' => $this->category,
            'genre' => $this->genre
        ));
    }
}
