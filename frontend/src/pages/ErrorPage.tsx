import { Link } from 'react-router-dom';
import Header from '../components/Header/Header';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';
import { Loader2Icon } from 'lucide-react';

const ErrorPage = () => {
  const {loading} = useContext(AuthContext);
  
  return (
    <div className="flex min-h-screen max-h-screen h-screen overflow-hidden flex-col">
      <Header />
      <div className="flex-grow flex justify-center items-center flex-col gap-10">
        {!loading ? (
          <>
            <h1 className="text-4xl font-bold text-red-500">Page non trouvée !</h1>
            <Link to="/" className="underline">Retourner à l'accueil</Link>
          </>
        ):(
          <Loader2Icon size={50} className="animate-spin"/>
        )}
      </div>
    </div>
  );
};

export default ErrorPage;