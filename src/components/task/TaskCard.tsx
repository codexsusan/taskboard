import React from "react";
import DropdownModal from "../../common/DropdownModal";
import Icon from "../../common/Icon";
import { Task } from "../../utils/taskUtils";
import { UpdateTaskModal } from "./TaskComp";

export function TaskCard(props: {
  task: Task;
  deleteTaskCB: (id: string) => void;
  updateTaskCB: (task: Task) => void;
}) {
  const [taskModal, setTaskModal] = React.useState(false);

  const openTaskCB = () => {
    setTaskModal(true);
  };

  const closeTaskCB = () => {
    setTaskModal(false);
  };

  function handleOnDrag(e: React.DragEvent, data: Task) {
    e.dataTransfer.setData("task", JSON.stringify(data));
  }

  return (
    <div
      draggable
      onDragStart={(e) => handleOnDrag(e, props.task)}
      className="bg-[#DBDBDB] rounded my-2 p-3"
    >
      <div className="">
        <div className="flex items-center justify-between">
          <div className="bg-[#c4c4c4] p-1 rounded">
            {props.task.priority.charAt(0).toUpperCase() +
              props.task.priority.slice(1)}
          </div>
          {/* <DropdownModal
            task={props.task}
            openTaskModalCB={openTaskCB}
            deleteTaskCB={props.deleteTaskCB}
            updateTaskCB={props.updateTaskCB}
          /> */}
        </div>
      </div>
      <div className="my-1">
        <h1 className="text-lg font-semibold">{props.task.title}</h1>
        <div>{props.task.description}</div>
      </div>
      <div className="flex gap-x-2 items-center my-2 justify-end">
        <Icon name="comment" />
        <div className="text-[#787486]">Comment</div>
      </div>
      <UpdateTaskModal
        task={props.task}
        open={taskModal}
        closeCB={closeTaskCB}
        updateTaskCB={props.updateTaskCB}
      />
    </div>
  );
}