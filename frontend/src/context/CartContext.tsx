import React, { useEffect, useState } from "react";
import CartService from "../service/cart.service";
import { CartItem } from "../service/cartitem.service";

export const CartContext = React.createContext<{
  cartItems: CartItem[] | null,
  refreshCartItems: () => Promise<void>,
  addProductToCart: (productId: string, quantity: number) => Promise<boolean>,
  updateQuantity: (productId: string, quantity: number) => Promise<void>,
  removeItem: (productId: string) => Promise<void>,
}>({
  cartItems: null,
  refreshCartItems: async () => {},
  addProductToCart: async () => false,
  updateQuantity: async () => {},
  removeItem: async () => {},
});

export const CartContextProvider = ({children} : {children: JSX.Element}): JSX.Element => {
    const [cartItems, setCartItems] = useState<CartItem[] | null>(null);
    
    useEffect(() => {
        refreshCartItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    async function refreshCartItems() {
        const response = await CartService.getProductsFromCart();
        if (!("error" in response)) {
            response.sort((a, b) => a.product.name.localeCompare(b.product.name));
            setCartItems(response);
        }
    }
    
    async function addProductToCart(productId: string, quantity: number) {
        const response = await CartService.addProductToCart(productId, quantity);
        if (!("error" in response)) {
            refreshCartItems();
            return true;
        }
        return false;
    }

    async function updateQuantity(productId: string, quantity: number) {
        const response = await CartService.updateQuantity(productId, quantity);
        if (!("error" in response)) {
            refreshCartItems();
        }
    }

    async function removeItem(productId: string) {
        const response = await CartService.removeProductFromCart(productId);
        if (!("error" in response)) {
            refreshCartItems();
        }
    }
    
    return (
        <CartContext.Provider value={{ cartItems, refreshCartItems, addProductToCart, updateQuantity, removeItem }}>
        {children}
        </CartContext.Provider>
    );
};