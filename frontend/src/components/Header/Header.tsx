import { useState } from "react";
import { ShoppingCart, Search } from "lucide-react";
import MenuButtonComponent from "./MenuButtonComponent";
import LoginButton from "./LoginButton";

const Header = () => {
  const [activeMenu, setActiveMenu] = useState("");

  const handleMenuClick = (menu: string) => {
    setActiveMenu(menu);
  };
  return (
    <header className="flex border-b-black border pb-4 pt-4 sticky top-0">
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
        <h1 className="flex items-center justify-center text-3xl font-bold">
          E-COMMERCE
        </h1>
      </div>
      <div className="flex w-1/3 items-center justify-end gap-10 mr-8">
        <LoginButton />
        <button>
          <Search />
        </button>
        <button>
          <ShoppingCart />
        </button>
      </div>
    </header>
  );
};

export default Header;
