// Auth Screens
import SplashScreen from '../containers/auth/Splash';
import LoginScreen from '../containers/auth/Login';
import RegistrationScreen from '../containers/auth/Registration';
import ForgotPassword1Screen from '../containers/auth/ForgotPassword1';
import ForgotPassword2Screen from '../containers/auth/ForgotPassword2';

// User Screens
import DashboardScreen from '../containers/user/Dashboard';
import StatisticsScreen from '../containers/user/Statistics';
import StatisticsReportScreen from '../containers/user/StatisticsReport';
import AllUsersScreen from '../containers/user/AllUsers';
import SettingsScreen from '../containers/user/settings';

import LoginIcon from '@mui/icons-material/Login';

// Routes for Splash
const SplashRoutes = [
  {
    path: '*',
    name: 'Splash',
    icon: <LoginIcon />,
    element: SplashScreen,
  },
  {
    path: '/',
    name: 'Splash',
    icon: <LoginIcon />,
    element: SplashScreen,
  },
];

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
  {
    path: '/forgot_password_1',
    name: 'ForgotPassword1',
    icon: <LoginIcon />,
    element: ForgotPassword1Screen,
  },
  {
    path: '/forgot_password_2',
    name: 'ForgotPassword2',
    icon: <LoginIcon />,
    element: ForgotPassword2Screen,
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
    path: '/statistics_report',
    name: 'StatisticsReport',
    icon: <LoginIcon />,
    element: StatisticsReportScreen,
  },
  {
    path: '/settings',
    name: 'Settings',
    icon: <LoginIcon />,
    element: SettingsScreen,
  },
];

// Getting all routes
const RoutesObj = {
  SplashRoutes,
  AuthRoutes,
  UserRoutes,
};

export default RoutesObj;
