import React, { useState } from 'react';

interface FormData {
  firstName: string;
  lastName: string;
  birthDate: string;
  email: string;
  address: string;
  phone: string;
}

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    birthDate: '',
    email: '',
    address: '',
    phone: '',
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
    console.log('Formulaire soumis :', formData);
  };

  return (
    <div className='flex gap-6'>
      <h2>Inscription</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Nom:
            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
          </label>
        </div>
        <div>
          <label>
            Prénom:
            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
          </label>
        </div>
        <div>
          <label>
            Date de naissance:
            <input type="date" name="birthDate" value={formData.birthDate} onChange={handleChange} required />
          </label>
        </div>
        <div>
          <label>
            Adresse Mail:
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </label>
        </div>
        <div>
          <label>
            Adresse:
            <input type="text" name="address" value={formData.address} onChange={handleChange} required />
          </label>
        </div>
        <div>
          <label>
            Téléphone:
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
          </label>
        </div>
        <button type="submit">S'inscrire</button>
      </form>
    </div>
  );
};

export default RegisterPage;
