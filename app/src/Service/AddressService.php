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

    public function update(Address $address): Address
    {
        $this->entityManager->flush();

        return $address;
    }

    public function delete(Address $address): void
    {
        $this->entityManager->remove($address);
        $this->entityManager->flush();
    }
}