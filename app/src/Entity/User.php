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

#[ORM\Entity(repositoryClass: UserRepository::class)]
#[ORM\Table(name: '`user`')]
#[UniqueEntity(fields: "email", message: "Email already taken")]
#[UniqueEntity(fields: "login", message: "Login already taken")]

class User extends AbstractEntity
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

    #[ORM\OneToMany(targetEntity: Address::class, mappedBy: 'user')]
    #[Getter, Setter]
    private ?Collection $addresses = null;


    #[ORM\OneToOne(targetEntity: Cart::class, mappedBy: 'user')]
    #[Getter, Setter]
    private ?Cart $cart = null;

    public function __construct()
    {
        $this->addresses = new ArrayCollection();
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

    public function getPassword(): ?string
    {
        return "*********";
    }
}
