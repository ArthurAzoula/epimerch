import { Link } from "react-router-dom";

type NavMenuProps = {
  genre?: string;
  categorie?: string[];
};

const NavMenu = ({ genre, categorie }: NavMenuProps) => {
  return (
    <div className="flex justify-around">
      <ul className="border border-solid border-black absolute  bg-white0 w-32">
        {categorie &&
          categorie?.map((sousCategorie, index) => (  
            <li key={index} className="text-center">
              <Link to={`/clothes?genre=${genre}&category=${sousCategorie}`}>
                {sousCategorie}
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default NavMenu;
