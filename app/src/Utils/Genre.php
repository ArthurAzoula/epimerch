<?php

enum Genre: string {

    case MALE = "male";
    case FEMALE = "female";
    case UNISEX = "unisex";
    case KIDS = "kids";
    case OTHER = "other";

    public static function getRandom(): self {
        $values = self::cases();
        return $values[array_rand($values)];
    }
    
    public static function isValid(string $genre): bool {
        return Genre::tryFrom($genre) != null;
    }
    
}