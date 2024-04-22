import React from 'react';
import { Link } from 'react-router-dom';

const LoginComponent: React.FC = () => {
  return (
    <div>
      <Link to="/register">
        <button>Connexion</button>
      </Link>
    </div>
  );
};

export default LoginComponent;