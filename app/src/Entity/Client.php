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
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
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

    #[ORM\OneToMany(targetEntity: Order::class, mappedBy: 'client', cascade: ['persist'])]
    #[Getter, Setter]
    private ?Collection $orders = null;


    #[ORM\OneToOne(targetEntity: Cart::class, mappedBy: 'client', cascade: ['persist'])]
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
            $address->setClient($this);
        }

        return $this;
    }

    public function removeAddress(Address $address): static
    {
        if ($this->addresses->removeElement($address)) {
            if ($address->getUser() === $this) {
                $address->setClient(null);
            }
        }

        return $this;
    }

    public function addOrder(Order $order): static
    {
        if (!$this->orders->contains($order)) {
            $this->orders[] = $order;
            $order->setClient($this);
        }

        return $this;
    }

    public function removeOrder(Order $order): static
    {
        if ($this->orders->removeElement($order)) {
            if ($order->getClient() === $this) {
                $order->setClient(null);
            }
        }

        return $this;
    }

    public function createCart(): self
    {
        $this->cart = new Cart();
        $this->cart->setClient($this);
        return $this;
    }

    public function getPassword(): ?string
    {
        return $this->password;
    }

    public function jsonDeserialize(array $data, UserPasswordHasherInterface $ph): void
    {
        if (isset($data['login'])) {
            $this->login = $data['login'];
        }

        if (isset($data['email'])) {
            $this->email = $data['email'];
        }

        if (isset($data['password'])) {
            $this->password = $ph->hashPassword($this, $data['password']);
        }

        if (isset($data['firstname'])) {
            $this->firstname = $data['firstname'];
        }

        if (isset($data['lastname'])) {
            $this->lastname = $data['lastname'];
        }

        if (isset($data['addresses'])) {
            $this->addresses = [];
            foreach ($data['addresses'] as $address) {
                $this->addAddress($address);
            }
        }

        if (isset($data['orders'])) {
            $this->orders = [];
            foreach ($data['orders'] as $order) {
                $this->addOrder($order);
            }
        }

        if (isset($data['cart'])) {
            $this->cart = $data['cart'];
        }
        
        if(isset($data['roles'])) {
            $this->roles = $data['roles'];
        }
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
                    'roles' => $this->roles,
                    'cart' => isset($this->cart) ? $this->cart->jsonSerialize() : null,
                    'password' => '********'
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
