import React, { useEffect } from 'react';
import AuthService, { Login, User, Register } from '../service/auth.service';

export type AuthUser = User & {isAdmin: boolean};

export const AuthContext = React.createContext<{
  user: AuthUser | null, 
  refreshUser: () => Promise<boolean>,
  register: (user: Register) => Promise<boolean>,
  login: (user: Login) => Promise<boolean>,
  logout: () => Promise<boolean>,
}>({
  user : null,
  refreshUser: async () => false,
  register: async () => false,
  login: async () => false,
  logout: async () => false,
});

const AuthContextProvider = ({children} : {children: JSX.Element}): JSX.Element => {
  const [user, setUser] = React.useState<AuthUser | null>(null);
  
  useEffect(() => {
    refreshUser();
  }, []);
  
  async function refreshUser() {
    return await AuthService.getUser().then((response) => {
      if ("error" in response) {
        setUser(null);
        return false;
      } else {
        setUser(response as AuthUser);
        return true;
      }
    });
  }
  
  async function register(user: Register) {
    return await AuthService.register(user).then((response) => {
      return "success" in response;
    }).catch(() => false);
  }
  
  async function login(user: Login) {
    return await AuthService.login(user).then((response) => {
      if("token" in response){
        localStorage.setItem("token", response.token);
        return refreshUser();
      }
      return false;
    }).catch(() => false);
  }
  
  async function logout() {
    localStorage.removeItem("token");
    return await refreshUser();
  }
  
  return (
    <AuthContext.Provider value={{user: user, refreshUser: refreshUser, register: register, login: login, logout: logout}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;