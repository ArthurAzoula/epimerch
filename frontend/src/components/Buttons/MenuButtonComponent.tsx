import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import NavMenu from "../Header/NavMenu";
import { Link } from 'react-router-dom';

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
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref?.current && !(ref.current as HTMLElement).contains(event.target as Node)) {
        setActiveMenu("");
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
  
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
        {activeMenu === menuTitle && (
          <div ref={ref} className={`flex justify-around`}>
            <ul className="border border-solid border-black absolute bg-white w-32">
              {categorie &&
                categorie?.map((sousCategorie, index) => (  
                  <li key={index} className="text-center py-1">
                    <Link to={`/clothes?genre=${genre}&category=${sousCategorie}`}>
                      {sousCategorie}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        )}
      </li>
    </>
  );
};

export default MenuButtonComponent;
