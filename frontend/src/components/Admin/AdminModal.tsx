import React from 'react';
import Modal from '../Modal/Modal';
import { EntityColumnConfig } from '../../config/entities.config';
import AdminModalInput from './AdminModalInput';

type AdminModalProps = {
  type: 'create' | 'update';
  defaultValue: {[key: string]: string | number | string[] | undefined};
  handleSubmit: (e: React.FormEvent) => void;
  showModal: boolean;
  handleShowModal: () => void;
  columnsConfig: EntityColumnConfig[];
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const AdminModal = ({type, defaultValue, handleSubmit, showModal, handleShowModal, columnsConfig, handleChange}: AdminModalProps) => {
  return (
    <Modal title={type === 'create' ? 'Créer' : 'Mise à jour'} showModal={showModal} handleShowModal={handleShowModal}>
      <form className='flex flex-col gap-16' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-8'>
          {columnsConfig
          .filter(c => type === 'update' || c.editable)
          .map((col) => (
            <AdminModalInput key={`adminmodalinput-${col.name}`} type={type} col={col} handleChange={handleChange} data={defaultValue[col.name]}/>
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