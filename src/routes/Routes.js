// Auth Screens
import LoginScreen from '../containers/auth/Login';
import RegistrationScreen from '../containers/auth/Registration';

// User Screens
import DashboardScreen from '../containers/user/Dashboard';
import StatisticsScreen from '../containers/user/Statistics';
import AllUsersScreen from '../containers/user/AllUsers';
import SettingsScreen from '../containers/user/settings';

import LoginIcon from '@mui/icons-material/Login';

// Routes for Auth
const AuthRoutes = [
  {
    path: '*',
    name: 'Login',
    icon: <LoginIcon />,
    element: LoginScreen,
  },
  {
    path: '/login',
    name: 'Login',
    icon: <LoginIcon />,
    element: LoginScreen,
  },
  {
    path: '/registration',
    name: 'Registration',
    icon: <LoginIcon />,
    element: RegistrationScreen,
  },
];

// Routes for User
const UserRoutes = [
  {
    path: '*',
    name: 'Dashboard',
    icon: <LoginIcon />,
    element: DashboardScreen,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    icon: <LoginIcon />,
    element: DashboardScreen,
  },
  {
    path: '/allusers',
    name: 'AllUsers',
    icon: <LoginIcon />,
    element: AllUsersScreen,
  },
  {
    path: '/statistics',
    name: 'Statistics',
    icon: <LoginIcon />,
    element: StatisticsScreen,
  },
  {
    path: '/settings',
    name: 'settings',
    icon: <LoginIcon />,
    element: SettingsScreen,
  },
];

// Getting all routes
const RoutesObj = {
  AuthRoutes,
  UserRoutes,
};

export default RoutesObj;
