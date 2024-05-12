import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { CartContext } from "../../context/CartContext";
import { MenuIcon, XIcon } from "lucide-react";
import LoginButton from "../Buttons/LoginButton";
import { Link } from "react-router-dom";

const RespHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAdmin } = useContext(AuthContext);
  const { cartItems } = useContext(CartContext);

  return (
    <div className="flex w-1/3 xl:hidden justify-start items-center">
      <button className="border border-black w-min ms-8 rounded-md hover:scale-110 transition-all bg-white fixed">
        <MenuIcon
          className="text-black"
          onClick={() => setIsOpen(true)}
          size={40}
        />
      </button>
      {isOpen && (
        <div className="w-screen min-h-full h-screen absolute max-h-screen top-0 left-0 bg-white flex flex-col gap-4 !z-[9999]">
          <div className="flex justify-between items-center w-full max-w-full p-4 sm:px-8">
            <h1 className="uppercase text-3xl font-bold tracking-[0.7rem]">
              Epimerch
            </h1>
            <button
              className="hover:scale-110 transition-all"
              onClick={() => setIsOpen(false)}
            >
              <XIcon className="text-black" size={40} />
            </button>
          </div>
          {user && (
            <h2 className="p-4 sm:px-8 text-xl -mt-4">
              Bonjour {user.firstname}!
            </h2>
          )}
          {/* Ete 2024 {shirt hat shorts accessories other}, Femme {shirt hat skirt dress shorts accessories other}, Homme, Enfant, Explorer */}
          <div className="flex flex-col gap-8 p-4 sm:px-8 justify-center text-xl select-none">
            <Link to="/">
              <span className="hover:bg-gray-100 p-2 rounded-md">Accueil</span>
            </Link>
            <details>
              <summary className="hover:cursor-pointer">Été 2024</summary>
              <ul className="flex flex-col gap-4 px-4 py-4">
                <li>
                  <Link to={"/clothes?category=shirt"}>T-Shirts</Link>
                </li>
                <li>
                  <Link to={"/clothes?category=hat"}>Chapeaux</Link>
                </li>
                <li>
                  <Link to={"/clothes?category=shorts"}>Shorts</Link>
                </li>
                <li>
                  <Link to={"/clothes?category=accessories"}>Accessoires</Link>
                </li>
                <li>
                  <Link to={"/clothes?category=other"}>Autres</Link>
                </li>
              </ul>
            </details>
            <details>
              <summary className="hover:cursor-pointer">Le City</summary>
              <ul className="flex flex-col gap-4 px-4 py-4">
                <li>
                  <Link to={"/clothes?category=shirt"}>T-Shirts</Link>
                </li>
                <li>
                  <Link to={"/clothes?category=pants"}>Pantalons</Link>
                </li>
                <li>
                  <Link to={"/clothes?category=hat"}>Chapeaux</Link>
                </li>
                <li>
                  <Link to={"/clothes?category=skirt"}>Jupes</Link>
                </li>
                <li>
                  <Link to={"/clothes?category=dress"}>Robes</Link>
                </li>
                <li>
                  <Link to={"/clothes?category=jacket"}>Vestes</Link>
                </li>
                <li>
                  <Link to={"/clothes?category=shorts"}>Shorts</Link>
                </li>
                <li>
                  <Link to={"/clothes?category=coat"}>Manteaux</Link>
                </li>
                <li>
                  <Link to={"/clothes?category=sweater"}>Pull-over</Link>
                </li>
                <li>
                  <Link to={"/clothes?category=accessories"}>Accessoires</Link>
                </li>
                <li>
                  <Link to={"/clothes?category=other"}>Autres</Link>
                </li>
              </ul>
            </details>
            <details>
              <summary className="hover:cursor-pointer">Femme</summary>
              <ul className="flex flex-col gap-4 px-4 py-4">
                <li>
                  <Link to={"/clothes?category=shirt"}>T-Shirts</Link>
                </li>
                <li>
                  <Link to={"/clothes?category=hat"}>Chapeaux</Link>
                </li>
                <li>
                  <Link to={"/clothes?category=skirt"}>Jupes</Link>
                </li>
                <li>
                  <Link to={"/clothes?category=dress"}>Robes</Link>
                </li>
                <li>
                  <Link to={"/clothes?category=accessories"}>Accessoires</Link>
                </li>
                <li>
                  <Link to={"/clothes?category=other"}>Autres</Link>
                </li>
              </ul>
            </details>
            <details>
              <summary className="hover:cursor-pointer">Homme</summary>
              <ul className="flex flex-col gap-4 px-4 py-4">
                <li>
                  <Link to={"/clothes?category=shirt"}>T-Shirts</Link>
                </li>
                <li>
                  <Link to={"/clothes?category=pants"}>Pantalons</Link>
                </li>
                <li>
                  <Link to={"/clothes?category=hat"}>Chapeaux</Link>
                </li>
                <li>
                  <Link to={"/clothes?category=shoes"}>Chaussures</Link>
                </li>
                <li>
                  <Link to={"/clothes?category=suits"}>Costumes</Link>
                </li>
                <li>
                  <Link to={"/clothes?category=shorts"}>Shorts</Link>
                </li>
                <li>
                  <Link to={"/clothes?category=accessories"}>Accessoires</Link>
                </li>
                <li>
                  <Link to={"/clothes?category=other"}>Autres</Link>
                </li>
              </ul>
            </details>
            <details>
              <summary className="hover:cursor-pointer">Enfant</summary>
              <ul className="flex flex-col gap-4 px-4 py-4">
                <li>
                  <Link to={"/clothes?category=shirt"}>T-Shirts</Link>
                </li>
                <li>
                  <Link to={"/clothes?category=pants"}>Pantalons</Link>
                </li>
                <li>
                  <Link to={"/clothes?category=shoes"}>Chaussures</Link>
                </li>
                <li>
                  <Link to={"/clothes?category=skirt"}>Jupes</Link>
                </li>
                <li>
                  <Link to={"/clothes?category=jacket"}>Vestes</Link>
                </li>
                <li>
                  <Link to={"/clothes?category=shorts"}>Shorts</Link>
                </li>
                <li>
                  <Link to={"/clothes?category=accessories"}>Accessoires</Link>
                </li>
                <li>
                  <Link to={"/clothes?category=other"}>Autres</Link>
                </li>
              </ul>
            </details>
            <details>
              <summary className="hover:cursor-pointer">Explore</summary>
              <ul className="flex flex-col gap-4 px-4 py-4">
                <li>
                  <Link to={"/clothes?category=shirt"}>T-Shirts</Link>
                </li>
                <li>
                  <Link to={"/clothes?category=hat"}>Chapeaux</Link>
                </li>
                <li>
                  <Link to={"/clothes?category=skirt"}>Jupes</Link>
                </li>
                <li>
                  <Link to={"/clothes?category=dress"}>Robes</Link>
                </li>
                <li>
                  <Link to={"/clothes?category=shorts"}>Shorts</Link>
                </li>
                <li>
                  <Link to={"/clothes?category=accessories"}>Accessoires</Link>
                </li>
                <li>
                  <Link to={"/clothes?category=other"}>Autres</Link>
                </li>
              </ul>
            </details>
            <Link to="/cart" className="flex justify-between items-center">
              <span className="group-hover:bg-gray-200">Panier</span>
              <span className="text-xs px-2 py-1 rounded-md bg-red-600 text-white">{cartItems?.length ?? 0}</span>
            </Link>
            {user ? (
              <>
                <Link to="/profile">Profil</Link>
                <Link to="/orders">Mes Commandes</Link>
                {isAdmin && <Link to="/admin">Administratrion</Link>}
              </>
            ) : (
              <LoginButton className="" />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default RespHeader;
