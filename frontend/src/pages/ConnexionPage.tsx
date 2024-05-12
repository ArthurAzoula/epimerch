import Header from "../components/Header/Header";
import LoginComponent from "../components/Register/LoginComponent";

const ConnexionPage = () => {
  return (
    <div className="flex min-h-screen max-h-screen h-screen overflow-hidden flex-col">
      <Header />
      <LoginComponent />
    </div>
  );
};

export default ConnexionPage;
