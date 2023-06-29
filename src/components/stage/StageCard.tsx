import React, { useEffect, useReducer, useState } from "react";
import { IconButton } from "../../common/IconButton";
import Divider from "../../common/Divider";
import { Stage } from "../../utils/stageUtils";
import { Task, createTask, getAllTask } from "../../utils/taskUtils";
import { AddTaskModal, TaskCard } from "../task/TaskComp";
import Button from "../../common/Buttons";

type State = {
  task: Task[];
  newTask: Task;
  modalTask: boolean;
  editStage: boolean;
};

type InitializeTask = {
  type: "INITIALIZE_TASK";
  payload: Task[];
};

type SwitchTaskModal = {
  type: "SWITCH_TASK_MODAL";
  payload: boolean;
};

type UpdateTitle = {
  type: "UPDATE_TITLE";
  payload: string;
};

type UpdateDescription = {
  type: "UPDATE_DESCRIPTION";
  payload: string;
};

type UpdatePriority = {
  type: "UPDATE_PRIORITY";
  payload: string;
};

type AddNewTask = {
  type: "ADD_NEW_TASK";
  payload: Task;
};

type ClearFields = {
  type: "CLEAR_FIELDS";
};

type EditStageStatus = {
  type: "EDIT_STAGE";
  payload: boolean;
};

type TaskAction =
  | InitializeTask
  | SwitchTaskModal
  | UpdateTitle
  | UpdateDescription
  | AddNewTask
  | EditStageStatus
  | ClearFields
  | UpdatePriority;

const reducer = (state: State, action: TaskAction) => {
  switch (action.type) {
    case "INITIALIZE_TASK":
      return {
        ...state,
        task: [...action.payload],
      };
    case "SWITCH_TASK_MODAL":
      return {
        ...state,
        modalTask: action.payload,
      };
    case "UPDATE_TITLE":
      return {
        ...state,
        newTask: {
          ...state.newTask,
          title: action.payload,
        },
      };
    case "UPDATE_DESCRIPTION":
      return {
        ...state,
        newTask: {
          ...state.newTask,
          description: action.payload,
        },
      };
    case "ADD_NEW_TASK":
      return {
        ...state,
        task: [...state.task, action.payload],
      };
    case "UPDATE_PRIORITY":
      return {
        ...state,
        newTask: {
          ...state.newTask,
          priority: action.payload,
        },
      };
    case "EDIT_STAGE":
      return {
        ...state,
        editStage: action.payload,
      };
    case "CLEAR_FIELDS":
      return {
        ...state,
        newTask: {
          id: "",
          title: "",
          description: "",
          priority: "",
        },
      };
    default:
      return state;
  }
};

export function StageCard(props: {
  stage: Stage;
  deleteStageCB: (id: string) => void;
  updateStageTitleCB: (id: string, title: string) => void;
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

  const updateTitleCB = (value: Task["title"]) => {
    dispatch({ type: "UPDATE_TITLE", payload: value });
  };

  const updateDescriptionCB = (value: Task["description"]) => {
    dispatch({ type: "UPDATE_DESCRIPTION", payload: value });
  };
  const updatePriorityCB = (value: Task["priority"]) => {
    dispatch({ type: "UPDATE_PRIORITY", payload: value });
  };

  const enableEditStage = () => {
    dispatch({ type: "EDIT_STAGE", payload: true });
  };

  const disableEditStage = () => {
    dispatch({ type: "EDIT_STAGE", payload: false });
  };

  const createTaskCB = () => {
    createTask(state.newTask, props.stage.id)
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

  return (
    <div className="bg-[#F5F5F5] mt-5 px-4 py-2 rounded w-80 h-5/6">
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
                onClick={() => props.deleteStageCB(props.stage.id)}
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
                  props.updateStageTitleCB(props.stage.id, title);
                }}
              />
              <IconButton
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
      {state.task.length > 0 &&
        state.task.map((task: Task) => {
          return <TaskCard task={task} key={task.id} />;
        })}
      <Button
        onClick={openTaskModalCB}
        customClass="w-full mt-3"
        theme="white"
        title="Add Task"
      />
      <AddTaskModal
        newTask={state.newTask}
        open={state.modalTask}
        closeCB={closeTaskModalCB}
        updateTitleCB={updateTitleCB}
        updateDescriptionCB={updateDescriptionCB}
        updatePriorityCB={updatePriorityCB}
        createTaskCB={createTaskCB}
      />
    </div>
  );
}
