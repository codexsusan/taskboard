import React from "react";
import Button from "./Buttons";
import { useNavigate } from "react-router-dom";

function Navbar(props: { source: string }) {
  const navigate = useNavigate();
  return (
    <div className="p-6 bg-[#030711] text-white flex justify-between flex-1 items-center">
      <div>
        <h1 className="text-xl font-semibold">TASKBOARD</h1>
      </div>

      {props.source === "authcontainer" && (
        <div className="flex items-center gap-x-8">
          <div>
            <Button
              title="Register"
              theme="light"
              onClick={() => navigate("/register")}
            />
          </div>
          <div>
            <Button
              title="Login"
              theme="dark"
              onClick={() => navigate("/login")}
            />
          </div>
        </div>
      )}
      {props.source === "appcontainer" && (
        <div>
          <Button
            title="Logout"
            theme="dark"
            onClick={() => {
              navigate("/login");
              localStorage.removeItem("token");
            }}
          />
        </div>
      )}
    </div>
  );
}

export default Navbar;
