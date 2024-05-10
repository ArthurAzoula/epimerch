import { useContext, useState } from "react";
import { Search } from "lucide-react";
import MenuButtonComponent from "../Buttons/MenuButtonComponent";
import LoginButton from "../Buttons/LoginButton";
import { Link } from "react-router-dom";
import ProfilDropdown from "./ProfilDropdown";
import { AuthContext } from "../../context/AuthContext";
import CartButton from "../Cart/CartButton";

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
          <MenuButtonComponent
            handleMenuClick={() => handleMenuClick("city")}
            menuTitle="Le city"
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
          <Link to="/clothes?genre=female">
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
          </Link>
          <Link to="/clothes?genre=male">
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
          </Link>

          <MenuButtonComponent
            handleMenuClick={() => handleMenuClick("couture")}
            menuTitle="Couture"
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

          <Link to="/clothes">
            <MenuButtonComponent
              handleMenuClick={() => handleMenuClick("explore")}
              menuTitle="Explore"
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
          </Link>
        </ul>
      </div>
      <div className="flex justify-center w-1/3">
        <h1 className="flex items-center justify-center uppercase text-3xl font-bold tracking-[0.7rem]">
          <Link to={"/"}>Epimerch</Link>
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
        <CartButton />
      </div>
    </header>
  );
};

export default Header;
