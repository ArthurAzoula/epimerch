import { Dispatch, SetStateAction } from "react";
import NavMenu from "./NavMenu";

type MenuButtonComponentProps = {
  handleMenuClick: () => void;
  menuTitle: string;
  activeMenu: string;
  setActiveMenu: Dispatch<SetStateAction<string>>;
};

const MenuButtonComponent = ({
  handleMenuClick,
  menuTitle,
  activeMenu,
  setActiveMenu,
}: MenuButtonComponentProps) => {
  const handleClick = () => {
    handleMenuClick();
    setActiveMenu(menuTitle);
  };

  return (
    <>
      <li className="relative">
        <button
          className="h-full text-center uppercase relative hover:border-2 hover:border-solid hover:border-black px-2 py-1 text-nowrap"
          onClick={handleClick}
        >
          {menuTitle}{" "}
        </button>
        {activeMenu === menuTitle && <NavMenu categorie={activeMenu} />}
      </li>
    </>
  );
};

export default MenuButtonComponent;
