import { XIcon } from 'lucide-react';
import React from 'react';

const Modal = ({children, title, showModal, handleShowModal}: {children: JSX.Element | JSX.Element[], title: string, showModal: boolean, handleShowModal: () => void}) => {
  return (
    <>
      {showModal &&
        <div className='fixed top-0 left-0 z-40 bg-gray-950 bg-opacity-50 flex justify-center items-center h-screen w-screen' onClick={handleShowModal}>
          <div className='bg-white pointer-events-auto p-2 rounded-full flex justify-between' onClick={(e) => {e.stopPropagation()}}>
            <div>
              <h2>{title}</h2>
              <button onClick={handleShowModal}><XIcon /></button>
            </div>
            <div>
              {children}
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default Modal;