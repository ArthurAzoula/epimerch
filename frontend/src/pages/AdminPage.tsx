import React, { useState } from 'react';
import Header from '../components/Header/Header';
import entities, { EntityConfig } from '../config/entities.config';
import AdminTableView from '../components/Admin/AdminTableView';

const AdminPage = () => {
  const [currentEntity, setCurrentEntity] = useState<EntityConfig>(entities[0]);
  
  return (
    <div className="flex min-h-screen max-h-screen h-screen overflow-hidden flex-col w-screen">
      <Header />
      <div className="flex-grow flex w-full h-full max-h-full">
        <div className='border-r border-black'>
          {entities
            .sort((a, b) => {
              const orderSort = a.order - b.order;
              
              if (orderSort === 0) {
                return a.display.localeCompare(b.display);
              }
              
              return orderSort;
            })
            .map((entity, index) => (
              <button
                key={index}
                onClick={() => setCurrentEntity(entity)}
                className={`block w-full text-left py-4 px-8 ${currentEntity === entity ? 'bg-gray-200 hover:bg-gray-200' : 'hover:bg-gray-100'}`}
              >
                {entity.display}
              </button>
          ))}
        </div>
        <AdminTableView entity={currentEntity} />
      </div>
    </div>
  );
};

export default AdminPage;