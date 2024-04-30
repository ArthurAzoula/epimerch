<?php

namespace App\Entity;

use App\Repository\ClientRepository;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use App\Entity\AbstractEntity;

use Lombok\Getter;
use Lombok\Setter;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Doctrine\Common\Collections\ArrayCollection;

use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;

use Symfony\Bridge\Doctrine\IdGenerator\UlidGenerator;
use Symfony\Bridge\Doctrine\Types\UlidType;
use Symfony\Component\Uid\Ulid;

#[ORM\Entity(repositoryClass: ClientRepository::class)]
#[UniqueEntity(fields: "email", message: "Email already taken")]
#[UniqueEntity(fields: "login", message: "Login already taken")]
class Client extends AbstractEntity implements UserInterface, PasswordAuthenticatedUserInterface
{

    #[ORM\Column(length: 255)]
    #[Getter, Setter]
    private ?string $login = null;

    #[ORM\Column(length: 255)]
    #[Getter, Setter]
    private ?string $email = null;

    #[ORM\Column(length: 255)]
    #[Setter]
    private ?string $password = null;

    #[ORM\Column(length: 255)]
    #[Getter, Setter]
    private ?string $firstname = null;

    #[ORM\Column(length: 255)]
    #[Getter, Setter]
    private ?string $lastname = null;

    #[ORM\Column(type: 'json')]
    private array $roles = [];

    #[ORM\OneToMany(targetEntity: Address::class, mappedBy: 'client')]
    #[Getter, Setter]
    private ?Collection $addresses = null;

    #[ORM\OneToMany(targetEntity: Order::class, mappedBy: 'client')]
    #[Getter, Setter]
    private ?Collection $orders = null;


    #[ORM\OneToOne(targetEntity: Cart::class, mappedBy: 'client')]
    #[Getter, Setter]
    private ?Cart $cart = null;
    
    #[ORM\GeneratedValue("CUSTOM")]
    #[ORM\CustomIdGenerator(class: UlidGenerator::class)]
    #[ORM\Column(type: UlidType::NAME, nullable: true)]
    #[Getter, Setter]
    private ?Ulid $resetPassword = null;

    public function __construct()
    {
        $this->addresses = new ArrayCollection();
        $this->orders = new ArrayCollection();
    }

    public function addAddress(Address $address): static
    {
        if (!$this->addresses->contains($address)) {
            $this->addresses[] = $address;
            $address->setUser($this);
        }

        return $this;
    }

    public function removeAddress(Address $address): static
    {
        if ($this->addresses->removeElement($address)) {
            if ($address->getUser() === $this) {
                $address->setUser(null);
            }
        }

        return $this;
    }

    public function addOrder(Order $order): static
    {
        if (!$this->orders->contains($order)) {
            $this->orders[] = $order;
            $order->setUser($this);
        }

        return $this;
    }

    public function removeOrder(Order $order): static
    {
        if ($this->orders->removeElement($order)) {
            if ($order->getUser() === $this) {
                $order->setUser(null);
            }
        }

        return $this;
    }

    public function getPassword(): ?string
    {
        return $this->password;
    }

    public function jsonSerialize(): mixed
    {
        return
            array_merge(
                parent::jsonSerialize(),
                array(
                    'login' => $this->login,
                    'email' => $this->email,
                    'firstname' => $this->firstname,
                    'lastname' => $this->lastname,
                    'addresses' => $this->addresses,
                    'orders' => $this->orders,
                    'cart' => $this->cart
                )
            );
    }

    public function getRoles(): array
    {
        return $this->roles;
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
    }

    public function eraseCredentials(): void
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

    public function getUserIdentifier(): string
    {
        return $this->email;
    }
}
