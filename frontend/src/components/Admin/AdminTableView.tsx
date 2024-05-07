import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { EntityConfig } from '../../config/entities.config';
import { Pen, PlusCircleIcon, TrashIcon } from 'lucide-react';
import AdminTableCell from './AdminTableCell';
import Modal from '../Modal/Modal';
import AdminModal from './AdminModal';

const limit = 20;

const AdminTableView = ({entity}: {entity: EntityConfig}) => {
  const [data, setData] = useState<[]>([]);
  const [filteredData, setFilteredData] = useState<[]>([]);
  const [search, setSearch] = useState<string>('');
  const [page, setPage] = useState<number>(0);
  const [modal, setModal] = useState<{show: boolean, defaultValue: object, type: 'create' | 'update'}>({show: false, defaultValue: {}, type: 'create'});
  
  useEffect(() => {
    setData([]);
    setSearch('');
    const fetchAllData = async () => {
      entity.fetch().then((response) => {
        if(response instanceof Error) {
          setData([]);
        } else {
          setData(response as []);
        }
      });
    };
    
    fetchAllData();
  }, [entity]);
  
  function deepSearch(obj: {[key: string]: never}, path: string[][]) {
    return path.map((p) => {
      return p.reduce((acc, key) => acc && acc[key], obj);
    });
  }
  
  useEffect(() => {
    entity.searchColumn
    const filtered = data.filter((row) => {
      if(search === '') {
        return true;
      }
      
      return deepSearch(row, entity.searchColumn).some(value => String(value).toLowerCase().includes(search.toLowerCase()));
    }).slice(page * limit, (page + 1) * limit);
    
    setFilteredData(filtered as []);
  }, [data, search, page]);
  
  const handlePageChange = (selectedItem: {selected: number}) => {
    setPage(selectedItem.selected);
  };
  
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  }
  
  const handleShowModal = (defaultValue?: object, type : 'create' | 'update' = 'create') => {
    setModal(v => ({
      show: !v.show,
      defaultValue: defaultValue ?? {},
      type: type
    }));
  }
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setModal(v => ({
      ...v,
      defaultValue: {
        ...v.defaultValue,
        [e.target.name]: e.target.value
      }
    }));
  }
  
  const handleCreate = (e: React.FormEvent<Element>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target as HTMLFormElement));
  }
  
  const handleUpdate = (e: React.FormEvent<Element>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target as HTMLFormElement));
    
    for(const key in entity.columns){
      if(entity.columns[key].removeFromUpdate){
        delete data[entity.columns[key].name];
      }
    }
  }
  
  return (
    <div className='flex-grow max-h-full h-full flex flex-col w-full max-w-full overflow-hidden'>
      <div className='p-4 flex justify-between items-center border-b border-black'>
        <div className='flex gap-4 justify-center items-center'>
          <label htmlFor="search">Rechercher: </label>
          <input type="text" name="search" id="search" className='border border-black p-2' placeholder='...' onChange={handleSearch} value={search} />
        </div>
        <button onClick={handleShowModal}><PlusCircleIcon className='text-green-700 hover:text-green-800 transition-all hover:scale-110' size={28} /></button>
      </div>
      <div className='w-full flex-grow overflow-auto'>
        <table className='table-auto w-full mb-2 overflow-hidden h-auto'>
          <thead className='min-h-full border-b border-black'>
            {entity.columns.map((column, index) => (
              <th key={index} className={`text-nowrap px-2 py-2 border border-t-0 border-black ${index == 0 ? 'border-s-0' : ''}`}>{column.display}</th>
            ))}
            <th className={`text-nowrap px-2 py-2 border border-t-0 border-black`}>Actions</th>
          </thead>
          <tbody>
            {filteredData.map((row, index) => (
              <tr key={`${row['id']}-${index}`}>
                {entity.columns.map((column, index) => (
                  <td key={`${row['id']}-${column.name}`} className={`text-nowrap max-w-20 overflow-hidden text-ellipsis px-2 py-2 border border-black ${index == 0 ? 'border-s-0' : ''}`}>
                    <AdminTableCell type={column.type} value={row[column.name]} />
                  </td>
                ))}
                <td className={`w-30 max-w-30 text-ellipsis px-2 py-2 border border-black`}>
                  <div className='flex justify-evenly items-center'>
                    <button onClick={() => {handleShowModal(row, 'update')}}><Pen className='text-blue-700 hover:text-blue-800 transition-all hover:scale-110' size={28} /></button>
                    <button><TrashIcon className='text-red-700 hover:text-red-800 transition-all hover:scale-110' size={28}/></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='mt-auto flex justify-center'>
        <ReactPaginate
          previousLabel={"Precédent"}
          nextLabel={"Suivant"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={Math.ceil(data.length / limit)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={handlePageChange}
          containerClassName={"flex space-x-2"}
          pageClassName={
            "relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
          }
          previousClassName={
            "relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
          }
          nextClassName={
            "relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
          }
          activeClassName={
            "bg-neutral-700 text-black relative inline-flex items-center px-4 py-2 border border-neutral-700 text-sm font-medium"
          }
          pageLinkClassName={"w-full h-full absolute inset-0 flex items-center justify-center"}
        />
      </div>
      <AdminModal 
        type={modal.type}
        handleShowModal={handleShowModal}
        handleChange={handleChange}
        showModal={modal.show}
        handleSubmit={modal.type === 'create' ? handleCreate : handleUpdate}
        columnsConfig={entity.columns}
        defaultValue={modal.defaultValue as { [key: string]: string | number | readonly string[] | undefined }}
      />
    </div>
  );
};

export default AdminTableView;