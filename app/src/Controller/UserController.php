<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class UserController
{
    #[Route('/users', name: 'users', methods: ['GET'])]
    public function index(UserRepository $userRepository, SerializerInterface $serializer): Response
    {
        $users = $userRepository->findAll();
        $data = $serializer->serialize($users, 'json');

        return new Response($data, 200, [
            'Content-Type' => 'application/json'
        ]);
    }

    #[Route('/users', name: 'add_user', methods: ['POST'])]
    public function add(Request $request, EntityManagerInterface $entityManager, ValidatorInterface $validator, SerializerInterface $serializer): Response
    {
        $data = $request->getContent();
        $user = $serializer->deserialize($data, User::class, 'json');

        $errors = $validator->validate($user);

        if (count($errors) > 0) {
            return new JsonResponse($errors, 400);
        }

        $entityManager->persist($user);
        $entityManager->flush();

        return new JsonResponse($user, 201);
    }

    #[Route('/users/{id}', name: 'get_user', methods: ['GET'])]
    public function show(User $user, SerializerInterface $serializer): Response
    {
        $data = $serializer->serialize($user, 'json');

        return new Response($data, 200, [
            'Content-Type' => 'application/json'
        ]);
    }

    #[Route('/users/{id}', name: 'update_user', methods: ['PUT'])]
    public function update(User $user, Request $request, EntityManagerInterface $entityManager, ValidatorInterface $validator, SerializerInterface $serializer): Response
    {
        $data = $request->getContent();
        $updatedUser = $serializer->deserialize($data, User::class, 'json');

        $errors = $validator->validate($updatedUser);

        if (count($errors) > 0) {
            return new JsonResponse($errors, 400);
        }

        $user->setLogin($updatedUser->getLogin());
        $user->setEmail($updatedUser->getEmail());
        $user->setFirstname($updatedUser->getFirstname());
        $user->setLastname($updatedUser->getLastname());

        $entityManager->flush();

        return new JsonResponse($user, 200);
    }

    #[Route('/users/{id}', name: 'delete_user', methods: ['DELETE'])]
    public function delete(User $user, EntityManagerInterface $entityManager): Response
    {
        $entityManager->remove($user);
        $entityManager->flush();

        return new Response(null, 204);
    }
}