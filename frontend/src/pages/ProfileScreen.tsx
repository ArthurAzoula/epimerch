import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import Header from "../components/Header/Header";
import { User, Mail, UserCheck, Lock, Plus, TrashIcon, PenIcon } from "lucide-react"; // Import des icônes de Lucide React
import AddressService, { Address } from '../service/address.service';
import { formatAddress } from '../utils/AddressUtils';
import ClientService from '../service/client.service';

const ProfileScreen = () => {
  const { user, refreshUser } = useContext(AuthContext);
  const [newAddress, setNewAddress] = useState("");
  const [editedUser, setEditedUser] = useState({
    firstname: user?.firstname || "",
    lastname: user?.lastname || "",
    login: user?.login || "",
    email: user?.email || "",
    password: ""
  });
  const [address, setAddress] = useState<Address[]>([]);
  
  const refreshAddress = () => {
    AddressService.getAddresses().then((addresses) => {
      if('error' in addresses) {
        console.error(addresses.error);
        setAddress([]);
        return;
      }
      
      setAddress(addresses);
    });
  }
  
  useEffect(() => {
    refreshAddress();
  }, [user])

  const handleEditUser = (field: string, value: string) => {
    setEditedUser(prevState => ({
      ...prevState,
      [field]: value
    }));
  };

  return (
    <div>
      <Header />
      <div className="p-4">
        <div className="p-4 mb-4">
          <h2 className="text-2xl font-regular mb-8 text-center">Agent {user?.firstname}, est-ce bien vous ?</h2>
          <div className="mb-4">
            <label className="flex items-center mb-2">
              <User size={20} className="mr-2" />
              Prénom :
            </label>
            <div className='flex'>
              <input
                type="text"
                value={editedUser.firstname}
                onChange={(e) => handleEditUser("firstname", e.target.value)}
                className="border rounded-s-md px-2 py-1 w-full"
                placeholder="Prénom"
              />
              <button className='bg-green-600 hover:bg-green-700 transition-all text-white px-2 rounded-e-md' onClick={() => ClientService.updateClient(user?.id ?? '', {firstname: editedUser.firstname}).then(() => refreshUser())}><PenIcon size={20} className='hover:scale-110'/></button>
            </div>
          </div>
          <div className="mb-4">
            <label className="flex items-center mb-2">
              <User size={20} className="mr-2" />
              Nom :
            </label>
            <div className='flex'>
              <input
                type="text"
                value={editedUser.lastname}
                onChange={(e) => handleEditUser("lastname", e.target.value)}
                className="border rounded-s-md px-2 py-1 w-full"
                placeholder="Nom"
              />
              <button className='bg-green-600 hover:bg-green-700 transition-all text-white px-2 rounded-e-md' onClick={() => ClientService.updateClient(user?.id ?? '', {lastname: editedUser.lastname}).then(() => refreshUser())}><PenIcon size={20} className='hover:scale-110'/></button>
            </div>
          </div>
          <div className="mb-4">
            <label className="flex items-center mb-2">
              <Mail size={20} className="mr-2" />
              Email :
            </label>
            <div className='flex'>
              <input
                type="email"
                value={editedUser.email}
                onChange={(e) => handleEditUser("lastname", e.target.value)}
                className="border rounded-s-md px-2 py-1 w-full"
                placeholder="Nom"
              />
              <button className='bg-green-600 hover:bg-green-700 transition-all text-white px-2 rounded-e-md' onClick={() => ClientService.updateClient(user?.id ?? '', {email: editedUser.email}).then(() => refreshUser())}><PenIcon size={20} className='hover:scale-110'/></button>
            </div>
          </div>
          <div className="mb-4">
            <label className="flex items-center mb-2">
              <UserCheck size={20} className="mr-2" />
              Login :
            </label>
            <div className='flex'>
              <input
                type="text"
                value={editedUser.login}
                onChange={(e) => handleEditUser("login", e.target.value)}
                className="border rounded-s-md px-2 py-1 w-full"
                placeholder="Login"
              />
              <button className='bg-green-600 hover:bg-green-700 transition-all text-white px-2 rounded-e-md' onClick={() => ClientService.updateClient(user?.id ?? '', {login: editedUser.login}).then(() => refreshUser())}><PenIcon size={20} className='hover:scale-110'/></button>
            </div>
          </div>
          <div className="mb-4">
            <label className="flex items-center mb-2">
              <Lock size={20} className="mr-2" />
              Mot de passe :
            </label>
            <div className='flex'>
              <input
                type="password"
                value={editedUser.password}
                onChange={(e) => handleEditUser("password", e.target.value)}
                className="border rounded px-2 py-1 w-full"
                placeholder="Mot de passe"
              />
              <button className='bg-green-600 hover:bg-green-700 transition-all text-white px-2 rounded-e-md' onClick={() => ClientService.updateClient(user?.id ?? '', {password: editedUser.password}).then(() => refreshUser())}><PenIcon size={20} className='hover:scale-110'/></button>
            </div>
          </div>
        </div>
        <div className="bg-white border rounded p-4 mb-4">
          <h2 className="text-xl font-semibold mb-2">Vos adresses</h2>
          <ul className='flex flex-col gap-4'>
            {address.map((address) => (
              <li key={address.id} className='bg-gray-100 p-2 rounded-md flex justify-between items-center'>
                <p>{formatAddress(address)}</p>
                <button onClick={() => {AddressService.deleteAddress(address.id).then(() => refreshAddress());}}>
                  <TrashIcon size={20} className='text-red-600 hover:text-red-700 hover:scale-110 transition-all' />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
