import React from "react";
import Modal from "../../common/Modal";
import InputField from "../../common/InputField";
import { userSignUp } from "../../utils/userUtils";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MembersType } from "./MembersTable";
import { Spinner } from "@material-tailwind/react";
export type UserData = {
  username: string;
  email: string;
  password: string;
  loading: boolean;
};

function RegisterUser(props: {
  open: boolean;
  closeCB: () => void;
  addUserCB: (userData: MembersType) => void;
}) {
  const [userData, setUserData] = React.useState<UserData>({
    username: "",
    email: "",
    password: "",
    loading: false,
  });

  const updateName = (value: string) => {
    setUserData({ ...userData, username: value });
  };

  const updateEmail = (value: string) => {
    setUserData({ ...userData, email: value });
  };

  const updatePassword = (value: string) => {
    setUserData({ ...userData, password: value });
  };

  const handleUserRegister = (userData: UserData) => {
    setUserData({ ...userData, loading: true });
    userSignUp(userData)
      .then((res) => {
        setUserData({ ...userData, loading: false });
        if (res.success) {
          toast.success(res.message);
          props.addUserCB(res.data);
        } else {
          toast.error(res.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Modal open={props.open} closeCB={props.closeCB}>
      <div className="mt-8 mb-10">
        <div className="text-2xl text-center mb-8 text-[#696969] font-semibold">
          Register User
        </div>
        <div className="w-full flex justify-center">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleUserRegister(userData);
              props.closeCB();
            }}
            className="flex w-full mx-16 flex-col gap-y-3"
          >
            <InputField
              placeholder="John Doe"
              label="Full Name"
              type="text"
              onValueChange={updateName}
              value={userData.username}
              required={true}
            />
            <InputField
              placeholder="johndoe@gmail.com"
              label="Email"
              type="email"
              onValueChange={updateEmail}
              value={userData.email}
              required={true}
            />
            <InputField
              placeholder="•••••••••"
              label="Password"
              type="password"
              onValueChange={updatePassword}
              value={userData.password}
              required={true}
            />
            <button
              type="submit"
              className="border bg-[#030711] text-[#F8FAFC] border-slate-50 px-4 py-2 rounded-md flex justify-center gap-x-2 items-center"
            >
              {userData.loading && <Spinner color="blue" />}
              Register
            </button>
          </form>
        </div>
      </div>
    </Modal>
  );
}

export default RegisterUser;
