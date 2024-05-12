<?php 

namespace App\Service;

use App\Entity\Address;
use App\Entity\Client;
use App\Repository\AddressRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Uid\Ulid;

class AddressService
{
    private AddressRepository $addressRepository;
    private EntityManagerInterface $entityManager;

    public function __construct(AddressRepository $addressRepository, EntityManagerInterface $entityManager)
    {
        $this->addressRepository = $addressRepository;
        $this->entityManager = $entityManager;
    }

    public function getAll(): ?array
    {
        return $this->addressRepository->findAll();
    }
    
    public function getAddressesByClient(Client $client): ?array
    {
        return $this->addressRepository->findBy(['client' => $client]);
    }

    public function getAddressById(Ulid $id): ?Address
    {
        return $this->addressRepository->find($id);
    }

    public function create(Address $address): Address
    {
        $this->entityManager->persist($address);
        $this->entityManager->flush();

        return $address;
    }

    public function update(Ulid $id, Address $address): Address
    {
        $existingAddress = $this->getAddressById($id);

        if ($existingAddress === null) {
            throw new \Exception("Address with id $id not found");
        }
        
        if($address->getName() !== null) {
            $existingAddress->setName($address->getName());
        }
        
        if($address->getCity() !== null) {
            $existingAddress->setCity($address->getCity());
        }
        
        if($address->getCode() !== null) {
            $existingAddress->setCode($address->getCode());
        }
        
        if($address->getCountry() !== null) {
            $existingAddress->setCountry($address->getCountry());
        }
        
        if($address->getClient() !== null) {
            $existingAddress->setClient($address->getClient());
        }

        $this->entityManager->flush();

        return $existingAddress;
    }

    public function delete(Ulid $id): void
    {
        $address = $this->getAddressById($id);

        if ($address === null) {
            throw new \Exception("Address with id $id not found");
        }

        $this->entityManager->remove($address);
        $this->entityManager->flush();
    }
}