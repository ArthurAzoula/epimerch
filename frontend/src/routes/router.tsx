// routes/Router.js
import { BrowserRouter as ReactRouter, Route, Routes} from 'react-router-dom';
import routes from './config.routes';

const Router = () => {
return (
    <ReactRouter>
        <Routes>
            {routes.map((route, index) => (
                <Route
                    key={index}
                    path={route.path}
                    element={<route.component />}
                />
            ))}
        </Routes>
    </ReactRouter>
);
};

export default Router;