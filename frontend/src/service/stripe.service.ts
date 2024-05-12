import { Error, getRequest } from "./base.service";
import { Order } from './order.service';

export type ClientSecretType = {
  client_secret: string;
};

const StripeService = {
  
    async getClientSecret(orderId: string): Promise<ClientSecretType | Error> {
        return getRequest<ClientSecretType>(`/stripe/${orderId}`);
    },
    
    async validatePayment(paymentIntentId: string): Promise<Order | Error> {
        return getRequest<Order>(`/stripe/validate/${paymentIntentId}`);
    }
    
};

export default StripeService;