import { Link } from "react-router-dom";

const LoginButton = () => {
  return (
    <>
      <div className="relative border-2 border-solid border-black py-1 px-2 rounded-md">
        <Link to="/login" className="btn">
          Connexion
        </Link>
      </div>
    </>
  );
};
export default LoginButton;
