import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const CartMenu = () => {

    const { user } = useContext(AuthContext);

    const length = user?.cart?.cartItems?.length ?? 0;

    console.log(length);


    return (
            <div className="absolute right-0 w-64 mt-2 py-2 bg-white border rounded shadow-lg">
                {length > 0 && user?.cart?.cartItems?.map((_item, index) => (
                    <div key={index} className="flex justify-between items-center px-4 py-2 border-b">
                        {/* Affichez les détails de l'article ici */}
                    </div>
                ))}
                {length == 0 && (
                    <p className="px-4 py-2 text-gray-800">Votre panier est vide</p>
                )}
            </div>
        );
  };
  
  export default CartMenu;