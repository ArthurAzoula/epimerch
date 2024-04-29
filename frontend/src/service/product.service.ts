import { Error, getRequest, postRequest, putRequest, deleteRequest } from "./base.service";

type Product = {
    id: string;
    name: string;
    price: number;
    createdAt: string;
    updatedAt: string;
};

const ProductService = {
  
    async getProducts(): Promise<Product[] | Error> {
        return getRequest<Product[]>("/products");
    },
    
    async getProduct(id: string): Promise<Product | Error> {
        return getRequest<Product>(`/products/${id}`);
    },
    
    async createProduct(data: { name: string; price: number }): Promise<Product | Error> {
        return postRequest<Product>("/products", data);
    },
    
    async updateProduct(data: { id: string; name: string; price: number }): Promise<Product | Error> {
        return putRequest<Product>("/products", data);
    },
    
    async deleteProduct(id: string): Promise<Product | Error> {
        return deleteRequest<Product>(`/products/${id}`);
    }
    
};