import React, { useState, useEffect } from 'react';

import { Routes } from 'react-router-dom';

import { getToken, getUser, handleLogout } from '../utils/Auth';
import { useLocation, useNavigate } from 'react-router-dom';
import { focusHandling } from 'cruip-js-toolkit';
import { isExpired } from 'react-jwt';

import RoutesObj from '../routes/Routes';
import { getRoutes } from '../utils/Auth';

import { Store, UpdateStore } from '../StoreContext';

const Main = () => {
  const [isLoading, setIsLoading] = useState(true);
  const store = Store();
  const updateStore = UpdateStore();
  const token = getToken();
  // const user = getUser();
  const location = useLocation();
  const isMyTokenExpired = isExpired(token);

  const navigate = useNavigate();

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto';
    window.scroll({ top: 0 });
    document.querySelector('html').style.scrollBehavior = '';
    focusHandling('outline');
    if (token && isMyTokenExpired) {
      handleLogout(navigate, updateStore);
    }
  }, [location.pathname]); // triggered on route change

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2400);
  }, []);

  return (
    <>
      <div className="main-container">
        <Routes>
          {isLoading ? (
            <>{getRoutes(RoutesObj.SplashRoutes)}</>
          ) : token && isMyTokenExpired == false ? (
            <>{getRoutes(RoutesObj.UserRoutes)}</>
          ) : (
            <>{getRoutes(RoutesObj.AuthRoutes)}</>
          )}
        </Routes>
      </div>
    </>
  );
};

export default Main;
