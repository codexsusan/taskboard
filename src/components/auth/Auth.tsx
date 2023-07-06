import React, { useReducer } from "react";
import InputField from "../../common/InputField";

import { useNavigate } from "react-router-dom";

import { User, authType } from "../../types/UserTypes";
import { checkUser, createUser } from "../../utils/authUtils";

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

function Auth(props: { authMethod: authType }) {
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
      const userData = await checkUser(user);
      if (userData.success) {
        navigate("/");
        localStorage.setItem("token", userData.authToken);
      } else {
        console.log(userData);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
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
    </form>
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
    console.log(user)
    try {
      const userData = await createUser(user);
      console.log(userData);
      if (userData.success) {
        navigate("/home");
        localStorage.setItem("token", userData.authToken);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
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
    </form>
  );
}

export default Auth;
