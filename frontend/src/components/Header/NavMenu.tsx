import { useState, useEffect } from "react";
import CartService from "../../service/cart.service";

type NavMenuProps = {
  categorie: string;
};

const NavMenu = ({ categorie }: NavMenuProps) => {
  const [sousCategories, setSousCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchSousCategories = async () => {
      try {
        const response = await CartService.getProductsFromCart("monid");
        const data = await response.json();
        setSousCategories(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchSousCategories();
  }, [categorie]);

  return (
    <div className="flex">
      <ul className="absolute  bg-red-500 w-44 -left-16">
        {sousCategories &&
          sousCategories?.map((sousCategorie, index) => (
            <li key={index} className="text-center">
              {sousCategorie}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default NavMenu;
