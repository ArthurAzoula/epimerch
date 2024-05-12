import { Error, getRequest, postRequest, putRequest, deleteRequest, BaseEntityData } from "./base.service";

export type Category = BaseEntityData & {
    name: string;
};

const CategoryService = {
  
      async getCategories(): Promise<Category[] | Error> {
          return getRequest<Category[]>("/categories");
      },
      
      async getCategory(id: string): Promise<Category | Error> {
          return getRequest<Category>(`/categories/${id}`);
      },
      
      async createCategory(data: Category): Promise<Category | Error> {
          return postRequest<Category>("/categories", data);
      },
      
      async updateCategory(id: string, data: Category): Promise<Category | Error> {
          return putRequest<Category>(`/categories/${id}`, data);
      },
      
      async deleteCategory(id: string): Promise<Category | Error> {
          return deleteRequest<Category>(`/categories/${id}`);
      }
      
  };
  
  export default CategoryService;