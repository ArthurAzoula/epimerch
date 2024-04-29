<?php
// Cart.php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Lombok\Getter;
use Lombok\Setter;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;

#[ORM\Entity]
class Cart extends AbstractEntity
{
    #[ORM\OneToOne(targetEntity: Client::class, inversedBy: 'cart')]
    #[Getter, Setter]
    private ?Client $client = null;

    #[ORM\OneToMany(targetEntity: CartItem::class, mappedBy: 'cart')]
    #[Getter, Setter]
    private ?Collection $cartItems = null;

    public function __construct()
    {
        $this->cartItems = new ArrayCollection();
    }

    public function jsonSerialize(): mixed
    {
        return array_merge(parent::jsonSerialize(),
        array(
            'client' => $this->client,
            'cartItems' => $this->cartItems
        ));
    }
}
