import React, { useState } from "react";
import { ChevronDown, ChevronUp, User, LockOpen, LogOut } from "lucide-react";

type ProfilDropdownProps = {
  client: {
    name: string;
    isAdmin: boolean;
  };
};

const ProfilDropdown = ({ client }: ProfilDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button onClick={() => setIsOpen(!isOpen)} className="flex items-center">
        {client.name}
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
            <button
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
              role="menuitem"
            >
              <User size={18} className="mr-3" /> Voir mon profil
            </button>
            {client.isAdmin && (
              <button
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                role="menuitem"
              >
                <LockOpen size={18} className="mr-3" /> Administration
              </button>
            )}
            <button
              className="flex items-center px-4 py-2 text-sm text-red-700 hover:bg-red-100 w-full text-left"
              role="menuitem"
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