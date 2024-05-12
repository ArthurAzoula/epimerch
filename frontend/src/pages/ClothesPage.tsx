import Clothes from "../components/Clothes/Clothes";
import Header from "../components/Header/Header";

const ClothesPage = () => {

  return (
    <div className="overflow-hidden flex flex-col">
      <Header />
      <div className="flex-grow overflow-hidden">
        <Clothes />
      </div>
      
    </div>
  );
};

export default ClothesPage;
