<?php

namespace App\Entity;

use App\Repository\OrderRepository;
use App\Service\ClientService;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Lombok\Getter;
use Lombok\Setter;
use Symfony\Component\Uid\Ulid;

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

    #[ORM\OneToMany(targetEntity: OrderItem::class, mappedBy: 'order', cascade: ['persist'])]
    #[Getter, Setter]
    private Collection $orderItems;

    #[ORM\ManyToOne(targetEntity: Client::class, inversedBy: 'orders')]
    #[Getter, Setter]
    private ?Client $client = null;

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
            if ($orderItem->getOrder() === $this) {
                $orderItem->setOrder(null);
            }
        }

        return $this;
    }
    
    public function isPaid(): bool
    {
        return $this->isPaid;
    }
    
    public function setPaid(bool $isPaid): void
    {
        $this->isPaid = $isPaid;
    }
    
    public function jsonDeserialize(array $data, ClientService $clientService): void
    {        
        if(isset($data['totalPrice']))
            $this->totalPrice = $data['totalPrice'];
        
        if(isset($data['isPaid']))
            $this->isPaid = $data['isPaid'] === 'true';
        
        if(isset($data['orderItems'])){
            $this->orderItems = [];
            foreach($data['orderItems'] as $orderItem){
                $this->addOrderItem($orderItem);
            }
        }
        
        if(isset($data['client']) && !empty($data['client'])){
            $client = $clientService->getClientById(Ulid::fromBase32($data['client']));
            if($client !== null)
                $this->client = $client;
        }
    }

    public function jsonSerialize(): mixed
    {
        return array_merge(
            parent::jsonSerialize(),
            array(
                'totalPrice' => $this->totalPrice,
                'isPaid' => $this->isPaid,
                'orderItems' => $this->orderItems,
                'client' => isset($this->client) ? $this->client : null
            )
        );
    }
}
