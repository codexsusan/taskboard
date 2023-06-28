import React, { useEffect, useReducer } from "react";
import IconButton from "../../common/IconButton";
import AddBtn from "./AddBtn";
import Divider from "../../common/Divider";
import { Stage } from "../../utils/stageUtils";
import { Task, getAllTask } from "../../utils/taskUtils";
import { TaskCard } from "../task/TaskComp";
import Button from "../../common/Buttons";

type InitializeTask = {
  type: "INITIALIZE_TASK";
  payload: Task[];
};

type State = {
  task: Task[];
};

const reducer = (state: State, action: InitializeTask) => {
  switch (action.type) {
    case "INITIALIZE_TASK":
      return {
        ...state,
        task: [...action.payload],
      };
    default:
      return state;
  }
};

export function StageCard(props: {
  stage: Stage;
  deleteStageCB: (id: string) => void;
}) {
  const [state, dispatch] = useReducer(reducer, {
    task: [] as Task[],
  });

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
    <div className="bg-slate-100 mt-5 px-4 py-2 rounded w-80 h-5/6">
      <div className="flex mb-2 items-center justify-between">
        <div className=" text-xl font-medium">{props.stage.title}</div>
        <div>
          <IconButton
            name="delete"
            onClick={() => props.deleteStageCB(props.stage.id)}
          />
        </div>
      </div>
      {state.task.length > 0 &&
        state.task.map((task) => {
          return <TaskCard key={task.id} />;
        })}
      <Divider />
      <Button customClass="w-full mt-3" theme="white" title="Add Task" />
      {/* <AddBtn /> */}
    </div>
  );
}
