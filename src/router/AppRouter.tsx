import { RouterProvider, createBrowserRouter } from "react-router-dom";
import React from "react";
import Home from "../components/board/Boards";
import AuthContainer from "../hoc/AuthContainer";
import Auth from "../components/auth/Auth";
import AppContainer from "../hoc/AppContainer";
import Board from "../components/board/Boards";
import Errorpage from "../components/Errorpage";
import BoardView from "../components/BoardView/BoardView";
import Stages from "../components/stage/Stage";

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
    path: "/board/:boardId",
    element: (
      <AppContainer>
        <BoardView />
      </AppContainer>
    ),
  },
  {
    path: "*",
    element: (
      <AuthContainer>
        <Errorpage />
      </AuthContainer>
    ),
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
