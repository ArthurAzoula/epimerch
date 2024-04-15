<?php

namespace App\Entity;

use App\Repository\ProductRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
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

    #[ORM\ManyToOne(inversedBy: 'products')]
    #[Getter, Setter]
    private ?Order $order = null;

    #[ORM\OneToMany(targetEntity: CartItem::class, mappedBy: 'product')]
    #[Getter, Setter]
    private ?Collection $cartItems = null;

    public function __construct()
    {
        $this->order = new Order();
    }
}
