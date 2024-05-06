import { Error, getRequest, postRequest, putRequest, deleteRequest, BaseEntityData } from "./base.service";

export type Product = BaseEntityData & {
    name: string;
    description?: string;
    price: number;
    photo?: string;
    category: string;
    genre: string;
};

const ProductService = {
  
    async getProducts(): Promise<Product[] | Error> {
        return getRequest<Product[]>("/products");
    },
    
    async getProduct(id: string): Promise<Product | Error> {
        return getRequest<Product>(`/products/${id}`);
    },
    
    async createProduct(data: Product): Promise<Product | Error> {
        return postRequest<Product>("/products", data);
    },
    
    async updateProduct(data: Product): Promise<Product | Error> {
        return putRequest<Product>("/products", data);
    },
    
    async deleteProduct(id: string): Promise<Product | Error> {
        return deleteRequest<Product>(`/products/${id}`);
    }
    
};

export default ProductService;