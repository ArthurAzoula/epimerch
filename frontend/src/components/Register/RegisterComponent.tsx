import React, { useContext, useState } from "react";
import InputComponent from "./InputComponent";
import BorderButton from "../Buttons/BorderButton";
import Header from "../Header/Header";
import { Link } from "react-router-dom";
import LabelComponent from "./LabelComponent";
import { AuthContext } from "../../context/AuthContext";

type FormData = {
  firstname: string;
  lastname: string;
  email: string;
  login: string;
  password: string;
};

const RegisterComponent: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstname: "",
    lastname: "",
    email: "",
    login: "",
    password: "",
  });

  const { register } = useContext(AuthContext);

  const user = {
    firstname: formData.firstname,
    lastname: formData.lastname,
    email: formData.email,
    login: formData.login,
    password: formData.password,
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData((fd) => ({
      ...fd,
      [e.target.name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Formulaire soumis :", formData);
    await register(user);
  };

  return (
    <>
      <Header />
      <div className="flex flex-grow  justify-center min-h-full h-screen">
        <div className="border-l border-r w-2/5 border-zinc-900 min-h-full h-full">
          <h1 className="flex items-center justify-center pt-24 pb-8 text-3xl font-bold">
            Créer le début d'une aventure
          </h1>
          <div className="flex justify-center">
            <p className="w-1/2 text-center line-clamp-4">
              Créez votre profil pour pouvoir accéder à toutes les nouveautés.
              Vous profiterez de nos meilleures offres du moment !
            </p>
          </div>
          <form onSubmit={handleSubmit} className="px-16 py-4">
            <div>
              <LabelComponent className={""}>Prénom</LabelComponent>
              <InputComponent
                name="firstname"
                typeInput="firstname"
                handleOnChange={handleChange}
                placeholder="Prénom"
                isRequired={true}
                className="w-2/3 mb-6"
                inputValue={formData.firstname}
              />
            </div>
            <div>
              <LabelComponent className={""}>Nom</LabelComponent>
              <InputComponent
                name="lastname"
                typeInput="lastname"
                handleOnChange={handleChange}
                placeholder="Nom"
                isRequired={true}
                className="w-2/3 mb-6"
                inputValue={formData.lastname}
              />
            </div>
            <div>
              <LabelComponent className={""}>Adresse mail</LabelComponent>
              <InputComponent
                name="email"
                typeInput="email"
                handleOnChange={handleChange}
                placeholder="Entrez votre adresse mail"
                isRequired={true}
                className="w-2/3 mb-6"
                inputValue={formData.email}
              />
            </div>
            <div>
              <LabelComponent className={""}>Nom d'utilisateur</LabelComponent>
              <InputComponent
                name="login"
                typeInput="login"
                handleOnChange={handleChange}
                placeholder="Nom d'utilisateur"
                isRequired={true}
                className="w-2/3 mb-6"
                inputValue={formData.login}
              />
            </div>
            <div>
              <LabelComponent className={""}>Mot de passe</LabelComponent>
              <InputComponent
                name="password"
                typeInput="password"
                inputValue={formData.password}
                handleOnChange={handleChange}
                placeholder="Créez votre Mot de passe"
                isRequired={true}
                className="w-2/3 mb-6"
              />
            </div>
            <div className="flex flex-col justify-center items-center">
              <div className="justify-end pt-8">
                <BorderButton
                  text="Créer le compte"
                  className="hover:bg-black hover:text-white transition-all ease-in-out duration-400"
                />
              </div>
            </div>
            <div className="flex justify-center pt-12 p-4">
              <Link
                className="hover:underline underline-offset-2"
                to={"/login"}
              >
                <p>Déjà inscrit? Connectez-vous !</p>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default RegisterComponent;
