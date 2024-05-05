import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { EntityConfig } from '../../config/entities.config';
import { Pen, PlusCircleIcon, TrashIcon } from 'lucide-react';
import AdminTableCell from './AdminTableCell';

const AdminTableView = ({entity}: {entity: EntityConfig}) => {
  const [data, setData] = useState<[]>([]);
  const [filteredData, setFilteredData] = useState<[]>([]);
  const [search, setSearch] = useState<string>('');
  
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
  
  function deepSearch(obj: object, path: string[][]) {
    return path.map((p) => {
      return p.reduce((acc, key) => acc && acc[key], obj)
    });
  }
  
  useEffect(() => {
    entity.searchColumn
    console.log('entity.searchColumn:', entity.searchColumn);
    const filtered = data.filter((row) => {
      if(search === '') {
        return true;
      }
      
      return deepSearch(row, entity.searchColumn).some(value => String(value).toLowerCase().includes(search.toLowerCase()));
    });
    
    setFilteredData(filtered as []);
  }, [data, search]);
  
  const handlePageChange = (selectedItem: {selected: number}) => {
    console.log('selectedItem:', selectedItem);
  };
  
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  }
  
  return (
    <div className='flex-grow max-h-full flex flex-col w-full max-w-full overflow-hidden'>
      <div className='p-4 flex justify-between items-center'>
        <div className='flex gap-4 justify-center items-center'>
          <label htmlFor="search">Rechercher: </label>
          <input type="text" name="search" id="search" className='border border-black p-2' placeholder='...' onChange={handleSearch} value={search} />
        </div>
        <button><PlusCircleIcon className='text-green-700 hover:text-green-800 transition-all hover:scale-110' size={28} /></button>
      </div>
      <div className='w-full max-h-full overflow-auto'>
        <table className='table-auto w-full mb-2'>
          <thead className='min-h-full border-b border-black'>
            {entity.columns.map((column, index) => (
              <th key={index} className={`text-nowrap px-2 py-2 border border-black ${index == 0 ? 'border-s-0' : ''}`}>{column.display}</th>
            ))}
            <th className={`text-nowrap px-2 py-2 border border-black`}>Actions</th>
          </thead>
          <tbody>
            {filteredData.map((row, index) => (
              <tr key={index}>
                {entity.columns.map((column, index) => (
                  <td key={index} className={`text-nowrap max-w-20 overflow-hidden text-ellipsis px-2 py-2 border border-black ${index == 0 ? 'border-s-0' : ''}`}>
                    <AdminTableCell type={column.type} value={row[column.name]} />
                  </td>
                ))}
                <td className={`w-30 max-w-30 text-ellipsis px-2 py-2 border border-black`}>
                  <div className='flex justify-evenly items-center'>
                    <button><Pen className='text-blue-700 hover:text-blue-800 transition-all hover:scale-110' size={28} /></button>
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
          previousLabel={"Previous"}
          nextLabel={"Next"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={Math.ceil(data.length / 20)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
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
            "bg-neutral-700 text-white relative inline-flex items-center px-4 py-2 border border-neutral-700 text-sm font-medium"
          }
        />
      </div>
    </div>
  );
};

export default AdminTableView;