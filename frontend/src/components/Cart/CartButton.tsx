import React, { useState, useContext } from "react";
import { ShoppingCart } from "lucide-react";
import CartMenu from "./CartMenu";
import { CartContext } from "../../context/CartContext";

const CartButton = () => {
  const [isOpen, setIsOpen] = useState(false);

    const { cartItems } = useContext(CartContext);

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };


  return (
    <div className="relative">
      <button onClick={handleButtonClick} className="relative border border-transparent rounded-full p-1 transition-all duration-200 ease-in-out hover:border-black group">
        <ShoppingCart className="text-black transition-all duration-200 ease-in-out" />
        <span className="absolute text-[8px] -top-3 left-2 bg-red-500 text-white rounded-full px-2 py-1 shadow-xl w-5 h-5 flex items-center justify-center">
          {cartItems?.reduce((acc, item) => acc + item.quantity, 0)}
        </span>{" "}
      </button>
      {isOpen && <CartMenu />}
    </div>
  );
};

export default CartButton;
