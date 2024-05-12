import React, { useEffect, useState } from 'react';
import Header from '../components/Header/Header';
import entities, { EntityConfig } from '../config/entities.config';
import AdminTableView from '../components/Admin/AdminTableView';
import { useSearchParams } from 'react-router-dom';

const AdminPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentEntity, setCurrentEntity] = useState<EntityConfig>(entities[0]);
  
  useEffect(() => {
    handleSearchParams('entity', currentEntity.name);
  }, [])
  
  useEffect(() => {
    setCurrentEntity(p => {
      const entity = entities.find(entity => entity.name === searchParams.get('entity'));
      return entity || p;
    });
  }, [searchParams])
  
  const handleSearchParams = (key: string, value: string) => {
    setSearchParams(sp => {      
      return new URLSearchParams({ ...Object.fromEntries(sp), [key]: value });
    });
  }
  
  return (
    <div className="flex min-h-screen max-h-screen h-screen overflow-hidden flex-col w-screen">
      <Header />
      <div className="flex-grow flex flex-col lg:flex-row w-full h-full max-h-full">
        <div className='flex lg:block border-r border-b lg:border-b-0 border-black overflow-auto'>
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
                key={entity.name}
                onClick={() => {
                  setSearchParams(sp => {
                    const newSearchParams = new URLSearchParams();
                    newSearchParams.set('entity', entity.name);
                    return newSearchParams;
                  });
                }}
                className={`block w-full text-left py-4 px-8 ${index === 0 ? '' : 'border-s'} border-black lg:border-0 ${currentEntity === entity ? 'bg-gray-200 hover:bg-gray-200' : 'hover:bg-gray-100'}`}
              >
                {entity.display}
              </button>
          ))}
        </div>
        <AdminTableView entity={currentEntity} handleSearchParams={handleSearchParams}/>
      </div>
    </div>
  );
};

export default AdminPage;