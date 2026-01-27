import { createBrowserRouter } from "react-router";
import RootLayout from "../layout/RootLayout.jsx";
import Home from "../pages/home/Home.jsx";
import AuthLayout from "../layout/authLayout.jsx";
import Login from "../pages/auth/login/Login.jsx";
import Register from "../pages/auth/register/Register.jsx";
import Coverage from "../pages/coverage/Coverage.jsx";
import NotFound from "../pages/notFound/NotFound.jsx";
// import { Component } from "react";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        path: "/",
        index: true,
        Component: Home,
      },
      {
        path: "/maps",
        Component: Coverage,
        loader: () => fetch("./data/warehouses.json").then((res) => res.json()),
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
