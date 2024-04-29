import { Link } from "react-router-dom";

const LoginButton = () => {
  return (
    <>
      <li className="relative border-2 border-solid border-black py-1 px-2">
        <Link to="/login" className="btn">
          Connexion
        </Link>
      </li>
    </>
  );
};
export default LoginButton;
