import { Address } from "./address.service";
import { Success, Error, getRequest, postRequest, putRequest, deleteRequest } from "./base.service";
import { Cart } from "./cart.service";

export type Login = {
  login: string;
  password: string;
};

export type Register = {
  firstname: string,
  lastname: string,
  login: string,
  email: string,
  password: string,
}

export type User = {
  firstname: string,
  lastname: string,
  login: string,
  email: string,
  cart: Cart,
  addresses: Address
}

export type Token = {
  token: string,
}

const AuthService = {

    async login(data: Login): Promise<Token | Error> {
        return postRequest<Token>("/login", data);
    },
    
    async register(data: Register): Promise<Success | Error> {
        return postRequest<Success>("/register", data);
    },
    
    async getUser(): Promise<User | Error> {
        return getRequest<User>("/me");
    },
    
    async isAdmin(): Promise<Success | Error> {
        return getRequest<Success>("/admin");
    },
    
};

export default AuthService;