<?php

namespace App\Controller;

use App\Entity\User;
use App\Service\UserService;
use App\Utils\HttpStatus;
use App\Utils\Response;
use Doctrine\ORM\EntityManager;
use Exception;
use Symfony\Bridge\Doctrine\IdGenerator\UlidGenerator;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;


class AuthController extends AbstractController {
  
  #[Route('/login', name: 'login', methods: ['POST'])]
  public function login(Request $request, UserService $userService, ValidatorInterface $validator): Response {
    return Response::json(['message' => 'Login Route']);
  }
  
  #[Route('/register', name: 'register', methods: ['POST'])]
  public function register(Request $request, UserService $userService, UserPasswordHasherInterface $passwordHasher): Response {
    try {
      $params = json_decode($request->getContent(), true);
      
      $verifyUserExist = $userService->getUserByEmail($params["email"]);
      if ($verifyUserExist) {
        return Response::error("Cette adresse mail existe déjà", HttpStatus::BAD_REQUEST);
      }

      $plainedTextPassword = $params["password"];

      
      $user = new User();
      $user->setEmail($params["email"]);
      $user->setLogin($params["login"]);
      $user->setFirstname($params["firstname"]);
      $user->setLastname($params["lastname"]);

      $hashedPassword = $passwordHasher->hashPassword(
        $user,
        $plainedTextPassword
      );
      
      $user->setPassword($hashedPassword);
      
      $userService->create($user);
      
      return new Response(json_encode(['message' => 'Login Route']));
    } catch (Exception $e) {
      return Response::error($e->getMessage(), HttpStatus::INTERNAL_SERVER_ERROR);
    }
  }
  
  #[Route('/forgot-password', name: 'forgot_password', methods: ['POST'])]
  public function forgotPassword(Request $request): Response {
    
    return new Response(json_encode(['message' => 'Forgot Password Route']));
  }
  
}