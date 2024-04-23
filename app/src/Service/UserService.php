<?php 

namespace App\Service;

use App\Entity\User;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;

class UserService
{
    private UserRepository $userRepository;
    private EntityManagerInterface $entityManager;

    public function __construct(UserRepository $userRepository, EntityManagerInterface $entityManager)
    {
        $this->userRepository = $userRepository;
        $this->entityManager = $entityManager;
    }

    public function getAll(): ?array
    {
        return $this->userRepository->findAll();
    }

    public function getUserById(int $id): ?User
    {
        return $this->userRepository->find($id);
    }

    public function getUserByEmail(string $email): ?User
    {
        return $this->userRepository->findUserByEmail($email);
    }

    public function create(User $user): User
    {
        $this->entityManager->persist($user);
        $this->entityManager->flush();

        return $user;
    }

    public function update(int $id, User $user): User
    {
        $existingUser = $this->getUserById($id);

        if ($existingUser === null) {
            throw new \Exception("User with id $id not found");
        }

        $existingUser->setEmail($user->getEmail());
        $existingUser->setPassword($user->getPassword());

        $this->entityManager->flush();

        return $existingUser;
    }

    public function delete(int $id): void
    {
        $user = $this->getUserById($id);

        if ($user === null) {
            throw new \Exception("User with id $id not found");
        }

        $this->entityManager->remove($user);
        $this->entityManager->flush();
    }
}