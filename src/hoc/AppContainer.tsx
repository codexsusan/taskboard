import React, { useEffect } from "react";
import Navbar from "../common/Navbar";
import Sidebar from "../components/home/Sidebar";
import { ToastContainer } from "react-toastify";
import jwt_decode from "jwt-decode";
import { UserTypes } from "../utils/userUtils";
import { useNavigate } from "react-router-dom";

function AppContainer(props: { children: React.ReactNode }) {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      return navigate("/login");
    }
    const user: UserTypes = jwt_decode(token!);
    localStorage.setItem("userType", user.userType);
  }, [navigate]);
  return (
    <div className="w-full">
      <Navbar source="appcontainer" />
      <div className="flex w-full min-h-4/5">
        <Sidebar />
        {props.children}
      </div>
      <ToastContainer position="bottom-right" autoClose={2000} />
    </div>
  );
}

export default AppContainer;
