import React from "react";
import Navbar from "../common/Navbar";

function AuthContainer(props: { children: React.ReactNode }) {
  return (
    <div className="h-screen w-screen">
      <Navbar source="authcontainer" />
      <div className="flex items-center justify-center h-5/6 w-full">
        {props.children}
      </div>
    </div>
  );
}

export default AuthContainer;
