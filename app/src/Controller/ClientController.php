<?php

namespace App\Controller;

use App\Entity\Client;
use App\Service\ClientService;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use App\Utils\Response;
use App\Utils\HttpStatus;
use Symfony\Component\Console\Output\ConsoleOutput;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Uid\Ulid;

class ClientController
{

    private ClientService $clientService;

    public function __construct(ClientService $clientService)
    {
        $this->clientService = $clientService;
    }

    #[Route('/users', name: 'users', methods: ['GET'])]
    public function index(): Response
    {
        try {
            $clients = $this->clientService->getAll();

            return Response::json($clients, HttpStatus::OK);
        } catch (\Exception $e) {
            return Response::error($e->getMessage(), HttpStatus::INTERNAL_SERVER_ERROR);
        }
    }

    #[Route('/users/{id}', name: 'get_user', methods: ['GET'])]
    public function get(Ulid $id): Response
    {
        try {
            $client = $this->clientService->getClientById($id);

            if ($client === null) {
                return Response::error("User with id $id not found", HttpStatus::NOT_FOUND);
            }

            $data = $client->jsonSerialize();

            return Response::json($data, HttpStatus::OK);
        } catch (\Exception $e) {
            return Response::error($e->getMessage(), HttpStatus::INTERNAL_SERVER_ERROR);
        }
    }

    #[Route('/users/{id}', name: 'delete_user', methods: ['DELETE'])]
    public function delete(Ulid $id)
    {
        try {
            $this->clientService->delete($id);

            return Response::json(null, HttpStatus::NO_CONTENT);
        } catch (\Exception $e) {
            return Response::error($e->getMessage(), HttpStatus::INTERNAL_SERVER_ERROR);
        }
    }

    #[Route('/users', name: 'add_user', methods: ['POST'])]
    public function add(Request $request, ValidatorInterface $validator, UserPasswordHasherInterface $ph): Response
    {
        try {
            $data = json_decode($request->getContent(), true);
            
            $client = new Client();
            
            $client->jsonDeserialize($data, $ph);

            $errors = $validator->validate($client);

            if (count($errors) > 0) {
                return Response::error($errors, HttpStatus::BAD_REQUEST);
            }

            $client = $this->clientService->create($client);
            $client->createCart();

            return Response::json($client, HttpStatus::CREATED);
        } catch (\Exception $e) {
            (new ConsoleOutput())->writeln($e->getMessage());
            return Response::error($e->getMessage(), HttpStatus::INTERNAL_SERVER_ERROR);
        }
    }

    #[Route('/users/{id}', name: 'update_user', methods: ['PUT'])]
    public function update(Ulid $id, Request $request, ValidatorInterface $validator, ClientService $clientService, UserPasswordHasherInterface $ph): Response
    {
        try {
            $data = json_decode($request->getContent(), true);
            
            $client = $clientService->getClientById($id);
            
            $client->jsonDeserialize($data, $ph);

            $errors = $validator->validate($client);
            
            if (count($errors) > 0) {
                return Response::error($errors, HttpStatus::BAD_REQUEST);
            }

            $client = $this->clientService->update($id, $client);

            return Response::json($client, HttpStatus::OK);
        } catch (\Exception $e) {
            (new ConsoleOutput())->writeln($e->getMessage());
            return Response::error($e->getMessage(), HttpStatus::INTERNAL_SERVER_ERROR);
        }
    }
}
