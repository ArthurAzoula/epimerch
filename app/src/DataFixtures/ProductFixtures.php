<?php

namespace App\DataFixtures;

use App\Entity\Product;
use Category;
use Genre;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class ProductFixtures extends Fixture
{
    
    public function load(ObjectManager $manager): void
    {
        for ($i = 0; $i < 1000; $i++) {
            $prd = new Product();
            $prd->setName('Product ' . $i);
            $prd->setPrice(mt_rand(10, 100));
            $prd->setDescription('Description of product ' . $i);
            $prd->setPhoto('https://source.unsplash.com/random/?clothing');
            $prd->setCategory(Category::getRandom());
            $prd->setGenre(Genre::getRandom());
            $manager->persist($prd);
        }

        $manager->flush();
    }
}
