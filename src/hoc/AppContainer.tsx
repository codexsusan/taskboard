import React from "react";
import Navbar from "../common/Navbar";
import Sidebar from "../components/home/Sidebar";

function AppContainer(props: { children: React.ReactNode }) {
  return (
    <div className="w-full">
      <Navbar source="appcontainer" />
      <div className="flex w-full min-h-4/5">
        <Sidebar />
        {props.children}
      </div>
    </div>
  );
}

export default AppContainer;
