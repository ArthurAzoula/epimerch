import { Error, getRequest, postRequest, putRequest, deleteRequest, BaseEntityData, Success } from "./base.service";
import { CartItem } from "./cartitem.service";
import { Client } from './client.service';
import { Order } from "./order.service";

export type Cart = BaseEntityData & {
    cartItems: CartItem[],
};

const CartService = {

    async getCarts(): Promise<Cart[] | Error> {
        return getRequest<Cart[]>("/carts");
    },
    
    async getCartsByUserId(userId: string): Promise<Cart[] | Error> {
        return getRequest<Cart[]>(`/carts/${userId}`);
    },
    
    async createCart(data: Cart): Promise<Cart | Error> {
        return postRequest<Cart>("/carts", data);
    },
    
    async updateCart(id: string, data: Partial<Cart>): Promise<Cart | Error> {
        return putRequest<Cart>(`/carts/${id}`, data);
    },
    
    async deleteCart(id: string): Promise<Success | Error> {
        return deleteRequest<Success>(`/carts/${id}`);
    },

    async getProductsFromCart(): Promise<CartItem[] | Error> {
        return getRequest<CartItem[]>(`/carts`);
    },

    async addProductToCart(productId: string, quantity: number): Promise<CartItem | Error> {
        return postRequest<CartItem>(`/carts/${productId}`, { quantity });
    },

    async updateQuantity(productId: string, quantity: number): Promise<CartItem | Error> {
        return putRequest<CartItem>(`/carts/${productId}`, { quantity });
    },

    async removeProductFromCart(productId: string): Promise<Success | Error> {
        return deleteRequest<Success>(`/carts/${productId}`);
    },

    async validateCart(): Promise<Order | Error> {
        return postRequest<Order>("/carts/validate");
    },
    
};

export default CartService;