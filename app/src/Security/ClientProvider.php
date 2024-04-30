<?php

namespace App\Security;

use App\Entity\Client;
use App\Repository\ClientRepository;
use Doctrine\ORM\EntityManagerInterface;
use Exception;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\User\UserProviderInterface;

class ClientProvider implements UserProviderInterface {

    private EntityManagerInterface $entityManager; 

    public function __construct(EntityManagerInterface $entityManager) {
        $this->entityManager = $entityManager;
    }
    public function loadUserByIdentifier(string $identifier): Client
    {
        $user = $this->entityManager->getRepository(Client::class)
            ->findOneBy(['email' => $identifier]);

        if (!$user) {
            $user = $this->entityManager->getRepository(Client::class)
                ->findOneBy(['login' => $identifier]);
        }

        if (!$user) {
            throw new Exception('User not found');
        }

        return $user;
    }

    public function refreshUser(UserInterface $user): UserInterface
    {
        return $this->loadUserByIdentifier($user->getUserIdentifier());
    }

    public function supportsClass(string $class): bool
    {
        return $class === Client::class;
    }

}