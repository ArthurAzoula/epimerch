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
        <button className="h-full text-center" onClick={handleClick}>
          {menuTitle}{" "}
        </button>
        {activeMenu === menuTitle && <NavMenu categorie={activeMenu} />}
      </li>
    </>
  );
};

export default MenuButtonComponent;
