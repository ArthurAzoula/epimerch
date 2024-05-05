// routes/Router.js
import { BrowserRouter as ReactRouter, Route, Routes} from 'react-router-dom';
import routes from './config.routes';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Router = () => {
    const { user, isAdmin } = useContext(AuthContext);
    
    return (
        <ReactRouter>
            <Routes>
                {routes
                    .filter(({requiresGuest, requiresAuth, requiresAdmin}) => {
                        if(requiresGuest && user) return false;
                        if(requiresAuth && !user) return false;
                        if(requiresAdmin && !isAdmin) return false;
                        
                        return true;
                    })
                    .map((route, index) => (
                        <Route key={index} path={route.path} element={<route.component />} />
                ))}
            </Routes>
        </ReactRouter>
    );
};

export default Router;