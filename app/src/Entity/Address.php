<?php

namespace App\Entity;

use App\Repository\AddressRepository;
use App\Service\ClientService;
use Doctrine\ORM\Mapping as ORM;
use \Lombok\Getter;
use \Lombok\Setter;
use Symfony\Component\Console\Output\ConsoleOutput;
use Symfony\Component\Uid\Ulid;

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
    
    #[ORM\ManyToOne(targetEntity: Client::class, inversedBy: 'addresses')]
    #[Getter, Setter]
    private ?Client $client = null;

    public function jsonDeserialize(array $data, ClientService $clientService): void
    {
        if(isset($data['city'])){
            $this->city = $data['city'];
        }
        
        if(isset($data['name'])){
            $this->name = $data['name'];
        }
        
        if(isset($data['country'])){
            $this->country = $data['country'];
        }
        
        if(isset($data['code'])){
            $this->code = $data['code'];
        }
        
        if(isset($data['client'])){
            $client = $clientService->getClientById(Ulid::fromString($data['client']));
            if($client !== null){
                $this->client = $client;
            }
        } else {
            $this->client = null;
        }
    }
    
    public function jsonSerialize(): mixed
    {
        return array_merge(parent::jsonSerialize(),
        array(
            'city' => isset($this->city) ? $this->city : null,
            'name' => isset($this->name) ? $this->name : null,
            'country' => isset($this->country) ? $this->country : null,
            'code' => isset($this->code) ? $this->code : null,
            'client' => isset($this->client) ? $this->client->jsonSerialize() : null
        ));
    }
}
