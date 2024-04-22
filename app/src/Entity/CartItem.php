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

    #[ORM\Column(type: 'decimal', scale: 2, precision: 10)]
    #[Getter, Setter]
    private ?float $price = null;

    public function jsonSerialize(): mixed
    {
        return array_merge(parent::jsonSerialize(),
        array(
            'cart' => $this->cart,
            'product' => $this->product,
            'quantity' => $this->quantity,
            'price' => $this->price
        ));
    }
}
