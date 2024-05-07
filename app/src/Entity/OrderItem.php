<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Lombok\Getter;
use Lombok\Setter;

#[ORM\Entity]
class OrderItem extends AbstractEntity
{
    #[ORM\ManyToOne(targetEntity: Order::class, inversedBy: 'orderItems')]
    #[Getter, Setter]
    private ?Order $order = null;

    #[ORM\ManyToOne(targetEntity: Product::class, inversedBy: 'orderItems')]
    #[Getter, Setter]
    private ?Product $product = null;

    #[ORM\Column(type: 'integer')]
    #[Getter, Setter]
    private ?int $quantity = null;

    #[ORM\Column(type: 'decimal', scale: 2, precision: 10)]
    #[Getter, Setter]
    private ?float $price = null;

    #[ORM\Column(type: 'decimal', scale: 2, precision: 10)]
    #[Getter, Setter]
    private ?float $total = null;

    public function jsonSerialize(): mixed
    {
        return array_merge(parent::jsonSerialize(),
        array(
            'product' => $this->product,
            'quantity' => $this->quantity,
            'price' => $this->price,
            'total' => $this->total
        ));
    }
}
