import { SignUp } from "../containers/SingnUp";
import { Login } from "../containers/Login";
import { Chat } from "../containers/Chat/";
import Dashboard from "../containers/Dashboard";

const PRIVATE_ROUTES = [
  {
    exact: true,
    path: "/",
    component: Dashboard,
    title: "Dashboard",
  },
  {
    exact: true,
    path: "/chat",
    component: Chat,
    title: "Chat",
  },
];
const PUBLIC_ROUTES = [
  {
    exact: true,
    path: "/login",
    component: Login,
    title: "Login",
  },
  {
    exact: true,
    path: "/signup",
    component: SignUp,
    title: "Sign up",
  },
];
export { PUBLIC_ROUTES, PRIVATE_ROUTES };
