<?php

namespace App\Controller;

use App\Entity\Client;
use App\Security\ClientProvider;
use App\Service\ClientService;
use App\Utils\HttpStatus;
use App\Utils\Response;
use Exception;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class AuthController extends AbstractController
{

  #[Route('/login', name: 'login', methods: ['POST'])]
  public function login(Request $request, ClientProvider $clientProvider, ValidatorInterface $validator, JWTTokenManagerInterface $JWTManager): Response
  {
    try {
      $params = json_decode($request->getContent(), true);

      $client = $clientProvider->loadUserByIdentifier($params["identifiant"]);

      if (!$client) {
        return Response::error("Cet utilisateur n'existe pas", HttpStatus::NOT_FOUND);
      }

      if (!password_verify($params["password"], $client->getPassword())) {
        return Response::error("Mot de passe incorrect", HttpStatus::BAD_REQUEST);
      }

      $client->setRoles(['IS_AUTHENTICATED_FULLY']);

      $token = $JWTManager->create($client);

      return Response::json(['token' => $token]);
    } catch (Exception $e) {
      return Response::error($e->getMessage(), HttpStatus::INTERNAL_SERVER_ERROR);
    }
  }

  #[Route('/register', name: 'register', methods: ['POST'])]
  public function register(Request $request, ClientService $clientService, UserPasswordHasherInterface $passwordHasher): Response
  {
    try {
      $params = json_decode($request->getContent(), true);

      $verifyClientExist = $clientService->getClientByEmail($params["email"]);
      if ($verifyClientExist) {
        return Response::error("Cette adresse mail existe déjà", HttpStatus::BAD_REQUEST);
      }

      $plainedTextPassword = $params["password"];

      $client = new Client();
      $client->setEmail($params["email"]);
      $client->setLogin($params["login"]);
      $client->setFirstname($params["firstname"]);
      $client->setLastname($params["lastname"]);

      $hashedPassword = $passwordHasher->hashPassword(
        $client,
        $plainedTextPassword
      );

      $client->setPassword($hashedPassword);

      $clientService->create($client);

      return Response::success("Votre compte a bien été crée !", HttpStatus::CREATED);
    } catch (Exception $e) {
      return Response::error($e->getMessage(), HttpStatus::INTERNAL_SERVER_ERROR);
    }
  }

  #[Route('/me', name: 'auth_me', methods: ['GET'])]
  public function getUserConnected(ClientService $clientService): Response
  {
    try {

      $mail = $this->getUser()->getUserIdentifier();

      $client = $clientService->getClientByEmail($mail);

      if (!$client) {
        return Response::error("Cet utilisateur n'existe pas", HttpStatus::NOT_FOUND);
      }

      return Response::json($client->jsonSerialize(), HttpStatus::OK);
    } catch (Exception $e) {
      return Response::error($e->getMessage(), HttpStatus::INTERNAL_SERVER_ERROR);
    }
  }

  #[Route('/admin', name: 'admin', methods: ['GET'])]
  public function admin(): Response
  {
    return Response::success("OK", HttpStatus::OK);
  }


  #[Route('/forgot-password', name: 'forgot_password', methods: ['POST'])]
  public function forgotPassword(Request $request): Response
  {

    return new Response(json_encode(['message' => 'Forgot Password Route']));
  }
}
