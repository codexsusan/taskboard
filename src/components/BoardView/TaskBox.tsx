import React, { Fragment } from "react";
import DropdownModal from "../../common/DropdownModal";
import SideOvers from "../../common/SideOvers";
import { Task, allAssigned } from "../../utils/taskUtils";
import { UpdateTaskModal } from "../task/TaskComp";
import TaskDetail from "../task/TaskDetail";
import { MemberType } from "../task/reducer";
import { Stage } from "./reducer";

const openTaskCB = (setTaskModal: (value: boolean) => void) => {
  setTaskModal(true);
};

const closeTaskCB = (setTaskModal: (value: boolean) => void) => {
  setTaskModal(false);
};

function TaskBox(props: {
  task: Task;
  stageId: Stage["id"];
  updateTaskCB: (task: Task) => void;
  deleteTaskCB: (stageId: Stage["id"], taskId: Task["id"]) => void;
}) {
  const [taskModal, setTaskModal] = React.useState(false);
  const [sideOver, setSideOver] = React.useState(false);
  const [taskAssigned, setTaskAssigned] = React.useState<MemberType[]>([]);
  const setTaskAssignCB = (newUser: MemberType) => {
    setTaskAssigned([...taskAssigned, newUser]);
  };

  const setTaskUnassignCB = (user: MemberType) => {
    setTaskAssigned(
      taskAssigned.filter((assignedUser) => assignedUser.id !== user.id)
    );
  };

  React.useEffect(() => {
    allAssigned(props.task.boardId!, props.task.id)
      .then((res) => {
        if (res.success) setTaskAssigned(res.data);
        if (!res.success) alert(res.message);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.task]);

  const closeSideOver: () => void = () => {
    setSideOver(false);
  };

  function handleOnDrag(e: React.DragEvent, data: Task) {
    e.dataTransfer.setData("task", JSON.stringify(data));
  }

  return (
    <div
      draggable
      onDragStart={(e) => handleOnDrag(e, props.task)}
      className="bg-[#DBDBDB] rounded my-2 p-3"
      onClick={() => {
        setSideOver(true);
      }}
    >
      <div className="">
        <div className="flex items-center justify-between">
          <div className="bg-[#c4c4c4] p-1 rounded">
            {props.task.priority.charAt(0).toUpperCase() +
              props.task.priority.slice(1)}
          </div>
          <DropdownModal
            stageId={props.stageId}
            task={props.task}
            openTaskModalCB={() => openTaskCB(setTaskModal)}
            deleteTaskCB={props.deleteTaskCB}
          />
        </div>
      </div>
      <div className="my-1">
        <h1 className="text-lg font-semibold">{props.task.title}</h1>
        <div>{props.task.description}</div>
        <div className="flex -space-x-2 overflow-hidden mt-4 py-1 px-2">
          {taskAssigned.map((user: MemberType) => {
            return user.image ? (
              <Fragment key={user.id}>
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
                  src={user.image}
                  alt=""
                />
              </Fragment>
            ) : (
              <Fragment key={user.id}>
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
                  src="https://res.cloudinary.com/dgxbzasei/image/upload/v1691064812/download_xfqes8.jpg"
                  alt=""
                />
              </Fragment>
            );
          })}
        </div>
      </div>
      <div onClick={(e) => e.stopPropagation()}>
        <UpdateTaskModal
          task={props.task}
          open={taskModal}
          closeCB={() => closeTaskCB(setTaskModal)}
          updateTaskCB={props.updateTaskCB}
        />
      </div>
      <SideOvers open={sideOver} closeCB={closeSideOver}>
        <TaskDetail
          setTaskAssignCB={setTaskAssignCB}
          setTaskUnassignCB={setTaskUnassignCB}
          updateTaskCB={props.updateTaskCB}
          stageId={props.stageId}
          deleteTaskCB={props.deleteTaskCB}
          task={props.task}
        />
      </SideOvers>
    </div>
  );
}

export default TaskBox;
