// Import pages
import Home from "../pages/Home";
import ProfileScreen from "../pages/ProfileScreen";
import Cart from "../components/Cart";
import Details from "../components/Details";
import ErrorPage from "../pages/ErrorPage";
import RegisterPage from "../pages/RegisterPage";
import ConnexionPage from "../pages/ConnexionPage";
import Clothes from "../pages/ClothesPage";
import AdminPage from '../pages/AdminPage';

type RouteType = {
    path: string;
    requiresAuth?: boolean;
    requiresGuest?: boolean;
    requiresAdmin?: boolean;
    component: React.FC;
}[];

const routes: RouteType = [
    {
        path: "/",
        component: Home,
    },
    {
        path: "/register",
        requiresGuest: true,
        component: RegisterPage,
    },

    {
        path: "/login",
        requiresGuest: true,
        component: ConnexionPage,
    },
    {
        path: "/profile",
        requiresAuth: true,
        component: ProfileScreen,
    },
    {
        path: "/clothes",
        component: Clothes,
    },
    {
        path: "/cart",
        requiresAuth: true,
        component: Cart,
    },
    {
        path: "/details/:id",
        component: Details,
    },
    {
        path: "/admin",
        requiresAdmin: true,
        component: AdminPage,
    },
    {
        path: "/*",
        component: ErrorPage,
    }
];

export default routes;