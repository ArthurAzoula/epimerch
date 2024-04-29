import React, { useState } from "react";
import InputComponent from "./InputComponent";
import BorderButton from "../Header/BorderButton";

interface FormData {
  firstName: string;
  lastName: string;
  birthDate: string;
  email: string;
  address: string;
  phone: string;
}

const RegisterComponent: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    birthDate: "",
    email: "",
    address: "",
    phone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Ajoutez ici la logique de soumission du formulaire, par exemple, l'envoi des données au backend
    console.log("Formulaire soumis :", formData);
  };

  return (
    <>
      <div className="flex justify-center">
        <h2 className="">Inscription</h2>
      </div>
      <div className="flex justify-center align-baseline">
        <form onSubmit={handleSubmit} className="">
          <InputComponent
            typeInput="text"
            inputValue={formData.lastName}
            handleOnChange={handleChange}
            placeholder="Nom"
            isRequired={true}
            className=""
          />
          <InputComponent
            typeInput="text"
            inputValue={formData.firstName}
            handleOnChange={handleChange}
            placeholder="Prénom"
            isRequired={true}
            className=""
          />
          <InputComponent
            typeInput="date"
            inputValue={formData.birthDate}
            handleOnChange={handleChange}
            placeholder="Date de naissance"
            isRequired={true}
            className=""
          />
          <InputComponent
            typeInput="email"
            inputValue={formData.email}
            handleOnChange={handleChange}
            placeholder="Adresse Mail"
            isRequired={true}
            className=""
          />
          <InputComponent
            typeInput="text"
            inputValue={formData.address}
            handleOnChange={handleChange}
            placeholder="Adresse"
            isRequired={true}
            className=""
          />
          <InputComponent
            typeInput="tel"
            inputValue={formData.phone}
            handleOnChange={handleChange}
            placeholder="Téléphone"
            isRequired={true}
            className=""
          />
          <BorderButton text="S'inscrire" />
        </form>
      </div>
    </>
  );
};

export default RegisterComponent;
