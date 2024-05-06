import { useContext, useState } from "react";
import { ShoppingCart, Search } from "lucide-react";
import MenuButtonComponent from "../Buttons/MenuButtonComponent";
import LoginButton from "../Buttons/LoginButton";
import { Link } from "react-router-dom";
import ProfilDropdown from "./ProfilDropdown";
import { AuthContext } from '../../context/AuthContext';

const Header = () => {
  const [activeMenu, setActiveMenu] = useState("");
  const { user } = useContext(AuthContext);
  
  const handleMenuClick = (menu: string) => {
    setActiveMenu(menu);
  };
  
  return (
    <header className="flex border-b-black border pb-4 pt-4 sticky bg-white top-0">
      <div className="flex w-1/3 justify-center items-center">
        <ul className="flex justify-between align-center w-full ms-2">
          <MenuButtonComponent
            handleMenuClick={() => handleMenuClick("summer")}
            menuTitle="Eté 24"
            activeMenu={activeMenu}
            setActiveMenu={setActiveMenu}
            uppercase={false}
          />
          <MenuButtonComponent
            handleMenuClick={() => handleMenuClick("city")}
            menuTitle="Le city"
            activeMenu={activeMenu}
            setActiveMenu={setActiveMenu}
            uppercase={false}
          />
          <MenuButtonComponent
            handleMenuClick={() => handleMenuClick("woman")}
            uppercase={false}
            menuTitle="Femme"
            activeMenu={activeMenu}
            setActiveMenu={setActiveMenu}
          />
          <MenuButtonComponent
            handleMenuClick={() => handleMenuClick("man")}
            menuTitle="Homme"
            activeMenu={activeMenu}
            setActiveMenu={setActiveMenu}
            uppercase={false}
          />

          <MenuButtonComponent
            handleMenuClick={() => handleMenuClick("couture")}
            menuTitle="Couture"
            activeMenu={activeMenu}
            setActiveMenu={setActiveMenu}
            uppercase={false}
          />

          <MenuButtonComponent
            handleMenuClick={() => handleMenuClick("explore")}
            menuTitle="Explore"
            activeMenu={activeMenu}
            setActiveMenu={setActiveMenu}
            uppercase={false}
          />
        </ul>
      </div>
      <div className="flex justify-center w-1/3">
        <h1 className="flex items-center justify-center uppercase text-3xl font-bold tracking-[0.7rem]">
          <Link to={"/"}>
            Epimerch
          </Link>
        </h1>
      </div>
      <div className="flex w-1/3 items-center justify-end gap-10 pr-8">
        {user ? (
          <ProfilDropdown />
        ) : (
          <LoginButton className="hover:bg-black hover:text-white  transition-all ease-in-out duration-300" />
        )}
        <button className="relative overflow-hidden border border-transparent rounded-full p-1 transition-all duration-200 ease-in-out hover:border-black group">
          <Search className="text-black transition-all duration-200 ease-in-out" />
        </button>
        <button className="relative border border-transparent rounded-full p-1 transition-all duration-200 ease-in-out hover:border-black group">
          <ShoppingCart className="text-black transition-all duration-200 ease-in-out" />
          <span className="absolute text-[8px] -top-3 left-2 bg-red-500 text-white rounded-full px-2 py-1 shadow-xl w-5 h-5 flex items-center justify-center">
            10
          </span>{" "}
        </button>
      </div>
    </header>
  );
};

export default Header;
