import { useContext, useState } from "react";
import MenuButtonComponent from "../Buttons/MenuButtonComponent";
import LoginButton from "../Buttons/LoginButton";
import { Link } from "react-router-dom";
import ProfilDropdown from "./ProfilDropdown";
import { AuthContext } from "../../context/AuthContext";
import CartButton from "../Cart/CartButton";
import RespHeader from './RespHeader';

const Header = () => {
  const [activeMenu, setActiveMenu] = useState("");
  const { user } = useContext(AuthContext);
  
  const handleMenuClick = (menu: string) => {
    setActiveMenu(menu);
  };
  
  return (
    <header className="flex border-b-black border pb-4 pt-4 sticky bg-white top-0">
      <RespHeader/>
      <div className="hidden xl:flex w-1/3 justify-center items-center">
        <ul className="flex justify-start gap-4 items-center w-full ms-16">
          <MenuButtonComponent
            handleMenuClick={() => handleMenuClick("ete2024")}
            uppercase={false}
            menuTitle="Été 2024"
            activeMenu={activeMenu}
            setActiveMenu={setActiveMenu}
            categorie={[
              "shirt",
              "hat",
              "shorts",
              "accessories",
              "other",
            ]}
            genre=''
          />
          <MenuButtonComponent
            handleMenuClick={() => handleMenuClick("woman")}
            uppercase={false}
            menuTitle="Femme"
            activeMenu={activeMenu}
            setActiveMenu={setActiveMenu}
            categorie={[
              "shirt",
              "hat",
              "skirt",
              "dress",
              "shorts",
              "accessories",
              "other",
            ]}
            genre="female"
          />
          <MenuButtonComponent
            handleMenuClick={() => handleMenuClick("man")}
            menuTitle="Homme"
            activeMenu={activeMenu}
            setActiveMenu={setActiveMenu}
            uppercase={false}
            categorie={[
              "shirt",
              "hat",
              "skirt",
              "dress",
              "shorts",
              "accessories",
              "other",
            ]}
            genre="male"
          />
          <MenuButtonComponent
            handleMenuClick={() => handleMenuClick("couture")}
            menuTitle="Enfant"
            activeMenu={activeMenu}
            setActiveMenu={setActiveMenu}
            uppercase={false}
            categorie={[
              "shirt",
              "hat",
              "skirt",
              "dress",
              "shorts",
              "accessories",
              "other",
            ]}
            genre=""
          />
          <Link to="/clothes" className='h-full text-center rounded transition-all duration-200 ease-in-out relative border border-transparent hover:border hover:border-solid hover:border-black px-2 py-1 text-nowrap'>Explorer</Link>
        </ul>
      </div>
      <div className="flex justify-center w-1/3">
        <h1 className="flex items-center justify-center uppercase text-3xl font-bold tracking-[0.7rem]">
          <Link to={"/"}>Epimerch</Link>
        </h1>
      </div>
      <div className="hidden xl:flex w-1/3 items-center justify-end gap-10 pr-8">
        {user ? (
          <ProfilDropdown />
        ) : (
          <LoginButton className="hover:bg-black hover:text-white  transition-all ease-in-out duration-300" />
        )}
        <CartButton />
      </div>
    </header>
  );
};

export default Header;
