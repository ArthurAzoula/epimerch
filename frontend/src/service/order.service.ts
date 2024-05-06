import { Error, getRequest, postRequest, putRequest, deleteRequest, BaseEntityData, Success } from "./base.service";
import { Client } from './client.service';

export type Order = BaseEntityData & {
  totalPrice: number,
  isPaid: boolean,
  client: Client,
};

const OrderService = {

    async getOrders(): Promise<Order[] | Error> {
        return getRequest<Order[]>("/orders");
    },
    
    async getOrdersByUserId(userId: string): Promise<Order[] | Error> {
        return getRequest<Order[]>(`/orders/${userId}`);
    },
    
    async createOrder(data: Order): Promise<Order | Error> {
        return postRequest<Order>("/orders", data);
    },
    
    async updateOrder(id: string, data: Partial<Order>): Promise<Order | Error> {
        return putRequest<Order>(`/orders/${id}`, data);
    },
    
    async deleteOrder(id: string): Promise<Success | Error> {
        return deleteRequest<Success>(`/orders/${id}`);
    }
    
};

export default OrderService;