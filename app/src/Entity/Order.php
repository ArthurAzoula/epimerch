<?php

namespace App\Entity;

use App\Repository\OrderRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Lombok\Getter;
use Lombok\Setter;

#[ORM\Entity(repositoryClass: OrderRepository::class)]
#[ORM\Table(name: '`order`')]
class Order extends AbstractEntity
{
    #[ORM\Column(type: 'decimal', scale: 2, precision: 10)]
    #[Getter, Setter]
    private ?float $totalPrice = null;

    #[ORM\Column]
    #[Getter, Setter]
    private ?bool $isPaid = false;

    #[ORM\OneToMany(targetEntity: OrderItem::class, mappedBy: 'order')]
    #[Getter, Setter]
    private Collection $orderItems;

    #[ORM\ManyToOne(targetEntity: User::class, inversedBy: 'orders')]
    #[Getter, Setter]
    private ?User $user = null;

    public function __construct()
    {
        $this->orderItems = new ArrayCollection();
    }

    public function addOrderItem(OrderItem $orderItem): static
    {
        if (!$this->orderItems->contains($orderItem)) {
            $this->orderItems[] = $orderItem;
            $orderItem->setOrder($this);
        }

        return $this;
    }

    public function removeOrderItem(OrderItem $orderItem): static
    {
        if ($this->orderItems->removeElement($orderItem)) {
            // set the owning side to null (unless already changed)
            if ($orderItem->getOrder() === $this) {
                $orderItem->setOrder(null);
            }
        }

        return $this;
    }
}
