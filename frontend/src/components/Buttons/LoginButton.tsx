import { Link } from "react-router-dom";

type LoginButtonProps = {
  className: string;
};

const LoginButton = ({ className }: LoginButtonProps) => {
  return (
    <>
      <Link to="/login" className={`border border-solid border-black py-1 px-2 rounded ${className}`}>
        <span>Connexion</span>
      </Link>
    </>
  );
};
export default LoginButton;
