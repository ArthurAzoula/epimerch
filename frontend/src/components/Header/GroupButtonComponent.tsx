import { useContext, useState } from "react";
import LoginButton from "../Buttons/LoginButton";
import MenuButtonComponent from "../Buttons/MenuButtonComponent";
import { AuthContext } from "../../context/AuthContext";
import ProfilDropdown from "./ProfilDropdown";

const GroupButtonComponent = () => {
  const { user } = useContext(AuthContext);
  const [activeMenu, setActiveMenu] = useState("");

  const handleMenuClick = (category: string) => {
    setActiveMenu(category);
  };

  return (
    <ul className="flex w-full">
      <div className="w-1/3"></div>
      <div className="flex justify-center items-center gap-6 w-1/3 mr-4">
        <MenuButtonComponent
          handleMenuClick={() => handleMenuClick("summer")}
          menuTitle="Eté 24"
          uppercase={false}
          activeMenu={""}
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
            "pants",
            "hat",
            "skirt",
            "dress",
            "jacket",
            "shorts",
            "coat",
            "sweater",
            "accessories",
            "other",
          ]}
          genre=""
        />
        <MenuButtonComponent
          handleMenuClick={() => handleMenuClick("woman")}
          menuTitle="Femme"
          activeMenu={activeMenu}
          setActiveMenu={setActiveMenu}
          uppercase={false}
          genre="female"
          categorie={["shirt", "hat", "skirt", "dress", "accessories", "other"]}
        />
        <MenuButtonComponent
          handleMenuClick={() => handleMenuClick("man")}
          menuTitle="Homme"
          activeMenu={activeMenu}
          setActiveMenu={setActiveMenu}
          uppercase={false}
          categorie={[
            "shirt",
            "pants",
            "hat",
            "shoes",
            "suits",
            "shorts",
            "accessories",
            "other",
          ]}
          genre="male"
        />

        <MenuButtonComponent
          handleMenuClick={() => handleMenuClick("kids")}
          menuTitle="kids"
          activeMenu={activeMenu}
          setActiveMenu={setActiveMenu}
          uppercase={false}
          categorie={[
            "shirt",
            "pants",
            "shoes",
            "hat",
            "skirt",
            "jacket",
            "coat",
            "sweater",
            "dress",
            "shorts",
            "accessories",
            "other",
          ]}
          genre="kids"
        />

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
      </div>
      <div className=" w-1/3 flex items-center justify-center">
        {user ? (
          <ProfilDropdown />
        ) : (
          <LoginButton className="hover:bg-black hover:text-white  transition-all ease-in-out duration-300" />
        )}
      </div>
    </ul>
  );
};

export default GroupButtonComponent;
