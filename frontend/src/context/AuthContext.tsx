import React, { useEffect } from 'react';
import AuthService, { Login, User, Register } from '../service/auth.service';

export const AuthContext = React.createContext<{
  user: User | null,
  isAdmin: boolean,
  loading: boolean,
  refreshUser: () => Promise<boolean>,
  register: (user: Register) => Promise<boolean>,
  login: (user: Login) => Promise<boolean>,
  logout: () => Promise<boolean>,
}>({
  user : null,
  isAdmin: false,
  loading: false,
  refreshUser: async () => false,
  register: async () => false,
  login: async () => false,
  logout: async () => false,
});

const AuthContextProvider = ({children} : {children: JSX.Element}): JSX.Element => {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [user, setUser] = React.useState<User | null>(null);
  const [isAdmin, setIsAdmin] = React.useState<boolean>(false);
  
  useEffect(() => {
    refreshUser();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  async function refreshUser() {
    setLoading(true);
    return await AuthService.getUser().then((response) => {
      if ("error" in response) {
        setUser(null);
        setIsAdmin(false);
        return false;
      } else {
        setUser(response as User);
        refreshAdmin();
        return true;
      }
    });
  }
  
  async function refreshAdmin() {
    return await AuthService.isAdmin().then((response) => {
      setIsAdmin("success" in response);
    }).finally(() => setLoading(false));
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
    <AuthContext.Provider value={{user: user, isAdmin: isAdmin, loading: loading, refreshUser: refreshUser, register: register, login: login, logout: logout}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;