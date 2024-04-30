import React, { useState } from "react";
import { Link } from "react-router-dom";
import InputComponent from "./InputComponent";
import BorderButton from "../Header/BorderButton";

const LoginComponent: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Ajoutez ici la logique de soumission du formulaire
    console.log("Adresse e-mail:", email);
    console.log("Mot de passe:", password);
  };

  return (
    <div className="flex-grow flex justify-center min-h-full h-full">
      <div className="border-l-2 border-r-2 w-2/5 border-zinc-900 min-h-full h-full">
        <h1 className="flex items-center justify-center pt-16 pb-8 text-3xl font-bold">CONNEXION</h1>
        <form onSubmit={handleSubmit} className="">
          <div>
            <InputComponent
              typeInput="email"
              inputValue={email}
              handleOnChange={handleEmailChange}
              placeholder="Ex: henri@epitech.eu"
              isRequired={true}
              className="w-1/3"
            />
          </div>
          <div>
            <InputComponent
              typeInput="password"
              inputValue={password}
              handleOnChange={handlePasswordChange}
              placeholder="Mot de passe"
              isRequired={true}
              className="w-1/3"
            />
          </div>
          <div className="flex justify-center items-center">
            <div className="flex w-2/6 justify-end pt-4">
              <BorderButton text="Se connecter" />
            </div>
            <div className="flex">Mot de passe oublié </div>
          </div>
        </form>
      </div>
    </div>

    // <div className="flex">
    //   <div className="flex justify-center items-center w-full">
    //     <h2 className="text-3xl uppercase font-bold">Connexion</h2>
    //   </div>
    //   <form
    //     onSubmit={handleSubmit}
    //     className="border-l-2 border-r-2 border-black w-1/2"
    //   >
    //     <div>
    //       <InputComponent
    //         typeInput="email"
    //         inputValue={email}
    //         handleOnChange={handleEmailChange}
    //         placeholder="Ex: henri@epitech.eu"
    //         isRequired={true}
    //         className="w-1/3"
    //       />
    //     </div>
    //     <div>
    //       <InputComponent
    //         typeInput="password"
    //         inputValue={password}
    //         handleOnChange={handlePasswordChange}
    //         placeholder="Mot de passe"
    //         isRequired={true}
    //         className="w-1/3"
    //       />
    //     </div>
    //     <BorderButton text="Se connecter" />
    //   </form>
    //   <div>
    //     <p>
    //       Nouveau client ? <Link to="/register">Créer un compte</Link>
    //     </p>
    //   </div>
    // </div>
  );
};

export default LoginComponent;
