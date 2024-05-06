import { Error, getRequest, postRequest, putRequest, deleteRequest, BaseEntityData, Success } from "./base.service";

export type OrderItem = BaseEntityData & {
  name: string,
  description: string,
  photo: string,
  price: number,
  category: string,
  genre: string,
};

const OrderItemService = {
  
      async getOrderItems(): Promise<OrderItem[] | Error> {
          return getRequest<OrderItem[]>("/orderitems");
      },
      
      async getOrderItem(id: string): Promise<OrderItem | Error> {
          return getRequest<OrderItem>(`/orderitems/${id}`);
      },
      
      async createOrderItem(data: OrderItem): Promise<OrderItem | Error> {
          return postRequest<OrderItem>("/orderitems", data);
      },
      
      async updateOrderItem(id: string, data: Partial<OrderItem>): Promise<OrderItem | Error> {
          return putRequest<OrderItem>(`/orderitems/${id}`, data);
      },
      
      async deleteOrderItem(id: string): Promise<Success | Error> {
          return deleteRequest<Success>(`/orderitems/${id}`);
      }
      
  };
  
  export default OrderItemService;