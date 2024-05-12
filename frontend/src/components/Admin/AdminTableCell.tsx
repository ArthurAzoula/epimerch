import { EntityColumnConfig } from '../../config/entities.config';
import { Link } from 'react-router-dom';

const AdminTableCell = ({type, value, columnConfig}: {type: string, value: string | object, columnConfig: EntityColumnConfig}) => {
  console.log('type:', type);
  return (
    <>
      {
        value === null || value === '' ? <span className='text-red-500 font-semibold'>VIDE</span>
        : value === undefined ? <span></span>
        : type === 'checkbox' ? <span>{value ? 'OUI' : 'NON'}</span>
        : type === 'async' ? <Link className='underline text-blue-700' to={`/admin?entity=${columnConfig.entity}&search=${(value as {id: string})['id']}`}>{(value as object)[columnConfig.fetchValue as keyof object]}</Link>
        : type === 'datetime-local' || type === 'date'  ? <span>{new Date((value as {date: string})?.date).toLocaleString()}</span>
        : <span>{String(value)}</span>
      }
    </>
  );
};

export default AdminTableCell;