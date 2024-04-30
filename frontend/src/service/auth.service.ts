import { Success, Error, getRequest, postRequest, putRequest, deleteRequest } from "./base.service";

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
    
};

export default AuthService;