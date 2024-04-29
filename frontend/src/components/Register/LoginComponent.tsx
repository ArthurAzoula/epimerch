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
    <div>
      <div className="flex justify-center">
        <h2 className="text-3xl">Connexion</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <InputComponent
            typeInput="email"
            inputValue={email}
            handleOnChange={handleEmailChange}
            placeholder="Ex: henri@epitech.eu"
            isRequired={true}
            className=""
          />
        </div>
        <div>
          <InputComponent
            typeInput="password"
            inputValue={password}
            handleOnChange={handlePasswordChange}
            placeholder="Mot de passe"
            isRequired={true}
            className=""
          />
        </div>
        <BorderButton text="Se connecter" />
      </form>
      <div>
        <p>
          Nouveau client ? <Link to="/register">Créer un compte</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginComponent;
