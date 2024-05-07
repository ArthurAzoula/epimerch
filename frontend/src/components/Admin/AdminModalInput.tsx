import React, { useEffect } from 'react';
import { EntityColumnConfig } from '../../config/entities.config';
import ReactSelectAsync from 'react-select/async';

type AdminModalInputType = {
  col: EntityColumnConfig;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  data: string | number | readonly string[] | undefined | {date: string};
}

const AdminModalInput = ({col, handleChange, data}: AdminModalInputType) => {
  const [fetchData, setFetchData] = React.useState<readonly {value: string, label: string}[]>([]);
  const [search, setSearch] = React.useState<string>('');
  const [filteredData, setFilteredData] = React.useState<readonly {value: string, label: string}[]>([]);
  
  const loadData = async (inputValue: string) => {
    
  }
  
  useEffect(() => {
    setFilteredData(fetchData.filter((row) => row.value.toLowerCase().includes(search.toLowerCase())));
  }, [search, fetchData]);
  
  useEffect(() => {
    if(col.type === 'async' && col.fetch) {
      col.fetch().then((response) => {
        setFetchData(response.map(r => ({value: r.id, label: r[col.fetchValue as string]})));
      });
    }
  }, [col, data]);
  
  useEffect(() => {
    console.log('dsq', filteredData);
  }, [filteredData]);
  
  if(col.type === 'date') {
    const day = ("0" + new Date((data as {date: string})?.date).getDate()).slice(-2);
    const month = ("0" + (new Date((data as {date: string})?.date).getMonth() + 1)).slice(-2);
    const year = new Date((data as {date: string})?.date).getFullYear();
    data = `${year}-${month}-${day}`;
  }
  
  data = data as string;
  
  return (
    <div className='grid grid-cols-3 gap-8 justify-between items-center'>
      <label htmlFor={col.name}>{col.display}</label>
      {col.type === 'async' ?
        <ReactSelectAsync loadOptions={filteredData} className='border border-b col-span-2 h-full ms-auto w-full'/>
        :
        <input id={col.name} name={col.name} className='border border-b col-span-2 h-full ms-auto w-full' onChange={handleChange} defaultValue={data} value={data} type={col.type} disabled={!col.editable || col.removeFromUpdate} />
      }
    </div>
  );
};

export default AdminModalInput;