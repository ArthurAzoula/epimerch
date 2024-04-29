import React, { useState } from "react";
import InputComponent from "./InputComponent";
import BorderButton from "../Header/BorderButton";
import Header from '../Header/Header';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  login: string;
  password: string;
}

const RegisterComponent: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    login: "",
    password: "",
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
    console.log("Formulaire soumis :", formData);
  };

  return (
    <>
      <Header />
      <div>
        
      </div>
    </>
  );
};

export default RegisterComponent;
