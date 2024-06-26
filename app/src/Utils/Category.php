<?php 

enum Category: string {
    case SHIRT = "shirt";
    case PANTS = "pants";
    case SHOES = "shoes";
    case HAT = "hat";
    case SUITS = "suits";
    case DRESS = "dress";
    case SKIRT = "skirt";
    case JACKET = "jacket";
    case COAT = "coat";
    case SWEATER = "sweater";
    case SHORTS = "shorts";
    case ACCESSORIES = "accessories";
    case OTHER = "other";

    public static function getRandom(): self {
        $values = self::cases();
        return $values[array_rand($values)];
    }
    
    public static function isValid(string $category): bool {
        return Category::tryFrom($category) != null;
    }

}


