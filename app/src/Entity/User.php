<?php

namespace App\Entity;

use App\Repository\UserRepository;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use App\Entity\AbstractEntity;

use Lombok\Getter;
use Lombok\Setter;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Doctrine\Common\Collections\ArrayCollection;

use Symfony\Bridge\Doctrine\Types\UlidType;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Validator\Constraints\Ulid;

#[ORM\Entity(repositoryClass: UserRepository::class)]
#[ORM\Table(name: '`user`')]
#[UniqueEntity(fields: "email", message: "Email already taken")]
#[UniqueEntity(fields: "login", message: "Login already taken")]
class User extends AbstractEntity implements UserInterface, PasswordAuthenticatedUserInterface
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

    #[ORM\OneToMany(targetEntity: Address::class, mappedBy: 'user')]
    #[Getter, Setter]
    private ?Collection $addresses = null;

    #[ORM\OneToMany(targetEntity: Order::class, mappedBy: 'user')]
    #[Getter, Setter]
    private ?Collection $orders = null;


    #[ORM\OneToOne(targetEntity: Cart::class, mappedBy: 'user')]
    #[Getter, Setter]
    private ?Cart $cart = null;
    
    #[ORM\Column(type: UlidType::NAME, options: ["default" => "ulid_generate()"])]
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
        return "*********";
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
        $roles = $this->roles;

        $roles[] = 'PUBLIC_ACCESS';

        return array_unique($roles);
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
