import GroupButtonComponent from "./GroupButtonComponent";
import Logo from "./Logo";

const title = "BALENCIAGA";

const Header = () => {
  return (
    <header>
      <div className="flex justify-center align-center font-bold">
        <h1 className="text-7xl content-center justify-center mb-10">
          {title}
        </h1>
      </div>
      <nav className="flex">
        <GroupButtonComponent />
        <Logo />
      </nav>
    </header>
  );
};

export default Header;
