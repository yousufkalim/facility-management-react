import React, { useEffect } from "react";

import { Routes } from "react-router-dom";

import { getToken, getUser, handleLogout } from "../utils/Auth";
import { useLocation, useNavigate } from "react-router-dom";
import { focusHandling } from "cruip-js-toolkit";
import { isExpired } from "react-jwt";

import RoutesObj from "../routes/Routes";
import { getRoutes } from "../utils/Auth";

const Main = () => {
  const token = getToken();
  //const user = getUser();
  const location = useLocation();
  const isMyTokenExpired = isExpired(token);

  const navigate = useNavigate();

  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
    focusHandling("outline");
    if (token && isMyTokenExpired) {
      handleLogout(navigate);
    }
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <div className="main-container">
        <Routes>
          {/* {token && isMyTokenExpired == false ? (
            <>{user.role == "client" ? <>{getRoutes(RoutesObj.ClientRoutes)}</> : <>{getRoutes(RoutesObj.TailorRoutes)}</>}</>
          ) : (
            <>{getRoutes(RoutesObj.AuthRoutes)}</>
          )} */}
          {<>{getRoutes(RoutesObj?.AuthRoutes)}</>}
        </Routes>
      </div>
    </>
  );
};

export default Main;
