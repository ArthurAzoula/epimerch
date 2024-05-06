import React, { useContext, useState } from "react";
import { ChevronDown, ChevronUp, User, LockOpen, LogOut } from "lucide-react";
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';


const ProfilDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAdmin, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  return (
    <div className="relative">
      <button onClick={() => setIsOpen(!isOpen)} className="flex items-center">
        {user?.firstname} {user?.lastname}
        {isOpen ? (
          <ChevronUp className="ml-2" />
        ) : (
          <ChevronDown className="ml-2" />
        )}
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div
            className="py-1 w-full h-max"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <Link
              to='/profile'
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
              role="menuitem"
            >
              <User size={18} className="mr-3" /> Voir mon profil
            </Link>
            {isAdmin && (
              <Link
                to='/admin'
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                role="menuitem"
              >
                <LockOpen size={18} className="mr-3" /> Administration
              </Link>
            )}
            <button
              className="flex items-center px-4 py-2 text-sm text-red-700 hover:bg-red-100 w-full text-left"
              role="menuitem"
              onClick={handleLogout}
            >
              <LogOut size={18} className="mr-3" /> Se déconnecter
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilDropdown;