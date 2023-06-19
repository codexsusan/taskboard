import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const naviagte = useNavigate();

  return (
    <div className="p-6 bg-[#030711] text-white flex justify-between flex-1">
      <div>
        <h1 className="text-xl font-semibold">TASKBOARD</h1>
      </div>
      <div className="flex items-center gap-4">
        <div>
          <button
            className="border bg-[#F8FAFC] text-[#030711] hover: border-slate-50 px-4 py-2 rounded-md "
            onClick={() => {
              naviagte("/register");
            }}
          >
            Register
          </button>
        </div>
        <button
        className="border border-slate-50 px-4 py-2 rounded-md "
          onClick={() => {
            naviagte("/login");
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default Home;
