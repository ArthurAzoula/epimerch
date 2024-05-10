import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { AuthContext } from "../../context/AuthContext";
import {
  DollarSign,
  Box,
  PlusIcon,
  MinusIcon,
  XIcon,
} from "lucide-react";
import { Link } from 'react-router-dom';

const CartMenu = () => {
  const { cartItems, updateQuantity, removeItem } = useContext(CartContext);
  const { user } = useContext(AuthContext);

  const getTotal = () => {
    return cartItems?.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    );
  };

  return (
    <div className="absolute right-0 w-96 mt-2 py-2 bg-white border rounded shadow-lg z-20">
      <h1 className="text-center mb-4">
        Hey <span className="font-medium">{user?.firstname}</span>, votre panier
        semble avoir faim !
      </h1>{" "}
      {cartItems?.length ? (
        cartItems.map((item) => (
          <div
            key={item.product.id}
            className="relative flex items-center px-4 py-2 gap-4 border-b w-full last:border-b-0"
          >
            <img
              className="w-24 h-24 object-cover"
              src={item.product.photo}
              alt={item.product.name}
            />
            <div className="ml-2 flex-grow">
              <h2 className="text-lg font-semibold">{item.product.name}</h2>
              <p className="text-sm text-gray-500 flex items-center">
                <Box size={16} className="mr-1" /> Quantité(s) : {item.quantity}
              </p>
              <p className="text-sm text-gray-500 flex items-center">
                <DollarSign size={16} className="mr-1" /> Prix: $
                {item.product.price}
              </p>
            </div>
            <div className="absolute right-2 bottom-4 flex gap-2">
              <MinusIcon
                onClick={() => item.quantity > 1 ? updateQuantity(item.product.id, item.quantity - 1) : null}
                className="text-red-700 hover:text-red-800 transition-all hover:scale-110 border rounded-full cursor-pointer"
                size={20}
              />
              <PlusIcon
                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                className="text-green-700 hover:text-green-800 transition-all hover:scale-110 border rounded-full cursor-pointer"
                size={20}
              />
            </div>
            <div className="absolute top-2 right-2 cursor-pointer">
              <XIcon
                onClick={() => removeItem(item.product.id)}
                className="text-gray-500 hover:text-gray-600 transition-all hover:scale-110 border rounded-full"
                size={20}
              />
            </div>
          </div>
        ))
      ) : (
        <p className="text-center p-2 text-gray-500">
          Votre panier semble vide.
        </p>
      )}
      <div className="flex justify-between items-center px-4 py-2">
        <p className="text-lg font-semibold">Total: ${getTotal()}</p>
        <Link to={'/cart'} className="border border-solid border-black py-1 px-2 rounded hover:bg-black hover:text-white transition-all ease-in-out duration-300">
          Valider le panier
        </Link>
      </div>
    </div>
  );
};

export default CartMenu;
