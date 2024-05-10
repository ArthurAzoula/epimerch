import { Error, getRequest, postRequest, putRequest, deleteRequest, BaseEntityData, Success } from "./base.service";
import { Client } from './client.service';
import { OrderItem } from "./orderitem.service";

export type Order = BaseEntityData & {
  totalPrice: number,
  isPaid: boolean,
  client: Client,
};

const OrderService = {

    async getOrders(): Promise<Order[] | Error> {
        return getRequest<Order[]>("/orders");
    },
    
    async getAdminOrders(): Promise<Order[] | Error> {
        return getRequest<Order[]>("/admin/orders");
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
    },

    async getOrdersByClientId(clientId: string): Promise<Order[] | Error> {
        return getRequest<Order[]>(`/orders/clients/${clientId}`);
    },

    async getOrderItems(orderId: string): Promise<OrderItem[] | Error> {
        return getRequest<OrderItem[]>(`/orders/${orderId}/products`);
    }
    
};

export default OrderService;