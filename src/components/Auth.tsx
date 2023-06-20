import React, { useReducer } from "react";
import InputField from "../common/InputField";
import Button from "../common/Buttons";

type authType = "login" | "register";

type User = {
  name?: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type ChangeEmail = { type: "CHANGE_EMAIL"; payload: string };

type ChangePassword = { type: "CHANGE_PASSWORD"; payload: string };

type ChangeName = { type: "CHANGE_NAME"; payload: string };

type ReducerAction = ChangeEmail | ChangePassword | ChangeName;

const reducer = (state: User, action: ReducerAction) => {
  switch (action.type) {
    case "CHANGE_EMAIL":
      return { ...state, email: action.payload };
    case "CHANGE_PASSWORD":
      return { ...state, password: action.payload };
    case "CHANGE_NAME":
      return { ...state, name: action.payload };
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

  const changeEmail = (value: string) => {
    dispatch({ type: "CHANGE_EMAIL", payload: value });
    console.log(state.email);
  };

  const changePassword = (value: string) => {
    dispatch({ type: "CHANGE_PASSWORD", payload: value });
  };

  const changeName = () => {};

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
          changeEmailCB={changeEmail}
          changePasswordCB={changePassword}
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
  return (
    <form className="w-1/4 flex flex-col gap-y-3">
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
  changePasswordCB: (value: string) => void;
}) {
  return (
    <form className="w-1/4 flex flex-col gap-y-3">
      <InputField
        placeholder="John Doe"
        label="Full Name"
        type="text"
        // value={props.state.name}
        required={true}
      />
      <InputField
        placeholder="johndoe@gmail.com"
        label="Email"
        type="email"
        // value={props.state.email}
        required={true}
      />
      <InputField
        placeholder="•••••••••"
        label="Password"
        type="password"
        // value={props.state.password}
        required={true}
      />
      <InputField
        placeholder="•••••••••"
        label="Confirm Password"
        type="password"
        // value={props.state.confirmPassword}
        required={true}
      />
      <Button
        title="Register"
        theme="dark"
        onClick={() => {
          //   handleLogin();
        }}
      />
    </form>
  );
}

export default Auth;
