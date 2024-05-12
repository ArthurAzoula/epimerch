import React, { useContext, useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { EntityConfig } from '../../config/entities.config';
import { Pen, PlusCircleIcon, TrashIcon } from 'lucide-react';
import AdminTableCell from './AdminTableCell';
import AdminModal from './AdminModal';
import { toast } from 'react-toastify';
import { AuthContext } from '../../context/AuthContext';
import { useSearchParams } from 'react-router-dom';

const limit = 20;

const AdminTableView = ({entity, handleSearchParams}: {entity: EntityConfig, handleSearchParams: (key: string, value: string) => void}) => {
  const [data, setData] = useState<[]>([]);
  const [filteredData, setFilteredData] = useState<[]>([]);
  const [searchParams] = useSearchParams();
  const [modal, setModal] = useState<{show: boolean, defaultValue: object, type: 'create' | 'update'}>({show: false, defaultValue: {}, type: 'create'});
  const {refreshUser} = useContext(AuthContext);
  const [search, setSearch] = useState<string>('');
  const [page, setPage] = useState<number>(0);
  
  useEffect(() => {
    setSearch(searchParams.get('search') || '');
    setPage(Number(searchParams.get('page')) || 0);
  }, [searchParams]);
  
  useEffect(() => {
    setData([]);
    const fetchAllData = async () => {
      entity.fetch().then((response) => {
        if(response == undefined || typeof response === 'object' && 'error' in response) {
          console.log('error:', response)
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
    const filtered = data.filter((row) => {
      if(search === '' || search === undefined || search === null) {
        return true;
      }
      
      return deepSearch(row, entity.searchColumn).some(value => String(value).toLowerCase().includes(search.toLowerCase()));
    }).slice(page * limit, (page + 1) * limit);
    
    setFilteredData(filtered as []);
  }, [data, search, page, entity.searchColumn]);
  
  const handlePageChange = (selectedItem: {selected: number}) => {
    setPage(selectedItem.selected);
  };
  
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleSearchParams('search', event.target.value);
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
        [e.target.name]: entity.columns.find(c => c.name === e.target.name)?.type === 'checkbox' ? e.target.checked : e.target.value
      }
    }));
  }
  
  const handleCreate = (e: React.FormEvent<Element>) => {
    e.preventDefault();
    const dataObject = {...modal.defaultValue} as { [key: string]: string | number | string[] | undefined };

    if(entity.deleteColumnsFromCreate){
      for(const key in entity.deleteColumnsFromCreate){
        delete dataObject[entity.deleteColumnsFromCreate[key]];
      }
    }
    
    for(const key in entity.columns){
      if(entity.columns[key].type === 'checkbox'){
        dataObject[entity.columns[key].name] = String(dataObject[entity.columns[key].name]);
      }
      
      if(entity.columns[key].type === 'async' || entity.columns[key].type === 'enum'){
        const columnValue = dataObject[entity.columns[key].name] as { value: string, label: string } | { value: string, label: string }[] | undefined;
        if (columnValue && typeof columnValue === 'object' && 'value' in columnValue) {
          dataObject[entity.columns[key].name] = columnValue.value;
        }
      }
      
      if(entity.columns[key].type === 'enum'){
        if(entity.columns[key].multiple){
          const columnValue = dataObject[entity.columns[key].name] as {value: string, label: string} | {value: string, label: string}[] | undefined;
          if(columnValue && Array.isArray(columnValue)){
            dataObject[entity.columns[key].name] = columnValue.map(v => v.value);
          } else if(columnValue && 'value' in columnValue){
            dataObject[entity.columns[key].name] = columnValue.value;
          }
        }
      }
    }
    
    toast.promise(entity.create(dataObject).then(response => {
      if(response !== null && typeof response === 'object' && 'error' in response) {
        throw response;
      }
      
      if(dataObject != null && typeof dataObject === 'object') {
        setData(prevData => [...prevData, response] as unknown as []);
      }
      
      setModal(v => ({...v, show: false}));
      
      return response;
    }), {
      pending: 'Création en cours...',
      success: 'Création réussie',
      error: 'Erreur lors de la création'
    });
  }
  
  const handleUpdate = (e: React.FormEvent<Element>) => {
    e.preventDefault();
    const dataObject = {...modal.defaultValue} as { [key: string]: string | number | string[] | undefined };
    
    if(entity.deleteColumnsFromUpdate){
      for(const key in entity.deleteColumnsFromUpdate){
        delete dataObject[entity.deleteColumnsFromUpdate[key]];
      }
    }
    
    for(const key in entity.columns){
      if(entity.columns[key].removeFromUpdate || !entity.columns[key].editable){
        delete dataObject[entity.columns[key].name];
      }
      
      if(entity.columns[key].type === 'checkbox'){
        dataObject[entity.columns[key].name] = String(dataObject[entity.columns[key].name]);
      }
      
      if(entity.columns[key].type === 'async'){
        const columnValue = dataObject[entity.columns[key].name] as {id: string, value: string, label: string } | { id: string, value: string, label: string }[] | undefined;
        if(columnValue && 'id' in columnValue){
          dataObject[entity.columns[key].name] = columnValue.id;
        } else if (columnValue && typeof columnValue === 'object' && 'value' in columnValue) {
          dataObject[entity.columns[key].name] = columnValue.value as string;
        }
      }
      
      if(entity.columns[key].type === 'enum'){
        if(entity.columns[key].multiple){
          const columnValue = dataObject[entity.columns[key].name] as {value: string, label: string} | {value: string, label: string}[] | undefined;
          if(columnValue && Array.isArray(columnValue)){
            dataObject[entity.columns[key].name] = columnValue.map(v => v.value);
          } else if(columnValue && 'value' in columnValue){
            dataObject[entity.columns[key].name] = columnValue.value;
          }
        } else {
          const columnValue = dataObject[entity.columns[key].name] as {value: string, label: string} | {value: string, label: string}[] | undefined  | string;
          if(typeof columnValue !== 'string' && columnValue && 'value' in columnValue){
            dataObject[entity.columns[key].name] = columnValue.value;
          }
        }
      }
    }
    
    if(modal.defaultValue != null && typeof modal.defaultValue === 'object' && 'id' in modal.defaultValue){
      toast.promise(entity.update(modal.defaultValue.id as string, dataObject).then(response => {
        if (response !== null && typeof response === 'object' && 'error' in response) {
          throw response;
        }

        if (dataObject != null && typeof dataObject === 'object' && 'id' in (response as { id: string })) {
          setData(prevData => {
            const index = prevData.findIndex((row) => row['id'] === (response as { id: string }).id);
            prevData[index] = response as never;

            return [...prevData] as unknown as [];
          });
        }
        
        setModal(v => ({ ...v, show: false }));
        refreshUser();
        
        return response;
      }), {
        pending: 'Mise à jour en cours...',
        success: 'Mise à jour réussie',
        error: 'Erreur lors de la mise à jour'
      });
    }
  }
  
  const handleDelete = (row: {id: string}) => {
    toast.promise(entity.delete(row.id).then(response => {
      if(response !== null && typeof response === 'object' && 'error' in response) {
        throw response;
      }
      
      setData(prevData => prevData.filter((r) => r['id'] !== row.id) as []);
      refreshUser();
      
      return response;
    }), {
      pending: 'Suppression en cours...',
      success: 'Suppression réussie',
      error: 'Erreur lors de la suppression'
    });
  }
  
  return (
    <div className='flex-grow max-h-full h-full flex flex-col w-full max-w-full overflow-hidden'>
      <div className='p-4 flex justify-between items-center border-b border-black'>
        <div className='flex gap-4 justify-center items-center'>
          <label htmlFor="search">Rechercher: </label>
          <input type="text" name="search" id="search" className='border border-black p-2' placeholder='...' onChange={handleSearch} value={search} />
        </div>
        <button onClick={() => handleShowModal({}, 'create')}><PlusCircleIcon className='text-green-700 hover:text-green-800 transition-all hover:scale-110' size={28} /></button>
      </div>
      <div className='w-full flex-grow overflow-auto'>
        <table className='table-auto w-full mb-2 overflow-hidden h-auto'>
          <thead className='min-h-full border-b border-black'>
            <tr>
              {entity.columns.map((column, index) => (
                <th key={index} className={`text-nowrap px-2 py-2 border border-t-0 border-black ${index == 0 ? 'border-s-0' : ''}`}>{column.display}</th>
              ))}
              <th className={`text-nowrap px-2 py-2 border border-t-0 border-black`}>Actions</th>
            </tr>
          </thead>
          <tbody className='overflow-hidden'>
            {filteredData.map((row, index) => (
              <tr key={`${row['id']}-${index}`}>
                {entity.columns.map((column, colIndex) => (
                  <td key={`${row['id']}-${column.name}`} className={`text-nowrap overflow-hidden text-ellipsis px-2 py-2 border border-black ${column.type === 'id' ? 'max-w-52' : 'max-w-20'} ${colIndex == 0 ? 'border-s-0' : ''} ${index % 2 ? 'bg-gray-200' : ''}`}>
                    <AdminTableCell type={column.type} value={row[column.name]} columnConfig={column} />
                  </td>
                ))}
                <td className={`w-30 max-w-30 text-ellipsis px-2 py-2 border border-black ${index % 2 ? 'bg-gray-200' : ''}`}>
                  <div className='flex justify-evenly items-center'>
                    <button onClick={() => {handleShowModal(row, 'update')}}><Pen className='text-blue-700 hover:text-blue-800 transition-all hover:scale-110' size={28} /></button>
                    <button onClick={() => {handleDelete(row)}}><TrashIcon className='text-red-700 hover:text-red-800 transition-all hover:scale-110' size={28}/></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='mt-auto flex justify-center fixed bottom-0 w-full bg-white border-t border-black pb-5'>
        <ReactPaginate
          previousLabel={"Precédent"}
          nextLabel={"Suivant"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={Math.ceil(data.length / limit)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={handlePageChange}
          containerClassName={"flex gap-2 justify-center mt-4"}
          pageClassName={
            "border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 py-2 *:px-4 *py-2"
          }
          previousClassName={
            "border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 py-2 *:px-4 *py-2"
          }
          nextClassName={
            "border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 py-2 *:px-4 *py-2"
          }
          activeClassName={
            "bg-neutral-700 text-black border border-neutral-700 text-sm font-medium py-2 *:px-4 *py-2"
          }
        />
      </div>
      <AdminModal 
        type={modal.type}
        handleShowModal={handleShowModal}
        handleChange={handleChange}
        showModal={modal.show}
        handleSubmit={modal.type === 'create' ? handleCreate : handleUpdate}
        columnsConfig={entity.columns}
        defaultValue={modal.defaultValue as { [key: string]: string | number | string[] | undefined }}
      />
    </div>
  );
};

export default AdminTableView;