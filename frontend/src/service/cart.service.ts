import { Error, getRequest, postRequest, putRequest, deleteRequest, BaseEntityData, Success } from "./base.service";
import { Client } from './client.service';

export type Cart = BaseEntityData & {
    client: Client;
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
    }
    
};

export default CartService;