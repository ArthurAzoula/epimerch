<?php 

namespace App\Controller;

use App\Entity\Address;
use App\Service\AddressService;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Response;
use HttpStatus;

class AddressController 
{
    private AddressService $addressService;

    public function __construct(AddressService $addressService)
    {
        $this->addressService = $addressService;
    }

    #[Route('/addresses', name: 'addresses', methods: ['GET'])]
    public function index(): Response
    {
        try {
            $addresses = $this->addressService->getAll();

            foreach ($addresses as $address) {
                $data[] = $address->jsonSerialize();
            }

            return Response::json($data, HttpStatus::OK);
        } catch (\Exception $e) {
            return Response::error($e->getMessage(), HttpStatus::INTERNAL_SERVER_ERROR);
        }
    }

    #[Route('/addresses/{id}', name: 'get_address', methods: ['GET'])]
    public function get(int $id): Response
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
    public function create(Request $request, SerializerInterface $serializer, ValidatorInterface $validator): Response
    {
        try {
            $address = $serializer->deserialize($request->getContent(), Address::class, 'json');

            $errors = $validator->validate($address);

            if (count($errors) > 0) {
                return Response::error($errors, HttpStatus::BAD_REQUEST);
            }

            $this->addressService->create($address);

            return Response::json($address->jsonSerialize(), HttpStatus::CREATED);
        } catch (\Exception $e) {
            return Response::error($e->getMessage(), HttpStatus::INTERNAL_SERVER_ERROR);
        }
    }

    #[Route('/addresses/{id}', name: 'delete_address', methods: ['DELETE'])]
    public function delete(int $id)
    {
        try {

            $this->addressService->delete($id);

            return Response::json(null, HttpStatus::NO_CONTENT);
        } catch (\Exception $e) {
            return Response::error($e->getMessage(), HttpStatus::INTERNAL_SERVER_ERROR);
        }
    }
}