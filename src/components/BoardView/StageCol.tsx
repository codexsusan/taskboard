import React from "react";
import { Task } from "../../utils/taskUtils";
import { IconButton } from "../../common/IconButton";
import Divider from "../../common/Divider";
import TaskBox from "./TaskBox";
import Button from "../../common/Buttons";
import { AddTaskModal } from "../task/TaskComp";

type Stage = {
  id: string;
  title: string;
  tasks: Task[];
};

const enableEditStage = (setEditStageController: (value: boolean) => void) => {
  setEditStageController(true);
};
const disableEditStage = (setEditStageController: (value: boolean) => void) => {
  setEditStageController(false);
};

const enableAddTask = (setAddTaskController: (value: boolean) => void) => {
  setAddTaskController(true);
};

const disableAddTask = (setAddTaskController: (value: boolean) => void) => {
  setAddTaskController(false);
};

type Props = {
  stage: Stage;
  stageCount: number;
  deleteStageCB: (id: string) => void;
  updateStageTitleCB: (id: Stage["id"], title: Stage["title"]) => void;
  addTaskCB: (stageId: Stage["id"], task: Task) => void;
  updateTaskCB: (task: Task) => void;
  deleteTaskCB: (stageId: Stage["id"], taskId: Task["id"]) => void;
  switchStage: (
    source: Stage["id"],
    destination: Stage["id"],
    task: Task
  ) => void;
};

function StageCol(props: Props) {
  const [title, setTitle] = React.useState(props.stage.title);

  const [editStageController, setEditStageController] = React.useState(false);
  const [addTaskController, setAddTaskController] = React.useState(false);

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
  }

  function handleOnDrop(e: React.DragEvent) {
    const data = JSON.parse(e.dataTransfer.getData("task"));
    if (data.stageId === props.stage.id) return;
    props.switchStage(data.stageId, props.stage.id, data);
    
  }

  return (
    <div
      onDrop={(e) => handleOnDrop(e)}
      onDragOver={handleDragOver}
      className={`bg-[#F5F5F5] mt-5 px-4 py-2 rounded h-5/6 ${
        props.stageCount < 6 && props.stageCount !== 1 && props.stageCount !== 2
          ? `w-1/${props.stageCount}`
          : "w-1/3"
      } `}
    >
      <div className="flex mb-2 items-center justify-between">
        {!editStageController && (
          <>
            <div className=" text-xl font-medium">{props.stage.title}</div>
            <div className="flex items-center gap-x-2">
              <IconButton
                onClick={() => {
                  enableEditStage(setEditStageController);
                }}
                name="edit"
              />
              <IconButton
                name="delete"
                onClick={() => props.deleteStageCB(props.stage.id)}
              />
            </div>
          </>
        )}
        {editStageController && (
          <>
            <div className=" text-xl font-medium">
              <input
                ref={(input) => input && input.focus()}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                value={title}
                className="w-44 bg-[#F5F5F5] p-1"
                type="text"
              />
            </div>
            <div className="flex items-center gap-x-2">
              <IconButton
                name="check"
                onClick={() => {
                  disableEditStage(setEditStageController);
                  props.updateStageTitleCB(props.stage.id, title);
                }}
              />
              <IconButton
                name="cancel"
                onClick={() => {
                  disableEditStage(setEditStageController);
                  setTitle(props.stage.title);
                }}
              />
            </div>
          </>
        )}
      </div>

      <Divider />
      {props.stage.tasks.map((task) => {
        return (
          <TaskBox
            updateTaskCB={props.updateTaskCB}
            stageId={props.stage.id}
            deleteTaskCB={props.deleteTaskCB}
            key={task.id}
            task={task}
          />
        );
      })}

      <Button
        onClick={() => enableAddTask(setAddTaskController)}
        customClass="w-full mt-3"
        theme="white"
        title="Add Task"
      />

      <AddTaskModal
        open={addTaskController}
        addTaskCB={props.addTaskCB}
        stageId={props.stage.id}
        closeCB={() => disableAddTask(setAddTaskController)}
      />
    </div>
  );
}

export default StageCol;
