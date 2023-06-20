import React, { useReducer } from "react";
import InputField from "../common/InputField";
import Button from "../common/Buttons";

import { useNavigate } from "react-router-dom";

import { User, authType } from "../types/UserTypes";
import { createUser } from "../utils/authUtils";

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
    console.log(state.email);
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
  const handleLogin = () => {};
  return (
    <form onSubmit={handleLogin} className="w-1/4 flex flex-col gap-y-3">
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
      <Button
        title="Login"
        theme="dark"
        type="submit"
        onClick={() => {
          //   handleLogin();
        }}
      />
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
    <form className="w-1/4 flex flex-col gap-y-3">
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
      <Button
        title="Register"
        theme="dark"
        onClick={() => {
          handleSignUp(props.state);
          //   handleLogin();
        }}
      />
    </form>
  );
}

export default Auth;
