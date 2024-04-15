<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Lombok\Getter;
use Lombok\Setter;

#[ORM\Entity]
class CartItem extends AbstractEntity
{
    #[ORM\ManyToOne(targetEntity: Cart::class, inversedBy: 'products')]
    #[Getter, Setter]
    private ?Cart $cart = null;

    #[ORM\ManyToOne(targetEntity: Product::class, inversedBy: 'cartItems')]
    #[Getter, Setter]
    private ?Product $product = null;

    #[ORM\Column]
    #[Getter, Setter]
    private ?int $quantity = null;
}
