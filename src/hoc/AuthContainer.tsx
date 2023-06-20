import React from "react";
import Navbar from "../common/Navbar";

function AuthContainer(props: { children: React.ReactNode }) {
  return (
    <div className="h-screen w-screen">
      <Navbar />
      <div className="flex items-center justify-center h-5/6 w-full">
        <div className="flex justify-center flex-row w-full mt-8">
          {props.children}
        </div>
      </div>
    </div>
  );
}

export default AuthContainer;
