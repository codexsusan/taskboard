import { RouterProvider, createBrowserRouter } from "react-router-dom";
import React from "react";
import Home from "../components/home/Home";
import AuthContainer from "../hoc/AuthContainer";
import Auth from "../components/auth/user/UserAuth";
import AppContainer from "../hoc/AppContainer";
// import Board from "../components/board/Boards";
import Errorpage from "../components/Errorpage";
import BoardView from "../components/BoardView/BoardView";
import OrgAuth from "../components/auth/org/OrgAuth";
import Boards from "../components/board/Boards";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthContainer>
        <OrgAuth authMethod="login" />
      </AuthContainer>
    ),
  },
  {
    path: "/about",
    element: <div>This is an About page.</div>,
  },
  {
    path: "/org/login",
    element: (
      <AuthContainer>
        <OrgAuth authMethod="login" />
      </AuthContainer>
    ),
  },
  {
    path: "/org/register",
    element: (
      <AuthContainer>
        <OrgAuth authMethod="register" />
      </AuthContainer>
    ),
  },
  {
    path: "/login",
    element: (
      <AuthContainer>
        <Auth authMethod="login" />
      </AuthContainer>
    ),
  },
  // {
  //   path: "/register",
  //   element: (
  //     <AuthContainer>
  //       <Auth authMethod="register" />
  //     </AuthContainer>
  //   ),
  // },
  {
    path: "/home",
    element: (
      <AppContainer>
        <Home />
      </AppContainer>
    ),
  },
  {
    path: "/board",
    element: (
      <AppContainer>
        <Boards />
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
