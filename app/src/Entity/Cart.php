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

    #[ORM\OneToMany(targetEntity: CartItem::class, mappedBy: 'cart', cascade: ['persist'])]
    #[Getter, Setter]
    private ?Collection $cartItems = null;

    public function __construct()
    {
        $this->cartItems = new ArrayCollection();
    }

    public function addCartItem(CartItem $cartItem): static
    {
        if (!$this->cartItems->contains($cartItem)) {
            $this->cartItems[] = $cartItem;
            $cartItem->setCart($this);
        }

        return $this;
    }

    public function removeCartItem(CartItem $cartItem): static
    {
        if ($this->cartItems->removeElement($cartItem)) {
            if ($cartItem->getCart() === $this) {
                $cartItem->setCart(null);
            }
        }

        return $this;
    }
    
    public function jsonSerialize(): mixed
    {
        return array_merge(parent::jsonSerialize(),
        array(
            'cartItems' => $this->cartItems
        ));
    }
}
