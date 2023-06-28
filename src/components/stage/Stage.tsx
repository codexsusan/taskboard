import React, { useEffect, useReducer } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../common/Buttons";
import {
  Board,
  deleteBoard,
  getBoard,
  updateBoard,
} from "../../utils/boardUtils";
import IconButton from "../../common/IconButton";
import { ShimmerUIButton } from "shimmer-ui-effect";

import {
  Stage,
  createStage,
  deleteStage,
  getAllStage,
} from "../../utils/stageUtils";
import { reducer, State } from "./reducer";
import Divider from "../../common/Divider";
import StageCard from "./StageCard";
import { AddStage } from "./StageComp";
import { DeleteModal, UpdateBoard } from "../board/BoardComp";

function Stages() {
  const { boardId } = useParams();
  const navigate = useNavigate();

  const [state, dispatch] = useReducer(reducer, {
    board: {
      id: boardId,
      title: "",
      description: "",
    },
    boardLoading: true,
    stageLoading: true,
    stage: [],
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
    // UpdateBoard is working but not updating the state so we need to load the fetch the data from db as it is currently sending previously loaded data
    dispatch({ type: "UPDATE_BOARD", payload: board });
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

  const updateNewStageTitleCB = (value: string) => {
    dispatch({ type: "UPDATE_NEW_STAGE_TITLE", payload: value });
  };

  const updateNewStageDescriptionCB = (value: string) => {
    dispatch({ type: "UPDATE_NEW_STAGE_DESCRIPTION", payload: value });
  };

  const createStageCB = (stage: Stage) => {
    dispatch({ type: "CREATE_STAGE", payload: stage });

    createStage(stage, boardId!)
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
      {state.boardLoading && (
        <div className="flex justify-between items-center">
          <div className="mt-5 flex gap-x-4">
            <ShimmerUIButton borderRadius={4} height={40} width={100} />
            <ShimmerUIButton borderRadius={4} height={40} width={40} />
            <ShimmerUIButton borderRadius={4} height={40} width={40} />
          </div>
          <div className="mt-5">
            <ShimmerUIButton borderRadius={4} height={40} width={80} />
          </div>
        </div>
      )}
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
        {state.stage.map((stage) => {
          return (
            <StageCard
              key={stage.id}
              stage={stage}
              deleteStageCB={deleteStageCB}
            />
          );
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
        createStageCB={createStageCB}
        open={state.stageModal}
        newStage={state.newStage}
        updateNewStageTitleCB={updateNewStageTitleCB}
        updateNewStageDescriptionCB={updateNewStageDescriptionCB}
        closeCB={closeStageModalCB}
      />
      <DeleteModal
        deleteBoardCB={deleteBoardCB}
        open={state.deleteBoardModal}
        closeCB={closeDeleteBoardCB}
      />
    </div>
  );
}

export default Stages;
