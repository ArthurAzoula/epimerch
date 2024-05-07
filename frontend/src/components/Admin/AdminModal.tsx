import React, { useState } from 'react';
import Modal from '../Modal/Modal';
import { EntityColumnConfig } from '../../config/entities.config';
import AdminModalInput from './AdminModalInput';

type AdminModalProps = {
  type: 'create' | 'update';
  defaultValue: object;
  handleSubmit: (e: React.FormEvent) => void;
  showModal: boolean;
  handleShowModal: () => void;
  columnsConfig: EntityColumnConfig[];
};

const AdminModal = ({type, defaultValue, handleSubmit, showModal,handleShowModal, columnsConfig}: AdminModalProps) => {
  const [data, setData] = useState(defaultValue ?? {});
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData(d => ({...d, [e.target.name]: e.target.value}));
  }
  
  return (
    <Modal title={type === 'create' ? 'Créer' : 'Mise à jour'} showModal={showModal} handleShowModal={handleShowModal}>
      <form className='flex flex-col gap-16' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-8'>
          {columnsConfig
          .filter((col) => type === 'update' || col.editable)
          .map((col) => (
            <AdminModalInput col={col} handleChange={handleChange}/>
          ))}
        </div>
        <div className='flex justify-end items-center gap-4'>
          <button type='button' className='py-1 px-2 rounded-md border border-black hover:border-gray-900 hover:bg-gray-900 transition-all hover:text-white' onClick={handleShowModal}>Annuler</button>
          <button type='submit' className='py-1 px-2 rounded-md bg-green-600 text-white transition-all hover:bg-green-700'>Valider</button>
        </div>
      </form>
    </Modal>
  )
};

export default AdminModal;