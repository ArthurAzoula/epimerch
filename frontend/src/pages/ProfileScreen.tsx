import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import Header from "../components/Header/Header";
import { User, Mail, UserCheck, Lock, Plus } from "lucide-react"; // Import des icônes de Lucide React

const ProfileScreen = () => {
  const { user } = useContext(AuthContext);
  const [newAddress, setNewAddress] = useState("");
  const [editedUser, setEditedUser] = useState({
    firstname: user?.firstname || "",
    lastname: user?.lastname || "",
    login: user?.login || "",
    email: user?.email || "",
    password: ""
  });

  const handleEditUser = (field: string, value: string) => {
    setEditedUser(prevState => ({
      ...prevState,
      [field]: value
    }));
  };

  const handleAddAddress = () => {
    console.log(newAddress);
    // Logique pour ajouter une nouvelle adresse
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
            <input
              type="text"
              value={editedUser.firstname}
              onChange={(e) => handleEditUser("firstname", e.target.value)}
              className="border rounded px-2 py-1 w-full"
              placeholder="Prénom"
            />
          </div>
          <div className="mb-4">
            <label className="flex items-center mb-2">
              <User size={20} className="mr-2" />
              Nom :
            </label>
            <input
              type="text"
              value={editedUser.lastname}
              onChange={(e) => handleEditUser("lastname", e.target.value)}
              className="border rounded px-2 py-1 w-full"
              placeholder="Nom"
            />
          </div>
          <div className="mb-4">
            <label className="flex items-center mb-2">
              <Mail size={20} className="mr-2" />
              Email :
            </label>
            <input
              type="email"
              value={editedUser.email}
              onChange={(e) => handleEditUser("lastname", e.target.value)}
              className="border rounded px-2 py-1 w-full"
              placeholder="Nom"
            />
          </div>
          <div className="mb-4">
            <label className="flex items-center mb-2">
              <UserCheck size={20} className="mr-2" />
              Login :
            </label>
            <input
              type="text"
              value={editedUser.login}
              onChange={(e) => handleEditUser("login", e.target.value)}
              className="border rounded px-2 py-1 w-full"
              placeholder="Login"
            />
          </div>
          <div className="mb-4">
            <label className="flex items-center mb-2">
              <Lock size={20} className="mr-2" />
              Mot de passe :
            </label>
            <input
              type="password"
              value={editedUser.password}
              onChange={(e) => handleEditUser("password", e.target.value)}
              className="border rounded px-2 py-1 w-full"
              placeholder="Mot de passe"
            />
          </div>
        </div>
        <div className="bg-white border rounded p-4 mb-4">
          <h2 className="text-xl font-semibold mb-2">Vos adresses</h2>
          {user && Object.values(user.addresses).map((address, index) => (
            <p key={index} className="mb-2">{address}</p>
          ))}
          <div className="flex items-center">
            <input
              type="text"
              value={newAddress}
              onChange={(e) => setNewAddress(e.target.value)}
              className="border rounded px-2 py-1 mr-2 w-full"
              placeholder="Nouvelle adresse"
            />
            <button onClick={handleAddAddress} className="flex items-center border-black border text-black px-2 py-1 rounded hover:bg-black hover:text-white transition-all duration-300 ease-in-out">
              <Plus size={16} className="inline-block mr-1 h-4 w-4" /> Adresse
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
