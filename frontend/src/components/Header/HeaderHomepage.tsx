import GroupButtonComponent from "./GroupButtonComponent";

const title = "EPIMERCH";

const Header = () => {
  return (
    <header>
      <div className="flex justify-center align-center font-bold">
        <h1 className="text-[5.6rem] content-center justify-center mb-10 mt-6 tracking-[1.5rem]">
          {title}
        </h1>
      </div>
      <nav className="flex justify-center">
        <GroupButtonComponent />
      </nav>
    </header>
  );
};

export default Header;
