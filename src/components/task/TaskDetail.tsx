import React, { useReducer } from "react";
import { Dialog } from "@headlessui/react";
import {
  Task,
  allAssigned,
  assignTask,
  unassignTask,
} from "../../utils/taskUtils";
import { IconButton } from "../../common/IconButton";
import InputField from "../../common/InputField";
import Button from "../../common/Buttons";
import { getAllUsersInBoard } from "../../utils/userUtils";
import { MemberType, Stage, reducer } from "./reducer";
import { toast } from "react-toastify";

function TaskDetail(props: {
  setTaskAssignCB: (assignedUsers: MemberType) => void;
  setTaskUnassignCB: (user: MemberType) => void;
  task: Task;
  deleteTaskCB: (stageId: Stage["id"], taskId: Task["id"]) => void;
  updateTaskCB: (task: Task) => void;
  stageId: Stage["id"];
}) {
  const [state, dispatch] = useReducer(reducer, {
    editController: false,
    assignTaskController: false,
    currentTask: props.task,
    boardMembers: [] as MemberType[],
    assignedMembers: [] as MemberType[],
    unAssignedMembers: [] as MemberType[],
  });

  // TODO: Make local class so that it wont get updated in global state directly
  const [task, setTask] = React.useState<Task>(props.task);

  const assignMemberCB = (member: MemberType) => {
    // TODO: API CALL REMAINING
    assignTask(props.task.boardId!, task.id, member.id)
      .then((res) => {
        if (res.success) {
          dispatch({ type: "ASSIGN_MEMBER", payload: member });
          props.setTaskAssignCB(member);
        } else {
          toast.error(res.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const unassignMemberCB = (member: MemberType) => {
    dispatch({ type: "UNASSIGN_MEMBER", payload: member });
    props.setTaskUnassignCB(member);
    unassignTask(props.task.boardId!, task.id, member.id)
      .then((res) => {
        // console.log(res);
        toast.success(res.message);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  React.useEffect(() => {
    getAllUsersInBoard(props.task.boardId!)
      .then((res) => {
        dispatch({ type: "INITIALIZE_BOARD_MEMBERS", payload: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.task.boardId]);

  React.useEffect(() => {
    allAssigned(props.task.boardId!, props.task.id)
      .then((res) => {
        dispatch({
          type: "INITIALIZE_ASSIGNED_MEMBERS",
          payload: res.data,
        });
        // console.log(res); 
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.task.boardId, props.task.id]);

  React.useEffect(() => {
    dispatch({
      type: "INITIALIZE_UNASSIGNED_MEMBERS",
      payload: state.boardMembers.filter((memberData) => {
        const assignedMembersId = state.assignedMembers.map(
          (member) => member.id
        );
        return !assignedMembersId.includes(memberData.id);
      }),
    });
  }, [state.assignedMembers, state.boardMembers]);

  return (
    <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
      <div className=" gap-x-4 items-center px-4 sm:px-6">
        <Dialog.Title className="text-2xl font-semibold leading-6 text-gray-900">
          {state.currentTask.title}
        </Dialog.Title>
        <div className="flex gap-x-4 items-center mt-4">
          <div className="bg-[#c4c4c4] p-1 rounded">
            {state.currentTask.priority.charAt(0).toUpperCase() +
              state.currentTask.priority.slice(1)}
          </div>
          {!state.editController ? (
            <IconButton
              name="edit"
              onClick={() => {
                dispatch({ type: "ENABLE_EDIT" });
                setTask(state.currentTask);
              }}
            />
          ) : (
            <IconButton
              name="cancel"
              onClick={() => {
                dispatch({ type: "DISABLE_EDIT" });
              }}
            />
          )}
          <IconButton
            name="delete"
            onClick={() => {
              props.deleteTaskCB(
                state.currentTask.stageId!,
                state.currentTask.id
              );
            }}
          />
          {state.assignTaskController ? (
            <IconButton
              name="cancel"
              onClick={() => {
                dispatch({ type: "DISABLE_ASSIGN" });
              }}
            />
          ) : (
            <IconButton
              onClick={() => {
                dispatch({ type: "ENABLE_ASSIGN" });
              }}
              name="user-plus"
            />
          )}
        </div>
      </div>
      <div className="mt-4 flex-1 px-4 sm:px-6">
        {!state.editController && (
          <div className="text-gray-700">{state.currentTask.description}</div>
        )}
        {state.editController && (
          <form
            className=" transition-opacity ease-in duration-700 opacity-100 "
            action=""
          >
            <div className="mt-2 flex flex-col gap-6">
              <InputField
                value={task.title}
                onValueChange={(value) => {
                  setTask({
                    ...task,
                    title: value,
                  });
                }}
                label="Title"
                type="text"
              />
              <InputField
                onValueChange={(value) => {
                  setTask({
                    ...task,
                    description: value,
                  });
                }}
                label="Description"
                type="text"
                value={task.description}
              />
              <div className="w-full">
                <label htmlFor="priority" className="block mb-1">
                  Priority
                </label>
                <select
                  value={task.priority}
                  onChange={(e) => {
                    setTask({
                      ...task,
                      priority: e.target.value,
                    });
                  }}
                  className="p-2 rounded w-full"
                  name="priority"
                  id="priority"
                >
                  <option value="" disabled>
                    Select one Option
                  </option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <div className="flex gap-x-2 items-center w-full justify-between">
                <Button
                  customClass="w-1/2"
                  onClick={() => {
                    props.updateTaskCB(task);
                    dispatch({ type: "UPDATE_TASK", payload: task });
                    dispatch({ type: "DISABLE_EDIT" });
                  }}
                  theme="light"
                  children={"Update"}
                />
                <Button
                  customClass="w-1/2"
                  onClick={() => {
                    dispatch({ type: "DISABLE_EDIT" });
                  }}
                  theme="dark"
                  children={"Cancel"}
                />
              </div>
            </div>
          </form>
        )}
        {state.assignTaskController && (
          <div className="mt-8">
            <div className="text-2xl font-semibold my-4">Assign Task</div>
            <div className="flex flex-col gap-y-4">
              <div className="flex flex-col gap-y-4">
                {state.assignedMembers.map((member) => {
                  return (
                    <div
                      key={member.id}
                      className="flex justify-between items-center bg-blue-gray-50 p-2 rounded gap-y-3"
                    >
                      <div className="flex gap-x-4 ml-2 items-center">
                        {member.image ? (
                          <div>
                            <img
                              className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
                              src={member.image!}
                              alt=""
                            />
                          </div>
                        ) : (
                          <div>
                            <img
                              className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
                              src="https://res.cloudinary.com/dgxbzasei/image/upload/v1691064812/download_xfqes8.jpg"
                              alt=""
                            />
                          </div>
                        )}
                        <div className="text-gray-900 font-semibold">
                          {member.username}
                        </div>
                      </div>
                      <div>
                        <Button
                          theme="white"
                          title="Remove"
                          onClick={() => unassignMemberCB(member)}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="flex flex-col gap-y-4">
                {state.unAssignedMembers.map((member) => {
                  return (
                    <div
                      key={member.id}
                      className="flex justify-between items-center bg-blue-gray-50 p-2 rounded"
                    >
                      <div className="flex gap-x-4 ml-2 items-center">
                        {member.image ? (
                          <div>
                            <img
                              className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
                              src={member.image!}
                              alt=""
                            />
                          </div>
                        ) : (
                          <div>
                            <img
                              className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
                              src="https://res.cloudinary.com/dgxbzasei/image/upload/v1691064812/download_xfqes8.jpg"
                              alt=""
                            />
                          </div>
                        )}
                        <div className="text-gray-900 font-semibold">
                          {member.username}
                        </div>
                      </div>
                      <div>
                        <Button
                          theme="white"
                          title="Assign"
                          onClick={() => assignMemberCB(member)}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
        <div className="mt-6">
          <img src={``} alt="" />
        </div>
      </div>
    </div>
  );
}

export default TaskDetail;
