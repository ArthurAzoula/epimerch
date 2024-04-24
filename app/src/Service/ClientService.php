<?php 

namespace App\Service;

use App\Entity\Client;
use App\Repository\ClientRepository;
use Doctrine\ORM\EntityManagerInterface;

class ClientService
{
    private ClientRepository $clientRepository;
    private EntityManagerInterface $entityManager;

    public function __construct(ClientRepository $clientRepository, EntityManagerInterface $entityManager)
    {
        $this->clientRepository = $clientRepository;
        $this->entityManager = $entityManager;
    }

    public function getAll(): ?array
    {
        return $this->clientRepository->findAll();
    }

    public function getClientById(int $id): ?Client
    {
        return $this->clientRepository->find($id);
    }

    public function getClientByEmail(string $email): ?Client
    {
        return $this->clientRepository->findClientByEmail($email);
    }

    public function create(Client $client): Client
    {
        $this->entityManager->persist($client);
        $this->entityManager->flush();

        return $client;
    }

    public function update(int $id, Client $client): Client
    {
        $existingClient = $this->getClientById($id);

        if ($existingClient === null) {
            throw new \Exception("User with id $id not found");
        }

        $existingClient->setEmail($client->getEmail());
        $existingClient->setPassword($client->getPassword());

        $this->entityManager->flush();

        return $existingClient;
    }

    public function delete(int $id): void
    {
        $client = $this->getClientById($id);

        if ($client === null) {
            throw new \Exception("User with id $id not found");
        }

        $this->entityManager->remove($client);
        $this->entityManager->flush();
    }
}