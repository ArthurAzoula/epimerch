<?php 

namespace App\Controller;

use App\Entity\Address;
use App\Service\AddressService;
use App\Service\ClientService;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use App\Utils\Response;
use App\Utils\HttpStatus;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Console\Output\ConsoleOutput;
use Symfony\Component\Uid\Ulid;

class AddressController extends AbstractController
{
    private AddressService $addressService;

    public function __construct(AddressService $addressService)
    {
        $this->addressService = $addressService;
    }

    #[Route('/addresses', name: 'addresses', methods: ['GET'])]
    public function index(ClientService $clientService): Response
    {
        try {
            $client = $this->getUser()->getUserIdentifier();
            $client = $clientService->getClientByEmail($client);
            
            if($client === null) {
                return Response::error('Utilisateur pas trouvé !', HttpStatus::NOT_FOUND);
            }
            
            $addresses = $this->addressService->getAddressesByClient($client);

            return Response::json($addresses, HttpStatus::OK);
        } catch (\Exception $e) {
            return Response::error($e->getMessage(), HttpStatus::INTERNAL_SERVER_ERROR);
        }
    }
    
    #[Route('admin/addresses', name: 'admin_addresses', methods: ['GET'])]
    public function adminIndex(): Response
    {
        try {
            $addresses = $this->addressService->getAll();

            return Response::json($addresses, HttpStatus::OK);
        } catch (\Exception $e) {
            return Response::error($e->getMessage(), HttpStatus::INTERNAL_SERVER_ERROR);
        }
    }

    #[Route('/addresses/{id}', name: 'get_address', methods: ['GET'])]
    public function get(Ulid $id): Response
    {
        try {
            $address = $this->addressService->getAddressById($id);

            if ($address === null) {
                return Response::error("Address with id $id not found", HttpStatus::NOT_FOUND);
            }

            $data = $address->jsonSerialize();

            return Response::json($data, HttpStatus::OK);
        } catch (\Exception $e) {
            return Response::error($e->getMessage(), HttpStatus::INTERNAL_SERVER_ERROR);
        }
    }

    #[Route('/addresses', name: 'create_address', methods: ['POST'])]
    public function create(Request $request, ValidatorInterface $validator, ClientService $clientService): Response
    {
        try {
            $data = json_decode($request->getContent(), true);
            
            $address = new Address();
            
            $address->jsonDeserialize($data, $clientService);

            $errors = $validator->validate($address);

            if (count($errors) > 0) {
                return Response::error($errors, HttpStatus::BAD_REQUEST);
            }

            $address = $this->addressService->create($address);

            return Response::json($address->jsonSerialize(), HttpStatus::CREATED);
        } catch (\Exception $e) {
            return Response::error($e->getMessage(), HttpStatus::INTERNAL_SERVER_ERROR);
        }
    }
    
    #[Route('/addresses/{id}', name: 'update_address', methods: ['PUT'])]
    public function update(Ulid $id, Request $request, ValidatorInterface $validator, AddressService $addressService, ClientService $clientService): Response
    {
        try {
            $data = json_decode($request->getContent(), true);
            
            $address = $addressService->getAddressById($id);
            
            $address->jsonDeserialize($data, $clientService);
            
            $errors = $validator->validate($address);

            if (count($errors) > 0) {
                return Response::error($errors, HttpStatus::BAD_REQUEST);
            }

            $address = $this->addressService->update($id, $address);

            return Response::json($address->jsonSerialize(), HttpStatus::OK);
        } catch (\Exception $e) {
            return Response::error($e->getMessage(), HttpStatus::INTERNAL_SERVER_ERROR);
        }
    }

    #[Route('/addresses/{id}', name: 'delete_address', methods: ['DELETE'])]
    public function delete(Ulid $id)
    {
        try {

            $this->addressService->delete($id);

            return Response::json(null, HttpStatus::NO_CONTENT);
        } catch (\Exception $e) {
            return Response::error($e->getMessage(), HttpStatus::INTERNAL_SERVER_ERROR);
        }
    }
}