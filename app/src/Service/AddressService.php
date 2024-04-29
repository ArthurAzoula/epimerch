<?php 

namespace App\Service;

use App\Entity\Address;
use App\Repository\AddressRepository;
use Doctrine\ORM\EntityManagerInterface;

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

    public function getAddressById(int $id): ?Address
    {
        return $this->addressRepository->find($id);
    }

    public function create(Address $address): Address
    {
        $this->entityManager->persist($address);
        $this->entityManager->flush();

        return $address;
    }

    public function update(int $id, Address $address): Address
    {
        $existingAddress = $this->getAddressById($id);

        if ($existingAddress === null) {
            throw new \Exception("Address with id $id not found");
        }

        $existingAddress->setName($address->getName());
        $existingAddress->setCity($address->getCity());
        $existingAddress->setCode($address->getCode());
        $existingAddress->setCountry($address->getCountry());

        $this->entityManager->flush();

        return $existingAddress;
    }

    public function delete(int $id): void
    {
        $address = $this->getAddressById($id);

        if ($address === null) {
            throw new \Exception("Address with id $id not found");
        }

        $this->entityManager->remove($address);
        $this->entityManager->flush();
    }
}