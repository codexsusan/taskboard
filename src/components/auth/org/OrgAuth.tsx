import React from "react";
import InputField from "../../../common/InputField";
import Images from "../../../common/Images";
import logo from "../../../assets/Logo.png";
import { useNavigate } from "react-router-dom";

import { Org, createOrg, loginOrg } from "../../../utils/orgUtils";
import { reducer, authType } from "./reducer";

function OrgAuth(props: { authMethod: authType }) {
  const initialState: Org = {
    id: "",
    orgName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [state, dispatch] = React.useReducer(reducer, initialState);

  const changeNameCB = (orgName: Org["orgName"]) => {
    dispatch({ type: "CHANGE_ORG_NAME", payload: orgName });
  };

  const changeEmailCB = (email: Org["email"]) => {
    dispatch({ type: "CHANGE_EMAIL", payload: email });
  };

  const changePasswordCB = (password: Org["password"]) => {
    dispatch({ type: "CHANGE_PASSWORD", payload: password });
  };

  const changeConfirmPasswordCB = (confirmPassword: Org["confirmPassword"]) => {
    dispatch({ type: "CHANGE_CONFIRM_PASSWORD", payload: confirmPassword });
  };

  const updateOrg = (org: Org) => {
    dispatch({ type: "UPDATE_ORG", payload: org });
  };

  const clearValuesCB = () => {
    dispatch({ type: "CLEAR_VALUES" });
  };

  switch (props.authMethod) {
    case "login": {
      return (
        <OrgLogin
          {...props}
          changeEmailCB={changeEmailCB}
          changePasswordCB={changePasswordCB}
          state={state}
          updateOrg={updateOrg}
          clearValuesCB={clearValuesCB}
        />
      );
    }
    case "register": {
      return (
        <OrgSignup
          {...props}
          state={state}
          changeNameCB={changeNameCB}
          changeEmailCB={changeEmailCB}
          changePasswordCB={changePasswordCB}
          changeConfirmPasswordCB={changeConfirmPasswordCB}
          clearValuesCB={clearValuesCB}
        />
      );
    }
  }
}

function OrgLogin(props: {
  state: Org;
  authMethod: authType;
  updateOrg: (org: Org) => void;
  changeEmailCB: (email: Org["email"]) => void;
  changePasswordCB: (password: Org["password"]) => void;
  clearValuesCB: () => void;
}) {
  const navigate = useNavigate();

  const handleLogin = (org: Org) => {
    try {
      loginOrg(org)
        .then((res) => {
          navigate("/board");
          props.updateOrg(res.org);
          localStorage.setItem("token", res.authToken);
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center gap-y-10 mb-10">
      <AuthHeader {...props} />
      <div className="w-full flex justify-center">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin(props.state);
          }}
          className="w-1/4 flex flex-col gap-y-3"
        >
          <InputField
            placeholder="xyzorg@gmail.com"
            label="Organization Email"
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
                props.clearValuesCB();
                navigate("/org/register");
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

function OrgSignup(props: {
  state: Org;
  authMethod: authType;
  changeNameCB: (orgName: Org["orgName"]) => void;
  changeEmailCB: (email: Org["email"]) => void;
  changePasswordCB: (password: Org["password"]) => void;
  changeConfirmPasswordCB: (confirmPassword: Org["confirmPassword"]) => void;
  clearValuesCB: () => void;
}) {
  const navigate = useNavigate();

  const handleSignUp = (org: Org) => {
    try {
      createOrg(org)
        .then((res) => {
          if (res.success) {
            navigate("/board");
            localStorage.setItem("token", res.authToken);
          } else {
            console.log(res);
          }
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-full flex flex-col items-center justify-center gap-y-10 mb-10">
      <AuthHeader {...props} />
      <div className="w-full flex justify-center">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSignUp(props.state);
          }}
          className="w-1/4 flex flex-col gap-y-3"
        >
          <InputField
            placeholder="Organization Name Here"
            label="Organization Name"
            type="text"
            onValueChange={props.changeNameCB}
            value={props.state.orgName}
            required={true}
          />
          <InputField
            placeholder="name@company.com"
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
            Already have a Organization?{" "}
            <span
              onClick={() => {
                props.clearValuesCB();
                navigate("/org/login");
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

function AuthHeader(props: { authMethod: authType }) {
  switch (props.authMethod) {
    case "login": {
      return (
        <>
          <Images source={logo} />
          <div className="w-1/3 text-center">
            <div>
              <div className="text-2xl text-[#696969] font-semibold mb-2">
                Organization Log in
              </div>
              <div className="text-slate-500">
                Enter your credentials to access your account
              </div>
            </div>
          </div>
        </>
      );
    }
    case "register": {
      return (
        <>
          <Images source={logo} />
          <div className="w-1/3 text-center">
            <div>
              <div className="text-2xl text-[#696969] font-semibold mb-2">
                Organization Sign up
              </div>
              <div className="text-slate-500">Register yourself to access</div>
            </div>
          </div>
        </>
      );
    }
  }
}

export default OrgAuth;