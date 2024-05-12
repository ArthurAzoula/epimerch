import React, { useContext, useEffect, useState } from "react";
import CartService, { Cart } from "../service/cart.service";
import { CartItem } from "../service/cartitem.service";
import { AuthContext } from './AuthContext';

export const CartContext = React.createContext<{
  cart: Cart | null,
  cartItems: CartItem[] | null,
  refreshCart: () => Promise<void>,
  refreshCartItems: () => Promise<void>,
  updateCart: (addressId: string) => Promise<void>,
  addProductToCart: (productId: string, quantity: number) => Promise<boolean>,
  updateQuantity: (productId: string, quantity: number) => Promise<void>,
  removeItem: (productId: string) => Promise<void>,
}>({
  cart: null,
  cartItems: null,
  refreshCart: async () => {},
  refreshCartItems: async () => {},
  updateCart: async () => {},
  addProductToCart: async () => false,
  updateQuantity: async () => {},
  removeItem: async () => {},
});

export const CartContextProvider = ({children} : {children: JSX.Element}): JSX.Element => {
    const {user} = useContext(AuthContext);
    const [cart, setCart] = useState<Cart | null>(null);
    const [cartItems, setCartItems] = useState<CartItem[] | null>(null);
    
    useEffect(() => {
        refreshCart();
        refreshCartItems();
    }, [user]);
    
    async function refreshCart() {
        const response = await CartService.getCart();
        if(!response){
            setCart(null);
            return;
        }
        
        if (!("error" in response)) {
            setCart(response);
        } else {
            setCart(null);
        }
    }
    
    async function updateCart(addressId: string){
        if(cart === null){
            return;
        }
        
        const response = await CartService.updateCartAddress(addressId);
        if(!response){
            setCart(null);
            return;
        }
        
        if (!("error" in response)) {
            setCart(response);
        }
    }
    
    async function refreshCartItems() {
        const response = await CartService.getProductsFromCart();
        if(!response){
            setCartItems(null);
            return;
        }
        
        if (!("error" in response)) {
            response.sort((a, b) => a.product.name.localeCompare(b.product.name));
            setCartItems(response);
        }
    }
    
    async function addProductToCart(productId: string, quantity: number) {
        const response = await CartService.addProductToCart(productId, quantity);
        if(!response){
            return false;
        }
        
        if (!("error" in response)) {
            refreshCartItems();
            return true;
        }
        return false;
    }

    async function updateQuantity(productId: string, quantity: number) {
        const response = await CartService.updateQuantity(productId, quantity);
        if(!response){
            return;
        }
        if (!("error" in response)) {
            refreshCartItems();
        }
    }

    async function removeItem(productId: string) {
        const response = await CartService.removeProductFromCart(productId);
        if(!response){
            return;
        }
        if (!("error" in response)) {
            refreshCartItems();
        }
    }
    
    return (
        <CartContext.Provider value={{cart, cartItems, updateCart, refreshCart, refreshCartItems, addProductToCart, updateQuantity, removeItem }}>
        {children}
        </CartContext.Provider>
    );
};