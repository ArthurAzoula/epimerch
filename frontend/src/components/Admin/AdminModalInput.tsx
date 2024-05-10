import React, { useEffect } from 'react';
import { EntityColumnConfig } from '../../config/entities.config';
import AsyncSelect, { MultiValue, OptionsOrGroups, PropsValue, SingleValue } from 'react-select';
import { createDateAsUTC } from '../../utils/DateUtils';

type AdminModalInputType = {
  type: 'create' | 'update';
  col: EntityColumnConfig;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  data: string | number | string[] | undefined | {date: string, timezone_type: number, timezone: string} | {id: string, [key: string]: string} | {value: string, label: string} | {value: string, label: string}[] | boolean | null;
}

const AdminModalInput = ({type, col, handleChange, data}: AdminModalInputType) => {
  const [fetchData, setFetchData] = React.useState<OptionsOrGroups<string, never> | undefined>([]);
  
  useEffect(() => {
    if(col.type === 'async' && col.fetch) {
      col.fetch().then((response) => {
        if(response != null && typeof response === 'object' && "error" in response) {
          return;
        }
        
        const rsp = response as {id: string, [key: string]: string}[];
        
        setFetchData(rsp.map(r => ({value: r.id, label: r[col.fetchValue as string]})) as []);
      });
    } else if(col.type === 'enum') {
      setFetchData(col.values?.map(v => ({value: v, label: v})) as []);
    }
  }, [col, data]);
  
  if(col.type === 'datetime-local') {
    data = data as {date: string, timezone_type: number, timezone: string} | null | undefined;
    
    if(data){
      data = createDateAsUTC(new Date(data.date)).toISOString().slice(0, 16);
    }
  }
  
  if(col.type === 'async' && data != null && typeof data === 'object' && 'id' in data){
    data = {value: data.id, label: data[col.fetchValue as string]};
  }
  
  if(col.type === 'enum' && data != null){
    if(Array.isArray(data) && col.multiple){
      data = data.map(d => {
        if(typeof d === 'string'){
          return {value: d, label: d} as {value: string, label: string};
        } else {
          return d;
        }
      }) as {value: string, label: string}[];
    } else if(typeof data === 'string'){
      data = {value: data, label: data} as {value: string, label: string};
    }
  }
  
  useEffect(() => {
    if(col.type === 'enum' && col.multiple){
      handleChange({ target: { name: col.name, value: data as string[] } } as unknown as React.ChangeEvent<HTMLInputElement>);
    }
  }, [])
  
  const handleAsyncChange = (newValue: MultiValue<string> | SingleValue<string>) => {
    handleChange({target: {name: col.name, value: newValue as string}} as React.ChangeEvent<HTMLInputElement>);
  };
  
  return (
    <div className='grid grid-cols-3 gap-8 justify-between items-center'>
      <label htmlFor={col.name}>{col.display}{col.required && <sup className='text-red-600'>*</sup>}</label>
      {col.type === 'async' || col.type === 'enum' ?
        <AsyncSelect id={col.name} name={col.name} isDisabled={!col.editable || col.removeFromUpdate} options={fetchData} defaultValue={data as PropsValue<string> | undefined} className='border border-b col-span-2 h-full ms-auto w-full' required={col.required} isClearable={!col.required} isMulti={col.multiple} onChange={handleAsyncChange} value={data as PropsValue<string> | undefined}/>
        :
        col.type === 'checkbox' && typeof data === 'boolean'  ?
        <input id={col.name} name={col.name} className='border border-b col-span-2 h-full w-full px-2 py-1' onChange={handleChange} defaultChecked={data} checked={data} type={col.type} disabled={!col.editable || (type === 'update' && col.removeFromUpdate)} required={col.required}/>
        :
        <input id={col.name} name={col.name} className='border border-b col-span-2 h-full w-full px-2 py-1' onChange={handleChange} defaultValue={data as string} value={data as string} type={col.type} disabled={!col.editable || (type === 'update' && col.removeFromUpdate)} required={col.required} />
      }
    </div>
  );
};

export default AdminModalInput;