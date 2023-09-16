import React, { useReducer, useState } from "react";
import InputField from "../../../common/InputField";

import { useNavigate } from "react-router-dom";

import { User, authType } from "../../../types/UserTypes";
import { userLogIn } from "../../../utils/userUtils";
import Images from "../../../common/Images";
import logo from "../../../assets/Logo.png";
import Button from "../../../common/Buttons";
import { toast } from "react-toastify";
import { Spinner } from "@material-tailwind/react";

type ChangeName = { type: "CHANGE_NAME"; payload: string };

type ChangeEmail = { type: "CHANGE_EMAIL"; payload: string };

type ChangePassword = { type: "CHANGE_PASSWORD"; payload: string };

type ChangeConfirmPassword = {
  type: "CHANGE_CONFIRM_PASSWORD";
  payload: string;
};

type ReducerAction =
  | ChangeEmail
  | ChangePassword
  | ChangeName
  | ChangeConfirmPassword;

const reducer = (state: User, action: ReducerAction) => {
  switch (action.type) {
    case "CHANGE_EMAIL":
      return { ...state, email: action.payload };
    case "CHANGE_PASSWORD":
      return { ...state, password: action.payload };
    case "CHANGE_NAME":
      return { ...state, name: action.payload };
    case "CHANGE_CONFIRM_PASSWORD":
      return { ...state, confirmPassword: action.payload };
    default:
      return state;
  }
};

function UserAuth(props: { authMethod: authType }) {
  const initialState: User = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const handleLogin = async (user: User) => {
    try {
      setLoading(true);
      const userData = await userLogIn(user);
      setLoading(false);
      if (userData.success) {
        navigate("/home");
        localStorage.setItem("token", userData.authToken);
      } else {
        toast.error(userData.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const changeEmail = (value: string) => {
    dispatch({ type: "CHANGE_EMAIL", payload: value });
  };

  const changePassword = (value: string) => {
    dispatch({ type: "CHANGE_PASSWORD", payload: value });
  };
  // switch (props.authMethod) {
  //   case "login": {
  //     return (
  //       <Login
  //         state={state}
  //         changeEmailCB={changeEmail}
  //         changePasswordCB={changePassword}
  //       />
  //     );
  //   }

  // }
  return (
    <div className="w-full flex flex-col items-center justify-center gap-y-10 mb-10">
      <Images source={logo} />
      <div className="w-1/3 text-center">
        <div>
          <div className="text-2xl text-[#696969] font-semibold mb-2">
            User Log in
          </div>
          <div className="text-slate-500">
            Enter your credentials to access your account
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin(state);
          }}
          className="w-1/4 flex flex-col gap-y-3"
        >
          <InputField
            placeholder="johndoe@gmail.com"
            label="Email"
            type="email"
            required={true}
            value={state.email}
            onValueChange={changeEmail}
          />
          <InputField
            placeholder="•••••••••"
            label="Password"
            type="password"
            required={true}
            value={state.password}
            onValueChange={changePassword}
          />
          <button
            type="submit"
            className="border bg-[#030711] text-[#F8FAFC] border-slate-50 px-4 py-2 rounded-md flex justify-center gap-x-2 items-center"
          >
            {loading && <Spinner color="blue" />}
            Login
          </button>
          <Button
            theme="light"
            children={"Log in as Organization"}
            onClick={() => {
              navigate("/org/login");
            }}
          />
        </form>
      </div>
    </div>
  );
}

export default UserAuth;
