import React from 'react';
import { EntityColumnConfig } from '../../config/entities.config';

const AdminTableCell = ({type, value, columnConfig}: {type: string, value: string | object, columnConfig: EntityColumnConfig}) => {
  return (
    <>
      {
        value === null || value === '' ? <span className='text-red-500 font-semibold'>VIDE</span>
        : value === undefined ? <span></span>
        : type === 'checkbox' ? <span>{value ? 'OUI' : 'NON'}</span>
        : type === 'async' ? <span>{(value as object)[columnConfig.fetchValue as keyof object]}</span>
        : type === 'date' ? <span>{new Date((value as {date: string})?.date).toLocaleString()}</span>
        : <span>{String(value)}</span>
      }
    </>
  );
};

export default AdminTableCell;