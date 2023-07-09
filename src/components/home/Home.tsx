import React, { useEffect, useState } from "react";
import { formatDate, greetingMessage } from "../../utils/dateUtils";
import jwt_decode from "jwt-decode";
import { orgAllBoards, orgAllTasks } from "../../utils/orgUtils";
import UpdatedTable from "../../common/UpdatedTable";

type analyticsData = {
  title: string;
  count: number;
  desc: string;
};

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

export type MembersType = {
  id: string;
  userName: string;
  email: string;
  createdAt: string;
};

type State = {
  boardsCount: number;
  tasksCount: number;
};

function Home() {
  const presentDay = formatDate();
  const token = localStorage.getItem("token");
  const user: UserTypes = jwt_decode(token!);
  const userType = user.userType;
  const greetings = greetingMessage(userType);
  const [state, setState] = useState<State>({
    boardsCount: 0,
    tasksCount: 0,
  });
  useEffect(() => {
    orgAllBoards()
      .then((res) => {
        setState((prevState) => ({
          ...prevState,
          boardsCount: res.totalBoards,
        }));
      })
      .catch((err) => {
        console.log(err);
      });
    orgAllTasks()
      .then((res) => {
        setState((prevState) => ({
          ...prevState,
          tasksCount: res.tasksCount,
        }));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const analytics: analyticsData[] = [
    {
      title: "Total Tasks",
      count: state.tasksCount,
      desc: "Task Count",
    },
    {
      title: "Total Boards",
      count: state.boardsCount,
      desc: "Board Count",
    },
  ];

  return (
    <div className="flex flex-col gap-y-10 w-full px-[10rem] py-[2rem]">
      <div className="flex flex-col w-full gap-y-2">
        <div className=" text-xl font-semibold text-[#787486]">
          {presentDay}
        </div>
        <div className="text-4xl opacity-60 text-[#0D062D] font-bold">
          {greetings}
        </div>
      </div>
      <div className="flex gap-x-4">
        {analytics.map((data: analyticsData) => (
          <AnalyticsBox key={data.title} data={data} />
        ))}
      </div>
      <MembersSection />
    </div>
  );
}

function AnalyticsBox(props: { data: analyticsData }) {
  return (
    <div className="flex flex-col justify-between gap-y-8 border-2 px-6 py-4 rounded-lg w-72">
      <div className="text-[#0D062D] opacity-60 text-xl font-semibold">
        {props.data.title}
      </div>
      <div className="flex flex-col">
        <p className="text-[#0D062D] opacity-60 text-2xl font-bold">
          {props.data.count}
        </p>
        <p className="text-[#787486]">{props.data.desc}</p>
      </div>
    </div>
  );
}

function MembersSection() {
  return (
    <div className="flex flex-col gap-y-4">
      <div className="text-2xl text-[#0D062D] opacity-70 font-bold">
        All Members
      </div>
      {/* <Table tableHead={tableHead} tableRows={tableRows} /> */}
      <UpdatedTable />
    </div>
  );
}

export default Home;