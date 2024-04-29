import { Error, getRequest, postRequest, putRequest, deleteRequest } from "./base.service";

type Cart = {
    id: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
};

const CartService = {

    async getCarts(): Promise<Cart[] | Error> {
        return getRequest<Cart[]>("/carts");
    },
    
    async getCartsByUserId(userId: string): Promise<Cart[] | Error> {
        return getRequest<Cart[]>(`/carts/${userId}`);
    },
    
    async createCart(data: { userId: string }): Promise<Cart | Error> {
        return postRequest<Cart>("/carts", data);
    },
    
    async updateCart(data: { id: string; userId: string }): Promise<Cart | Error> {
        return putRequest<Cart>("/carts", data);
    },
    
    async deleteCart(id: string): Promise<Cart | Error> {
        return deleteRequest<Cart>(`/carts/${id}`);
    }
    
};

export default CartService;