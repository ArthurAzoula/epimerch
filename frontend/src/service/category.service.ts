import { Error, getRequest, postRequest, putRequest, deleteRequest } from "./base.service";

type Category = {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
};

const CategoryService = {
  
      async getCategories(): Promise<Category[] | Error> {
          return getRequest<Category[]>("/categories");
      },
      
      async getCategory(id: string): Promise<Category | Error> {
          return getRequest<Category>(`/categories/${id}`);
      },
      
      async createCategory(data: { name: string }): Promise<Category | Error> {
          return postRequest<Category>("/categories", data);
      },
      
      async updateCategory(data: { id: string; name: string }): Promise<Category | Error> {
          return putRequest<Category>("/categories", data);
      },
      
      async deleteCategory(id: string): Promise<Category | Error> {
          return deleteRequest<Category>(`/categories/${id}`);
      }
      
  };