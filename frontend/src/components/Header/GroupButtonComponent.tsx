import { useState } from "react";
import LoginButton from "./LoginButton";
import MenuButtonComponent from "./MenuButtonComponent";

const GroupButtonComponent = () => {
  const [activeMenu, setActiveMenu] = useState("");

  const handleMenuClick = (menu: string) => {
    setActiveMenu(menu);
  };

  return (
    <ul className="flex gap-14 justify-center align-center">
      <MenuButtonComponent
        handleMenuClick={() => handleMenuClick("summer")}
        menuTitle="Eté 24"
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
      />
      <MenuButtonComponent
        handleMenuClick={() => handleMenuClick("city")}
        menuTitle="Le city"
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
      />
      <MenuButtonComponent
        handleMenuClick={() => handleMenuClick("woman")}
        menuTitle="Femme"
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
      />
      <MenuButtonComponent
        handleMenuClick={() => handleMenuClick("man")}
        menuTitle="Homme"
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
      />

      <MenuButtonComponent
        handleMenuClick={() => handleMenuClick("couture")}
        menuTitle="Couture"
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
      />

      <MenuButtonComponent
        handleMenuClick={() => handleMenuClick("explore")}
        menuTitle="Explore"
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
      />

      <LoginButton />
    </ul>
  );
};

export default GroupButtonComponent;
