import React, { useEffect, useReducer } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../common/Buttons";
import {
  Board,
  deleteBoard,
  getBoard,
  updateBoard,
} from "../../utils/boardUtils";
import { IconButton } from "../../common/IconButton";

import {
  Stage,
  createStage,
  deleteStage,
  getAllStage,
  updateStageTitle,
} from "../../utils/stageUtils";
import { reducer, State } from "./reducer";
import Divider from "../../common/Divider";
import { AddStage } from "./StageComp";
import { DeleteModal, UpdateBoard } from "../board/BoardComp";
import { StageCard } from "./StageCard";

function Stages() {
  const { boardId } = useParams();
  const navigate = useNavigate();

  const [state, dispatch] = useReducer(reducer, {
    board: {
      id: boardId,
      title: "",
      description: "",
      stageOrder: [],
    },
    boardLoading: true,
    stageLoading: true,
    stage: [],
    task: [],
    newStage: {
      id: "",
      title: "",
      description: "",
    },
    stageModal: false,
    boardModal: false,
    deleteBoardModal: false,
  } as State);

  useEffect(() => {
    getBoard(boardId!)
      .then((res) => {
        dispatch({
          type: "INITIALIZE_BOARD",
          payload: res.data,
          loadStatus: false,
        });
      })
      .catch((err) => {
        console.log(err);
      });

    getAllStage(boardId!)
      .then((res) => {
        dispatch({ type: "INITIALIZE_STAGE", payload: res.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [boardId]);

  // Board Modal Functions
  const openBoardModalCB = () => {
    dispatch({ type: "OPEN_BOARD_MODAL", payload: true });
  };

  const closeBoardModalCB = () => {
    dispatch({ type: "CLOSE_BOARD_MODAL", payload: false });
  };

  const openDeleteBoardCB = () => {
    dispatch({ type: "OPEN_DELETE_BOARD_MODAL", payload: true });
  };

  const closeDeleteBoardCB = () => {
    dispatch({ type: "CLOSE_DELETE_BOARD_MODAL", payload: false });
  };

  const updateBoardTitleCB = (value: string) => {
    dispatch({ type: "UPDATE_BOARD_TITLE", payload: value });
  };

  const updateBoardDescriptionCB = (value: string) => {
    dispatch({ type: "UPDATE_BOARD_DESCRIPTION", payload: value });
  };

  const updateStageOrderCB = (stage: string) => {
    dispatch({ type: "UPDATE_STAGE_ORDER", payload: stage });
  };

  const deleteBoardCB = () => {
    deleteBoard(boardId!)
      .then((res) => {
        if (res.success) {
          navigate("/board");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateBoardCB = (board: Board) => {
    dispatch({ type: "UPDATE_BOARD", board });
    updateBoard(board)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    closeBoardModalCB();
  };

  // Stage Modal Functions
  const openStageModalCB = () => {
    dispatch({ type: "OPEN_STAGE_MODAL", payload: true });
  };

  const closeStageModalCB = () => {
    dispatch({ type: "CLOSE_STAGE_MODAL", payload: false });
  };

  const createStageCB = (stage: Stage) => {
    createStage(stage, boardId!)
      .then((res) => {
        dispatch({
          type: "CREATE_STAGE",
          payload: {
            id: res.data.id,
            title: stage.title,
            description: stage.description,
          },
        });
        updateStageOrderCB(stage.title);
      })
      .catch((err) => {
        console.log(err);
      });
    dispatch({ type: "CLEAR_FIELDS" });
  };

  const updateStageTitleCB = (id: string, title: string) => {
    dispatch({ type: "UPDATE_STAGE_TITLE", payload: title, id });
    console.log(title);
    updateStageTitle(id, title, boardId!)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteStageCB = (id: string) => {
    dispatch({ type: "DELETE_STAGE", id });
    deleteStage(id, boardId!)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="px-8 h-3/4">
      {!state.boardLoading && (
        <div className="flex justify-between items-center">
          <div className="flex my-5 gap-x-4 items-center">
            <div className="text-2xl font-semibold">{state.board.title}</div>
            <IconButton name="edit" onClick={openBoardModalCB} />
            <IconButton name="delete" onClick={openDeleteBoardCB} />
          </div>
          <div>
            <Button
              onClick={openStageModalCB}
              title="New Stage"
              theme="light"
            />
          </div>
        </div>
      )}
      <Divider />
      <div className="flex gap-x-4 h-full">
        {state.board.stageOrder &&
          state.board.stageOrder.map((stage) => {
            const stageData = state.stage.find((s) => s.title === stage);
            // return <div key={stageData?.id}>{stageData?.id}</div>;
            return stageData ? (
              <StageCard
                updateStageTitleCB={updateStageTitleCB}
                key={stageData?.id}
                stage={stageData}
                deleteStageCB={deleteStageCB}
              />
            ) : null;
          })}
      </div>
      <UpdateBoard
        open={state.boardModal}
        closeCB={closeBoardModalCB}
        boardData={state.board}
        updateBoardCB={updateBoardCB}
        updateNewBoardTitleCB={updateBoardTitleCB}
        updateNewBoardDescriptionCB={updateBoardDescriptionCB}
      />
      <AddStage
        open={state.stageModal}
        closeCB={closeStageModalCB}
        createStageCB={createStageCB}
      />
      <DeleteModal
        deleteBoardCB={deleteBoardCB}
        open={state.deleteBoardModal}
        closeCB={closeDeleteBoardCB}
      />
      {/* <AddTaskModal open={state.taskModal} closeCB={closeTaskModalCB} /> */}
    </div>
  );
}

export default Stages;