import React from "react";
import InputField from "../common/InputField";
import Button from "../common/Buttons";

function Login() {
  const handleLogin = () => {
    console.log("Login handle clicked");
  };
  return (
    <form className="w-1/4 flex flex-col gap-y-3">
      <InputField
        placeholder="johndoe@gmail.com"
        label="Email"
        type="email"
        required={true}
      />
      <InputField
        placeholder="•••••••••"
        label="Password"
        type="password"
        required={true}
      />
      <Button
        title="Login"
        theme="dark"
        onClick={() => {
          handleLogin();
        }}
      />
    </form>
  );
}

export default Login;
