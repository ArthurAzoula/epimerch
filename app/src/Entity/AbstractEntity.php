<?php

namespace App\Entity;

use DateTime;
use DateTimeZone;
use JsonSerializable;
use Doctrine\ORM\Mapping as ORM;
use Lombok\Getter;
use Symfony\Bridge\Doctrine\IdGenerator\UlidGenerator;
use Symfony\Bridge\Doctrine\Types\UlidType;
use Symfony\Component\Validator\Constraints\Ulid;

abstract class AbstractEntity extends \Lombok\Helper implements JsonSerializable
{

    #[ORM\Id]
    #[ORM\GeneratedValue("CUSTOM")]
    #[ORM\CustomIdGenerator(class: UlidGenerator::class)]
    #[ORM\Column(type: UlidType::NAME, options: ["default" => "ulid_generate()"])]
    #[Getter]
    protected Ulid $id;


    #[ORM\Column(updatable: false)]
    #[Getter]
    protected DateTime $createdAt;

    #[ORM\Column]
    #[Getter]
    protected DateTime $updatedAt;

    #[ORM\Column(nullable: true)]
    #[Getter]
    protected ?DateTime $deletedAt;

    #[ORM\PrePersist]
    #[ORM\PreUpdate]
    public function updateTimestamps(): void
    {
        if (empty($this->createdAt)) {
            $this->createdAt = date_create(timezone: new DateTimeZone('EUROPE/Paris'));
        }

        $this->updatedAt = date_create(timezone: new DateTimeZone('EUROPE/Paris'));
    }

    public function softDelete(): void
    {
        $this->deletedAt = date_create(timezone: new DateTimeZone('EUROPE/Paris'));
    }

    public function jsonSerialize(): mixed
    {
        return array(
            'id' => $this->id,
            'createdAt' => $this->createdAt,
            'updatedAt' => $this->updatedAt,
            'deletedAt' => $this->deletedAt
        );
    }
}
