<?php

namespace App\DataFixtures;

use App\Entity\Client;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class ClientFixtures extends Fixture
{

    private UserPasswordHasherInterface $passwordHasher;

    public function __construct(UserPasswordHasherInterface $ph)
    {
        $this->passwordHasher = $ph;
    }

    public function load(ObjectManager $manager): void
    {
        $client = new Client();
        $client->setLogin('johndoe');
        $client->setEmail('client@client.com');
        $client->setPassword($this->passwordHasher->hashPassword($client, 'client'));
        $client->setFirstname('John');
        $client->setLastname('Doe');
        $client->setRoles(['IS_AUTHENTICATED_FULLY']);

        $manager->persist($client);

        $admin = new Client();
        $admin->setLogin('admin');
        $admin->setEmail('admin@admin.com');
        $admin->setPassword($this->passwordHasher->hashPassword($admin, 'admin'));
        $admin->setFirstname('Admin');
        $admin->setLastname('Admin');
        $admin->setRoles(['ROLE_ADMIN', 'IS_AUTHENTICATED_FULLY']);
        
        $manager->persist($admin);

        $manager->flush();
    }
}