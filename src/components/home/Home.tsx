import React from "react";
import { formatDate, greetingFormattter } from "../../utils/dateUtils";
import jwt_decode from "jwt-decode";
import { allMembers } from "../../utils/orgUtils";

type UserTypes = {
  userType: string;
  iat: number;
} & (
  | {
      user: {
        id: string;
      };
    }
  | {
      org: {
        id: string;
      };
    }
);

function Home() {
  const presentDay = formatDate();
  const greetings = greetingFormattter();
  const token = localStorage.getItem("token");
  const user: UserTypes = jwt_decode(token!);
  const userType = user.userType;

  return (
    <div className="flex flex-col gap-y-10 w-full px-[10rem] py-[2rem]">
      <div className="flex flex-col w-full gap-y-2">
        <div className=" text-xl text-[#787486]">{presentDay}</div>
        <div className="text-4xl opacity-60 text-[#0D062D] font-bold">
          {greetings}
        </div>
      </div>
      {userType === "org" ? <Members user={user} /> : null}
    </div>
  );
}

function Members(props: { user: UserTypes }) {
  allMembers()
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
  return (
    <div className="flex flex-col gap-y-4">
      <div className="text-2xl text-[#0D062D] opacity-70 font-bold">
        Members
      </div>
      <div className="flex flex-col gap-y-2">
        <div className="w-full h-10 bg-gray-200 flex items-center p-4 rounded">
          Hello
        </div>
      </div>
    </div>
  );
}

export default Home;
