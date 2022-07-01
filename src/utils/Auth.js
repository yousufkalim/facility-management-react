import { Route } from "react-router-dom";
import dState from "./DState";

import Api from "../api";

export const handleLogin = async (token, _user) => {
  localStorage.setItem("token", token);
  const user = await getUserInfo(_user.id);
  _user = {
    ..._user,
    ...user,
  };
  localStorage.setItem("user", JSON.stringify(_user));
  return true;
};

const getUserInfo = async (userID) => {
  let response;
  try {
    response = await Api("get", `/Users/userprofile/${userID}`);
    const _users = response.data.data;
    return _users;
  } catch (e) {
    console.trace(e);
  }
};

export const handleLogout = (navigate, updateStore) => {
  localStorage.clear();
  updateStore({
    ...dState,
  });
  navigate("/login");
}; // Handle here.

export const getUser = () => {
  let cookie = localStorage.getItem("user");
  let user = cookie && JSON.parse(cookie);
  return user;
};

export const setUser = (user) => {
  return localStorage.setItem("user", JSON.stringify(user));
};

export const getToken = () => {
  let token = localStorage.getItem("token");
  return token;
};

export function getRoutes(routesArr) {
  const routes = [];

  for (let i = 0; i < routesArr.length; i++) {
    const Element = routesArr[i].element;

    routes.push(<Route exact path={routesArr[i].path} element={<Element />} key={i} />);
  }

  return routes;
}
