import React, { useReducer } from "react";
import InputField from "../../../common/InputField";

import { useNavigate } from "react-router-dom";

import { User, authType } from "../../../types/UserTypes";
import { loginUser, createUser } from "../../../utils/userUtils";
import Images from "../../../common/Images";
import logo from "../../../assets/Logo.png";

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

  const changeName = (value: string) => {
    dispatch({
      type: "CHANGE_NAME",
      payload: value,
    });
  };

  const changeEmail = (value: string) => {
    dispatch({ type: "CHANGE_EMAIL", payload: value });
  };

  const changePassword = (value: string) => {
    dispatch({ type: "CHANGE_PASSWORD", payload: value });
  };

  const changeConfirmPassword = (value: string) => {
    dispatch({ type: "CHANGE_CONFIRM_PASSWORD", payload: value });
  };

  switch (props.authMethod) {
    case "login": {
      return (
        <Login
          state={state}
          changeEmailCB={changeEmail}
          changePasswordCB={changePassword}
        />
      );
    }
    case "register": {
      return (
        <Signup
          state={state}
          changeNameCB={changeName}
          changeEmailCB={changeEmail}
          changePasswordCB={changePassword}
          changeConfirmPasswordCB={changeConfirmPassword}
        />
      );
    }
  }
}

function Login(props: {
  state: User;
  changeEmailCB: (value: string) => void;
  changePasswordCB: (value: string) => void;
}) {
  const navigate = useNavigate();
  const handleLogin = async (user: User) => {
    try {
      const userData = await loginUser(user);
      if (userData.success) {
        navigate("/home");
        localStorage.setItem("token", userData.authToken);
      } else {
        console.log(userData);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-full flex flex-col items-center justify-center gap-y-10 mb-10">
      <Images source={logo} />
      <div className="w-1/3 text-center">
        <div>
          <div className="text-2xl text-[#696969] font-semibold mb-2">
            Log in
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
            handleLogin(props.state);
          }}
          className="w-1/4 flex flex-col gap-y-3"
        >
          <InputField
            placeholder="johndoe@gmail.com"
            label="Email"
            type="email"
            required={true}
            value={props.state.email}
            onValueChange={props.changeEmailCB}
          />
          <InputField
            placeholder="•••••••••"
            label="Password"
            type="password"
            required={true}
            value={props.state.password}
            onValueChange={props.changePasswordCB}
          />
          <button
            type="submit"
            className="border bg-[#030711] text-[#F8FAFC] border-slate-50 px-4 py-2 rounded-md "
          >
            Login
          </button>
          <div className="text-center">
            Not a member?{" "}
            <span
              onClick={() => {
                navigate("/register");
              }}
              className="text-blue-600 hover:text-blue-800 cursor-pointer"
            >
              Sign Up
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

function Signup(props: {
  state: User;
  changeEmailCB: (value: string) => void;
  changeNameCB: (value: string) => void;
  changePasswordCB: (value: string) => void;
  changeConfirmPasswordCB: (value: string) => void;
}) {
  const navigate = useNavigate();

  const handleSignUp = async (user: User) => {
    console.log(user);
    try {
      // createUser(user)
      //   .then((data) => {
      //     if (data.success) {
      //       navigate("/board");
      //       localStorage.setItem("token", data.authToken);
      //     }
      //   })
      //   .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center gap-y-10 mb-10">
      <Images source={logo} />
      <div className="w-1/3 text-center">
        <div>
          <div className="text-2xl text-[#696969] font-semibold mb-2">
            Sign up
          </div>
          <div className="text-slate-500">Register yourself to access</div>
        </div>
      </div>
      <div className="w-full flex justify-center">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSignUp(props.state);
          }}
          className="w-1/4 flex flex-col gap-y-3"
        >
          <InputField
            placeholder="John Doe"
            label="Full Name"
            type="text"
            onValueChange={props.changeNameCB}
            value={props.state.name}
            required={true}
          />
          <InputField
            placeholder="johndoe@gmail.com"
            label="Email"
            type="email"
            onValueChange={props.changeEmailCB}
            value={props.state.email}
            required={true}
          />
          <InputField
            placeholder="•••••••••"
            label="Password"
            type="password"
            onValueChange={props.changePasswordCB}
            value={props.state.password}
            required={true}
          />
          <InputField
            placeholder="•••••••••"
            label="Confirm Password"
            type="password"
            onValueChange={props.changeConfirmPasswordCB}
            value={props.state.confirmPassword}
            required={true}
          />
          <button
            type="submit"
            className="border bg-[#030711] text-[#F8FAFC] border-slate-50 px-4 py-2 rounded-md "
          >
            Register
          </button>
          <div className="text-center">
            Already a member?{" "}
            <span
              onClick={() => {
                navigate("/login");
              }}
              className="text-blue-600 hover:text-blue-800 cursor-pointer"
            >
              Log in
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserAuth;
