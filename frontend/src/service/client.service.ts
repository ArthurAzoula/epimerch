import { Error, getRequest, postRequest, putRequest, deleteRequest, BaseEntityData, Success } from "./base.service";

export type Client = BaseEntityData & {
    firstname: string,
    lastname: string,
    email: string,
    password: string,
};

const ClientService = {
  async getClients(): Promise<Client[] | Error> {
      return getRequest<Client[]>("/users");
  },
  
  async getClientById(id: string): Promise<Client | Error> {
      return getRequest<Client>(`/users/${id}`);
  },
  
  async createClient(data: Client): Promise<Client | Error> {
      return postRequest<Client>("/users", data);
  },
  
  async updateClient(id: string, data: Partial<Client>): Promise<Client | Error> {
      return putRequest<Client>(`/users/${id}`, data);
  },
  
  async deleteClient(id: string): Promise<Success | Error> {
      return deleteRequest<Success>(`/users/${id}`);
  }
    
};

export default ClientService;;