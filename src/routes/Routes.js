// Auth Screens
import LoginScreen from "../containers/auth/Login";
import RegistrationScreen from "../containers/auth/Registration";
import DashboardScreen from "../containers/user/Dashboard";

import LoginIcon from "@mui/icons-material/Login";

// Routes for Auth
const AuthRoutes = [
  {
    path: "*",
    name: "Login",
    icon: <LoginIcon />,
    element: LoginScreen,
  },
  {
    path: "/login",
    name: "Login",
    icon: <LoginIcon />,
    element: LoginScreen,
  },
  {
    path: "/registration",
    name: "Registration",
    icon: <LoginIcon />,
    element: RegistrationScreen,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: <LoginIcon />,
    element: DashboardScreen,
  },
];

// Getting all routes
const RoutesObj = {
  AuthRoutes,
};

export default RoutesObj;
