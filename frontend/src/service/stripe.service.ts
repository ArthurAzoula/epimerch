import { Error, getRequest, postRequest, putRequest, deleteRequest, Success } from "./base.service";

export type ClientSecretType = {
  client_secret: string;
};

const StripeService = {
  
    async getClientSecret(orderId: string): Promise<ClientSecretType | Error> {
        return getRequest<ClientSecretType>(`/stripe/${orderId}`);
    },
    
};

export default StripeService;