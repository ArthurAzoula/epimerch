<?php
// Cart.php

namespace App\Entity;

use App\Service\AddressService;
use App\Service\ClientService;
use Doctrine\ORM\Mapping as ORM;
use Lombok\Getter;
use Lombok\Setter;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Symfony\Component\Uid\Ulid;

#[ORM\Entity]
class Cart extends AbstractEntity
{
    #[ORM\OneToOne(targetEntity: Client::class, inversedBy: 'cart')]
    #[Getter, Setter]
    private ?Client $client = null;

    #[ORM\OneToMany(targetEntity: CartItem::class, mappedBy: 'cart', cascade: ['persist', 'remove'])]
    #[Getter, Setter]
    private ?Collection $cartItems = null;
    
    #[ORM\OneToOne(targetEntity: Address::class, cascade: ['persist'])]
    #[Getter, Setter]
    private ?Address $address = null;

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
    
    public function jsonDeserialize(array $data, ClientService $clientService, AddressService $addressService): void
    {
        if(isset($data['client'])) {
            $this->client = $clientService->getClientById($data['client']);
        } else {
            $this->client = null;
        }
        
        if(isset($data['cartItems'])) {
            $this->cartItems = new ArrayCollection();
            foreach($data['cartItems'] as $cartItem) {
                $cartItemObj = new CartItem();
                $cartItemObj->jsonDeserialize($cartItem);
                $this->addCartItem($cartItemObj);
            }
        } else {
            $this->cartItems = new ArrayCollection();
        }
        
        if(isset($data['address']) && !empty($data['address'])) {
            $this->address = $addressService->getAddressById(Ulid::fromString($data['address']));
        } else {
            $this->address = null;
        }
    }
    
    public function jsonSerialize(): mixed
    {
        return array_merge(parent::jsonSerialize(),
        array(
            'cartItems' => isset($this->cartItems) ? $this->cartItems : null,
            'address' => isset($this->address) ? $this->address : null,
        ));
    }
}
