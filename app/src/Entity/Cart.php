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
    #[ORM\OneToOne(targetEntity: User::class, inversedBy: 'cart')]
    #[Getter, Setter]
    private ?User $user = null;

    #[ORM\OneToMany(targetEntity: CartItem::class, mappedBy: 'cart')]
    #[Getter, Setter]
    private ?Collection $cartItems = null;

    public function __construct()
    {
        $this->cartItems = new ArrayCollection();
    }
}
