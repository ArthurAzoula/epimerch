import { XIcon } from 'lucide-react';
import React from 'react';

const Modal = ({children, title, showModal, handleShowModal}: {children: JSX.Element | JSX.Element[], title: string, showModal: boolean, handleShowModal: () => void}) => {
  return (
    <>
      {showModal &&
        <div className='fixed top-0 left-0 z-30 bg-gray-950 bg-opacity-70 flex justify-center items-center h-screen w-screen' onClick={handleShowModal}>
          <div className='bg-white pointer-events-auto rounded-md flex justify-between flex-col' onClick={(e) => {e.stopPropagation()}}>
            <div className='flex justify-between items-center border-b border-black p-4 gap-24'>
              <h2 className='text-xl font-semibold'>{title}</h2>
              <button onClick={handleShowModal}><XIcon className='hover:scale-110 transition-all' /></button>
            </div>
            <div className='p-4'>
              {children}
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default Modal;