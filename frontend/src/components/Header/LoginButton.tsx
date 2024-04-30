import { Link } from "react-router-dom";

const LoginButton = () => {
  return (
    <>
        <Link to="/login" className="border border-solid border-black py-1 px-2 rounded">
          <span>Connexion</span>
        </Link>
    </>
  );
};
export default LoginButton;
