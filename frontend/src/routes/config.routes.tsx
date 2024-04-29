// Import pages
import Home from "../pages/Home";
import ProfileScreen from "../pages/ProfileScreen";
import Cart from "../components/Cart";
import Details from "../components/Details";
import Err from "../components/Err";
import RegisterPage from "../pages/RegisterPage";
import ConnexionPage from "../pages/ConnexionPage";

type RouteType = {
    path: string;
    exact: boolean;
    component: React.FC;
}[];

const routes: RouteType = [
    {
        path: "/",
        exact: true,
        component: Home,
    },

    {
        path: "/register",
        exact: true,
        component: RegisterPage,
    },

    {
        path: "/login",
        exact: true,
        component: ConnexionPage,
    },
    {
        path: "/profile",
        exact: true,
        component: ProfileScreen,
    },
    {
        path: "/cart",
        exact: true,
        component: Cart,
    },
    {
        path: "/details/:id",
        exact: true,
        component: Details,
    },
    {
        path: "/*",
        exact: false,
        component: Err,
    }
];

export default routes;