import React, { useEffect, useContext, useState } from "react";
import CartService from "../service/cart.service";
import { CartItem } from "../service/cartitem.service";
import { AuthContext } from "./AuthContext";

export const CartContext = React.createContext<{
  cartItems: CartItem[] | null,
  refreshCartItems: () => Promise<void>,
  addProductToCart: (productId: string, quantity: number) => Promise<boolean>,
}>({
  cartItems: null,
  refreshCartItems: async () => {},
  addProductToCart: async () => false,
});

export const CartContextProvider = ({children} : {children: JSX.Element}): JSX.Element => {
    const [cartItems, setCartItems] = useState<CartItem[] | null>(null);
    const { user } = useContext(AuthContext);
    
    useEffect(() => {
        refreshCartItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    async function refreshCartItems() {
        if (user?.cart?.id) {
            const response = await CartService.getProductsFromCart(user.cart.id);
            if (!("error" in response)) {
                setCartItems(response);
            }
        }
    }
    
    async function addProductToCart(productId: string, quantity: number) {
        if (user?.cart?.id) {
            const response = await CartService.addProductToCart(user.cart.id, productId, quantity);
            if (!("error" in response)) {
                refreshCartItems();
                return true;
            }
        }
        return false;
    }
    
    return (
        <CartContext.Provider value={{ cartItems, refreshCartItems, addProductToCart }}>
        {children}
        </CartContext.Provider>
    );
};