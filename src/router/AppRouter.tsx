import { RouterProvider, createBrowserRouter } from "react-router-dom";
import React from "react";
import Home from "../components/Home";

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
    element: <div>This is a Login page.</div>,
  },
  {
    path: "/register",
    element: <div>This is a Register page.</div>,
  },
]);

export default function AppRouter() {
  return <RouterProvider fallbackElement={<div>Hello</div>} router={router} />;
}
