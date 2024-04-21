<?php

namespace App\Entity;

use App\Repository\AddressRepository;
use Doctrine\ORM\Mapping as ORM;
use \Lombok\Getter;
use \Lombok\Setter;

#[ORM\Entity(repositoryClass: AddressRepository::class)]
class Address extends AbstractEntity
{

    #[ORM\Column(length: 255)]
    #[Getter, Setter]
    private ?string $city = null;

    #[ORM\Column(length: 255)]
    #[Getter, Setter]
    private ?string $name = null;

    #[ORM\Column(length: 255)]
    #[Getter, Setter]
    private ?string $country = null;

    #[ORM\Column(length: 255)]
    #[Getter, Setter]
    private ?string $code = null;
}
