import React from "react";
import Navbar from "../common/Navbar";

function AppContainer(props: { children: React.ReactNode }) {
  return (
    <div className="h-screen w-screen">
      <Navbar source="appcontainer" />
      {props.children}
    </div>
  );
}

export default AppContainer;
