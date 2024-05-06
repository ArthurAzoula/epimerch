import { Link } from 'react-router-dom';
import Header from '../components/Header/Header';

const ErrorPage = () => {
  return (
    <div className="flex min-h-screen max-h-screen h-screen overflow-hidden flex-col">
      <Header />
      <div className="flex-grow flex justify-center items-center flex-col gap-10">
        <h1 className="text-4xl font-bold text-red-500">Page non trouvée !</h1>
        <Link to="/" className="underline">Retourner à l'accueil</Link>
      </div>
    </div>
  );
};

export default ErrorPage;