import React, { useEffect, useReducer } from "react";
import { Board, getBoard } from "../../utils/boardUtils";
import { useParams } from "react-router-dom";
import {
  createStage,
  deleteStage,
  getAllStage,
  updateStageTitle,
} from "../../utils/stageUtils";
import { IconButton } from "../../common/IconButton";
import Button from "../../common/Buttons";
import Divider from "../../common/Divider";
import StageCol from "./StageCol";
import { Stage, reducer } from "./reducer";
import { AddStage } from "../stage/StageComp";
import { Task, createTask, deleteTask } from "../../utils/taskUtils";

const openStageModalCB = (setCreateStageModal: (value: boolean) => void) => {
  setCreateStageModal(true);
};

const closeStageModalCB = (setCreateStageModal: (value: boolean) => void) => {
  setCreateStageModal(false);
};

function BoardView() {
  const { boardId } = useParams();

  const [createStageModal, setCreateStageModal] = React.useState(false);

  const [state, dispatch] = useReducer(reducer, {
    board: {} as Board,
    stage: [],
  });

  useEffect(() => {
    getBoard(boardId!)
      .then((res) => {
        dispatch({
          type: "INITIALIZE_BOARD",
          payload: res.data,
        });
      })
      .catch((err) => console.log(err));
    getAllStage(boardId!)
      .then((res) => {
        dispatch({
          type: "INITIALIZE_STAGE",
          payload: res.data,
        });
      })
      .catch((err) => console.log(err));
  }, [boardId]);

  const createStageCB = (stage: Stage) => {
    dispatch({
      type: "ADD_STAGE",
      payload: stage,
    });
    createStage(stage, boardId!)
      .then((res) => {
        res.success ? console.log("created") : console.log("not created");
      })
      .catch((err) => {});
  };

  const UpdateStageTitleCB = (id: Stage["id"], title: Stage["title"]) => {
    dispatch({
      type: "UPDATE_STAGE_TITLE",
      payload: { title, id },
    });
    updateStageTitle(id, title, boardId!)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteStageCB = (id: Stage["id"]) => {
    deleteStage(id, boardId!)
      .then((res) => {
        res.success
          ? dispatch({
              type: "DELETE_STAGE",
              payload: id,
            })
          : console.log("not deleted");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addTaskCB = (stageId: Stage["id"], task: Task) => {
    createTask(stageId, task)
      .then((res) => {
        if (res.success) {
          dispatch({
            type: "ADD_TASK",
            payload: {
              stageId,
              task: res.data,
            },
          });
        }
      })
      .catch((err) => console.log(err));
  };

  const deleteTaskCB = (stageId: Stage["id"], taskId: Task["id"]) => {
    deleteTask(stageId, taskId)
      .then((res) => {
        if (res.success) {
          dispatch({ type: "DELETE_TASK", payload: { stageId, taskId } });
        } else {
          alert("Task not deleted");
        }
      })
      .catch((err) => console.log(err));
  };

  const switchStage = (
    source: Stage["id"],
    destination: Stage["id"],
    task: Task
  ) => {
    addTaskCB(destination, task);
    deleteTaskCB(source, task.id);
  };

  return (
    <div className="px-8 h-3/4">
      <div className="flex justify-between items-center">
        <div className="flex my-5 gap-x-4 items-center">
          <div className="text-2xl font-semibold">{state.board.title}</div>
          <IconButton name="edit" />
          <IconButton name="delete" />
        </div>
        <div>
          <Button
            onClick={() => {
              openStageModalCB(setCreateStageModal);
            }}
            title="New Stage"
            theme="light"
          />
        </div>
      </div>
      <Divider />
      <div className="flex gap-x-4 h-full">
        {state.board.stageOrder &&
          state.board.stageOrder.map((stage) => {
            const stageData = state.stage.find((s) => s.id === stage);
            return stageData ? (
              <StageCol
                switchStage={switchStage}
                deleteTaskCB={deleteTaskCB}
                addTaskCB={addTaskCB}
                updateStageTitleCB={UpdateStageTitleCB}
                deleteStageCB={deleteStageCB}
                key={stageData.id}
                stage={stageData}
              />
            ) : null;
          })}
      </div>
      <AddStage
        open={createStageModal}
        closeCB={() => {
          closeStageModalCB(setCreateStageModal);
        }}
        createStageCB={createStageCB}
      />
    </div>
  );
}

export default BoardView;
