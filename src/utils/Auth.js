import { Route } from "react-router-dom";

export const handleLogin = (token, user) => {
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
  return true;
};

export const handleLogout = (navigate) => {
  localStorage.clear();
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
