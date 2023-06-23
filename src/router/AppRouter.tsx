import { RouterProvider, createBrowserRouter } from "react-router-dom";
import React from "react";
import Home from "../components/board/Boards";
import AuthContainer from "../hoc/AuthContainer";
import Auth from "../components/auth/Auth";
import AppContainer from "../hoc/AppContainer";
import Board from "../components/board/Boards";
import SingleBoard from "../components/stage/Stage";

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
    path: "/board",
    element: (
      <AppContainer>
        <Board />
      </AppContainer>
    ),
  },
  {
    path: "/board/:id",
    element: (
      <AppContainer>
        <SingleBoard />
      </AppContainer>
    ),
  },
  {
    path: "*",
    element: <div>Not Found</div>,
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
