import React from 'react';

const AdminTableCell = ({type, value}: {type: string, value: string | object}) => {
  return (
    <>
      {
        value === null ? <span className='text-red-500 font-semibold'>VIDE</span>
        : type === 'date' ? <span>{new Date((value as {date: string})?.date).toLocaleString()}</span>
        : <span>{String(value)}</span>
      }
    </>
  );
};

export default AdminTableCell;