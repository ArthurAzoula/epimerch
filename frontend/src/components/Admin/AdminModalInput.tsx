import React from 'react';
import { EntityColumnConfig } from '../../config/entities.config';

type AdminModalInputType = {
  col: EntityColumnConfig;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const AdminModalInput = ({col, handleChange}: AdminModalInputType) => {
  return (
    <div className='grid grid-cols-3 gap-8 justify-between items-center h-8'>
      <label htmlFor={col.name}>{col.display}</label>
      <input id={col.name} name={col.name} className='border border-b col-span-2 h-full' onChange={handleChange} type={col.type} />
    </div>
  );
};

export default AdminModalInput;