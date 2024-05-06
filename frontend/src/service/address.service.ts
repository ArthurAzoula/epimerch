import { Error, getRequest, postRequest, putRequest, deleteRequest, BaseEntityData, Success } from "./base.service";

export type Address = BaseEntityData & {
    city: string,
    name: string,
    country: string,
    code: string,
}

const AddressService = {
    async getAddresses(): Promise<Address[] | Error> {
        return getRequest<Address[]>("/addresses");
    },
    
    async createAddress(data: Address): Promise<Address | Error> {
        return postRequest<Address>("/addresses", data);
    },
    
    async updateAddress(id: string, data: Partial<Address>): Promise<Address | Error> {
        return putRequest<Address>(`/addresses/${id}`, data);
    },
    
    async deleteAddress(id: string): Promise<Success | Error> {
        return deleteRequest<Success>(`/addresses/${id}`);
    },
};

export default AddressService;