<?php

namespace App\Controller;

use App\Entity\User;
use App\Service\UserService;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Response;
use HttpStatus;

class UserController
{

    private UserService $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    #[Route('/users', name: 'users', methods: ['GET'])]
    public function index(): Response
    {
        try {
            $users = $this->userService->getAll();
            
            foreach ($users as $user) {
                $data[] = $user->jsonSerialize();
            }

            return Response::json($data, HttpStatus::OK);
        } catch (\Exception $e) {
            return Response::error($e->getMessage(), HttpStatus::INTERNAL_SERVER_ERROR);
        }
    }

    #[Route('/users/{id}', name: 'get_user', methods: ['GET'])]
    public function get(int $id): Response
    {
        try {
            $user = $this->userService->getUserById($id);

            if ($user === null) {
                return Response::error("User with id $id not found", HttpStatus::NOT_FOUND);
            }

            $data = $user->jsonSerialize();

            return Response::json($data, HttpStatus::OK);
        } catch (\Exception $e) {
            return Response::error($e->getMessage(), HttpStatus::INTERNAL_SERVER_ERROR);
        }
    }

    #[Route('/users/{id}', name: 'delete_user', methods: ['DELETE'])]
    public function delete(int $id)
    {
        try {

            $this->userService->delete($id);

            return Response::json(null, HttpStatus::NO_CONTENT);
        } catch (\Exception $e) {
            return Response::error($e->getMessage(), HttpStatus::INTERNAL_SERVER_ERROR);
        }
    }

    #[Route('/users', name: 'add_user', methods: ['POST'])]
    public function add(Request $request, ValidatorInterface $validator, SerializerInterface $serializer): Response
    {
        try {
            $data = $request->getContent();
            $user = $serializer->deserialize($data, User::class, 'json');

            $errors = $validator->validate($user);

            if (count($errors) > 0) {
                return Response::error($errors, HttpStatus::BAD_REQUEST);
            }

            $user = $this->userService->create($user);

            return Response::json($user, HttpStatus::CREATED);
        } catch (\Exception $e) {
            return Response::error($e->getMessage(), HttpStatus::INTERNAL_SERVER_ERROR);
        }
    }

    #[Route('/users/{id}', name: 'update_user', methods: ['PUT'])]
    public function update(int $id, Request $request, ValidatorInterface $validator, SerializerInterface $serializer): Response
    {
        try {
            $data = $request->getContent();
            $updatedUser = $serializer->deserialize($data, User::class, 'json');

            $errors = $validator->validate($updatedUser);

            if (count($errors) > 0) {
                return Response::error($errors, HttpStatus::BAD_REQUEST);
            }

            $user = $this->userService->update($id, $updatedUser);

            return Response::json($user, HttpStatus::OK);
        } catch (\Exception $e) {
            return Response::error($e->getMessage(), HttpStatus::INTERNAL_SERVER_ERROR);
        }
    }
}
