import { RouterProvider, createBrowserRouter } from "react-router-dom";
import React from "react";
import Home from "../components/Home";
import AuthContainer from "../hoc/AuthContainer";
import Auth from "../components/Auth";
import AppContainer from "../hoc/AppContainer";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/about",
    element: <div>This is an About page.</div>,
  },
  {
    path: "/login",
    element: (
      <AuthContainer>
        <Auth authMethod="login" />
      </AuthContainer>
    ),
  },
  {
    path: "/register",
    element: (
      <AuthContainer>
        <Auth authMethod="register" />
      </AuthContainer>
    ),
  },
  {
    path: "/home",
    element: (
      <AppContainer>
        <Home />
      </AppContainer>
    ),
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
