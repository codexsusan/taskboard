import React, { useEffect, useReducer, useState } from "react";
import { IconButton } from "../../common/IconButton";
import Divider from "../../common/Divider";
import { Stage } from "../../utils/stageUtils";
import {
  Task,
  createTask,
  deleteTask,
  getAllTask,
} from "../../utils/taskUtils";
import { AddTaskModal } from "../task/TaskComp";
import Button from "../../common/Buttons";
import { TaskCard } from "../task/TaskCard";
import { reducer } from "./cardReducer";

export function StageCard(props: {
  stage: Stage;
  deleteStageCB?: (id: string) => void;
  updateStageTitleCB?: (id: string, title: string) => void;
}) {
  const [title, setTitle] = useState(props.stage.title);
  const [state, dispatch] = useReducer(reducer, {
    task: [] as Task[],
    modalTask: false,
    editStage: false,
    newTask: {
      id: "",
      title: "",
      description: "",
      priority: "",
    } as Task,
  });

  const openTaskModalCB = () => {
    dispatch({ type: "SWITCH_TASK_MODAL", payload: true });
  };

  const closeTaskModalCB = () => {
    dispatch({ type: "SWITCH_TASK_MODAL", payload: false });
    dispatch({ type: "CLEAR_FIELDS" });
  };

  const updateNewTask = (task: Task) => {
    dispatch({ type: "UPDATE_NEW_TASK", task });
  };

  const enableEditStage = () => {
    dispatch({ type: "EDIT_STAGE", payload: true });
  };

  const disableEditStage = () => {
    dispatch({ type: "EDIT_STAGE", payload: false });
  };

  const deleteTaskCB = (id: string) => {
    dispatch({ type: "DELETE_TASK", id });
    deleteTask(id, props.stage.id)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const updateTaskCB = (task: Task) => {
    dispatch({ type: "UPDATE_TASK", payload: task });
  };

  const createTaskCB = () => {
    createTask(props.stage.id, state.newTask)
      .then((res) => {
        dispatch({
          type: "ADD_NEW_TASK",
          payload: {
            id: res.data.id,
            title: res.data.title,
            description: res.data.description,
            priority: res.data.priority,
          },
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getAllTask(props.stage.id)
      .then((res) => {
        dispatch({
          type: "INITIALIZE_TASK",
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.stage.id]);

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
  }

  function handleOnDrop(e: React.DragEvent) {
    const data = JSON.parse(e.dataTransfer.getData("task"));
    console.log(data);
    if (data.stageId === props.stage.id) return;
    createTask(props.stage.id, data)
      .then((res) => {
        dispatch({
          type: "ADD_NEW_TASK",
          payload: {
            id: res.data.id,
            title: res.data.title,
            description: res.data.description,
            priority: res.data.priority,
          },
        });
      })
      .catch((error) => {
        console.log(error);
      });
    deleteTask(data.id, data.stageId)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div
      onDrop={(e) => handleOnDrop(e)}
      onDragOver={handleDragOver}
      className="bg-[#F5F5F5] mt-5 px-4 py-2 rounded w-80 h-5/6"
    >
      <div className="flex mb-2 items-center justify-between">
        {!state.editStage && (
          <>
            <div className=" text-xl font-medium">{props.stage.title}</div>
            <div className="flex items-center gap-x-2">
              <IconButton
                onClick={() => {
                  enableEditStage();
                }}
                name="edit"
              />
              <IconButton
                name="delete"
                onClick={() => props.deleteStageCB!(props.stage.id)}
              />
            </div>
          </>
        )}
        {state.editStage && (
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
                  disableEditStage();
                  props.updateStageTitleCB!(props.stage.id, title);
                }}
              />
              <IconButton
                // stroke="#FFFFFF"
                customClass="bg-red-500"
                name="cancel"
                onClick={() => {
                  disableEditStage();
                  setTitle(props.stage.title);
                }}
              />
            </div>
          </>
        )}
      </div>
      <Divider />
      <div>
        {state.task.map((task: Task) => {
          return (
            <TaskCard
              updateTaskCB={updateTaskCB}
              deleteTaskCB={deleteTaskCB}
              task={task}
              key={task.id}
            />
          );
        })}
      </div>
      <Button
        onClick={openTaskModalCB}
        customClass="w-full mt-3"
        theme="white"
        title="Add Task"
      />
      {/* <AddTaskModal
        newTask={state.newTask}
        open={state.modalTask}
        closeCB={closeTaskModalCB}
        updateNewTask={updateNewTask}
        createTaskCB={createTaskCB}
      /> */}
    </div>
  );
}
