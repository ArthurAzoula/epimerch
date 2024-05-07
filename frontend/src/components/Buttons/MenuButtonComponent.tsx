import { Dispatch, SetStateAction } from "react";
import NavMenu from "../Header/NavMenu";

type MenuButtonComponentProps = {
  handleMenuClick: () => void;
  menuTitle: string;
  activeMenu: string;
  setActiveMenu: Dispatch<SetStateAction<string>>;
  uppercase: boolean;
  categorie: string[];
  genre?: string;
};

const MenuButtonComponent = ({
  handleMenuClick,
  menuTitle,
  activeMenu,
  setActiveMenu,
  uppercase,
  categorie,
  genre
}: MenuButtonComponentProps) => {
  const handleClick = () => {
    handleMenuClick();
    setActiveMenu(menuTitle);
  };

  return (
    <>
      <li className="relative">
        <button
          className={`h-full text-center ${
            uppercase ? "uppercase" : "capitalize"
          } rounded transition-all duration-200 ease-in-out relative border border-transparent hover:border hover:border-solid hover:border-black px-2 py-1 text-nowrap`}
          onClick={handleClick}
        >
          {menuTitle}{" "}
        </button>
        {activeMenu === menuTitle && <NavMenu genre={genre} categorie={categorie} />}
      </li>
    </>
  );
};

export default MenuButtonComponent;
