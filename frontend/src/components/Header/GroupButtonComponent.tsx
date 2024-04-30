import { useState } from "react";
import LoginButton from "../Buttons/LoginButton";
import MenuButtonComponent from "../Buttons/MenuButtonComponent";

const GroupButtonComponent = () => {
  const [activeMenu, setActiveMenu] = useState("");

  const handleMenuClick = (menu: string) => {
    setActiveMenu(menu);
  };

  return (
    <ul className="flex w-full">
      <div className="w-1/3"></div>
      <div className="flex justify-center items-center gap-6 w-1/3 mr-4">
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
          menuTitle="Femme"
          activeMenu={activeMenu}
          setActiveMenu={setActiveMenu}
          uppercase={false}
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
      </div>
      <div className=" w-1/3 flex items-center justify-center">
        <LoginButton />
      </div>
    </ul>
  );
};

export default GroupButtonComponent;
