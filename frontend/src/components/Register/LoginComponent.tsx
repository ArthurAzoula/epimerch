import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputComponent from "./InputComponent";
import BorderButton from "../Buttons/BorderButton";
import { AuthContext } from '../../context/AuthContext';
import { toast } from 'react-toastify';

const LoginComponent: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if(loading){
      return;
    }
    
    if (!email || !password) {
      toast.error("Veuillez remplir tous les champs");
      return;
    }
    
    setLoading(true);
    
    toast.promise(login({login: email, password}).then(response => {
      setLoading(false);
      
      if(!response){
        throw new Error("Erreur lors de la connexion");
      }
      
      navigate("/");
      return response;
    }), {
      pending: 'Connexion en cours...',
      success: 'Connexion réussie',
      error: 'Erreur lors de la connexion',
    });
  };

  return (
    <div className="flex-grow flex justify-center min-h-full h-full">
      <div className="border-l border-r w-2/5 border-zinc-900 min-h-full h-full">
        <h1 className="flex items-center justify-center pt-24 pb-8 text-3xl font-bold">
          Connectez-vous à l'élégance
        </h1>
        <form onSubmit={handleSubmit} className="px-16 py-4">
          <div>
            <InputComponent
              name="login"
              typeInput="text"
              inputValue={email}
              handleOnChange={handleEmailChange}
              placeholder="Ex: henri@epitech.eu"
              isRequired={true}
              className="w-2/3"
            />
          </div>
          <div>
            <InputComponent
              name="password"
              typeInput="password"
              inputValue={password}
              handleOnChange={handlePasswordChange}
              placeholder="Mot de passe"
              isRequired={true}
              className="w-2/3"
            />
          </div>
          <div className="flex flex-col justify-center items-center">
            <div className="justify-end pt-8">
              <BorderButton
                text="Se connecter"
                disabled={loading}
                className="hover:bg-black hover:text-white transition-all ease-in-out duration-400"
              />
            </div>
          </div>
          <div className="flex justify-between pt-12 p-4">
            <Link
              className="hover:underline underline-offset-2"
              to={"/forgot_password"}
            >
              <p>Mot de passe oublié ?</p>
            </Link>
            <Link className="hover:underline underline-offset-2" to="/register">
              <p>Pas encore de compte ?</p>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginComponent;
