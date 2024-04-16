// Import pages
import Home from "../pages/Home";
import RegisterComponent from "../components/RegisterComponent";
import LoginComponent from "../components/LoginComponent";
import ProfileScreen from "../pages/ProfileScreen";
import Cart from "../components/Cart";
import Details from "../components/Details";
import Err from "../components/Err";

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
        path: "/login",
        exact: true,
        component: LoginComponent,
    },
    {
        path: "/register",
        exact: true,
        component: RegisterComponent,
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