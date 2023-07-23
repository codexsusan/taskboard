import { TrashIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  CardFooter,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";

import React, { useEffect } from "react";
import { allMembers } from "../../utils/orgUtils";
import RegisterUser from "./RegisterUser";
import { deleteUser } from "../../utils/userUtils";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export type MembersType = {
  id: string;
  username: string;
  email: string;
  createdAt: string;
};

type State = {
  membersCount: number;
  members: MembersType[];
  pages: number;
  prev: boolean;
  next: boolean;
  currentPage: number;
};

type InitializeState = {
  type: "INITIALIZE_STATE";
  payload: State;
};

type HandlePrevious = {
  type: "HANDLE_PREVIOUS";
  payload: Partial<State>;
};

type HandleNext = {
  type: "HANDLE_NEXT";
  payload: Partial<State>;
};

type AddUser = {
  type: "ADD_USER";
  payload: MembersType;
};

type DeleteUser = {
  type: "DELETE_USER";
  payload: MembersType["id"];
};

type Action =
  | InitializeState
  | HandlePrevious
  | HandleNext
  | AddUser
  | DeleteUser;

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "INITIALIZE_STATE":
      return action.payload;
    case "HANDLE_PREVIOUS":
      return { ...state, ...action.payload };
    case "HANDLE_NEXT":
      return { ...state, ...action.payload };
    case "ADD_USER":
      return {
        ...state,
        members: [...state.members, action.payload],
      };
    case "DELETE_USER":
      return {
        ...state,
        members: state.members.filter((member) => member.id !== action.payload),
      };
    default:
      return state;
  }
};

const enableAddMember = (setAddMember: (value: boolean) => void) => {
  setAddMember(true);
};

const disableAddMember = (setAddMember: (value: boolean) => void) => {
  setAddMember(false);
};

export default function MembersTable() {
  const tableHead = ["Name", "Email", "Employed", " "];
  const limit = 2;

  const [state, dispatch] = React.useReducer(reducer, {
    membersCount: 0,
    members: [],
    pages: 0,
    prev: false,
    next: false,
    currentPage: 1,
  });

  const [addMember, setAddMember] = React.useState(false);

  useEffect(() => {
    allMembers(1, limit)
      .then((res) => {
        dispatch({
          type: "INITIALIZE_STATE",
          payload: {
            membersCount: res.totalMembers,
            members: res.data.results,
            prev: res.data.previous ? true : false,
            next: res.data.next ? true : false,
            pages: Math.ceil(res.totalMembers / 2),
            currentPage: 1,
          },
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handlePreviousCB = () => {
    allMembers(state.currentPage - 1, limit)
      .then((res) => {
        dispatch({
          type: "HANDLE_PREVIOUS",
          payload: {
            members: res.data.results,
            prev: res.data.previous ? true : false,
            next: res.data.next ? true : false,
            currentPage: state.currentPage - 1,
          },
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleNextCB = () => {
    allMembers(state.currentPage + 1, 2)
      .then((res) => {
        dispatch({
          type: "HANDLE_NEXT",
          payload: {
            members: res.data.results,
            prev: res.data.previous ? true : false,
            next: res.data.next ? true : false,
            currentPage: state.currentPage + 1,
          },
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDeleteUser = (id: string) => {
    deleteUser(id)
      .then((res) => {
        if (res.success) {
          dispatch({ type: "DELETE_USER", payload: id });
          toast.success(res.message);
        } else {
          toast.error(res.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addUserCB = (userData: MembersType) => {
    dispatch({ type: "ADD_USER", payload: userData });
  };

  return (
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded">
        <div className="flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Members list
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              See information about all members
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Button
              onClick={() => enableAddMember(setAddMember)}
              className="flex items-center gap-3"
              color="blue"
              size="sm"
            >
              <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add member
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardBody className=" px-0 pb-0">
        <table className=" w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {tableHead.map((head) => (
                <th
                  key={head}
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {state.members.map((member, index) => {
              const isLast = index === state.members.length - 1;
              const classes = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50";
              return (
                <tr key={member.id}>
                  <td className={classes}>
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {member.username}
                        </Typography>
                      </div>
                    </div>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {member.email}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {member.createdAt.split("T")[0]}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Tooltip content="Delete User">
                      <IconButton
                        onClick={() => {
                          handleDeleteUser(member.id);
                        }}
                        variant="text"
                        color="blue-gray"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </IconButton>
                    </Tooltip>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          Page {state.currentPage} of {state.pages}
        </Typography>
        <div className="flex gap-2">
          <Button
            onClick={handlePreviousCB}
            disabled={!state.prev}
            variant="outlined"
            color="blue-gray"
            size="sm"
          >
            Previous
          </Button>
          <Button
            onClick={handleNextCB}
            disabled={!state.next}
            variant="outlined"
            color="blue-gray"
            size="sm"
          >
            Next
          </Button>
        </div>
      </CardFooter>
      <RegisterUser
        addUserCB={addUserCB}
        open={addMember}
        closeCB={() => disableAddMember(setAddMember)}
      />
    </Card>
  );
}
