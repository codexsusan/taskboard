import React from "react";
import { Task } from "../../utils/taskUtils";
import DropdownModal from "../../common/DropdownModal";
import { UpdateTaskModal } from "../task/TaskComp";
import { Stage } from "./reducer";
import AssignTaskModal from "./AssignTaskModal";
import SideOvers from "../../common/SideOvers";
import SideOversContent from "../../common/SideOversContent";

const openTaskCB = (setTaskModal: (value: boolean) => void) => {
  setTaskModal(true);
};

const closeTaskCB = (setTaskModal: (value: boolean) => void) => {
  setTaskModal(false);
};

const openAssignTaskModalCB = (
  setAssignTaskModal: (value: boolean) => void
) => {
  setAssignTaskModal(true);
};

const closeAssignTaskModalCB = (
  setAssignTaskModal: (value: boolean) => void
) => {
  setAssignTaskModal(false);
};

function TaskBox(props: {
  task: Task;
  stageId: Stage["id"];
  updateTaskCB: (task: Task) => void;
  deleteTaskCB: (stageId: Stage["id"], taskId: Task["id"]) => void;
}) {
  const [taskModal, setTaskModal] = React.useState(false);
  const [assignTaskModal, setAssignTaskModal] = React.useState(false);
  const [sideOver, setSideOver] = React.useState(false);

  const closeSideOver: () => void = () => {
    setSideOver(false);
  };

  function handleOnDrag(e: React.DragEvent, data: Task) {
    e.dataTransfer.setData("task", JSON.stringify(data));
    // console.log(data);
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
            openAssignTaskModalCB={() =>
              openAssignTaskModalCB(setAssignTaskModal)
            }
            deleteTaskCB={props.deleteTaskCB}
          />
        </div>
      </div>
      <div className="my-1">
        <h1 className="text-lg font-semibold">{props.task.title}</h1>
        <div>{props.task.description}</div>
      </div>
      {/* <div className="flex gap-x-2 items-center my-2 justify-end">
        <Icon name="comment" />
        <div className="text-[#787486]">Comment</div>
      </div> */}
      <UpdateTaskModal
        task={props.task}
        open={taskModal}
        closeCB={() => closeTaskCB(setTaskModal)}
        updateTaskCB={props.updateTaskCB}
      />
      <AssignTaskModal
        task={props.task}
        open={assignTaskModal}
        closeCB={() => closeAssignTaskModalCB(setAssignTaskModal)}
      />
      <SideOvers open={sideOver} closeCB={closeSideOver}>
        <SideOversContent updateTaskCB={props.updateTaskCB} stageId={props.stageId} deleteTaskCB={props.deleteTaskCB} task={props.task} />
      </SideOvers>
    </div>
  );
}

export default TaskBox;
