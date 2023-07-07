import React from "react";
import Navbar from "../common/Navbar";
import Sidebar from "../components/home/Sidebar";

function AppContainer(props: { children: React.ReactNode }) {
  return (
    <div className="h-screen w-screen">
      <Navbar source="appcontainer" />
      <div className="flex w-full">
        <Sidebar />
        {props.children}
      </div>
    </div>
  );
}

export default AppContainer;
