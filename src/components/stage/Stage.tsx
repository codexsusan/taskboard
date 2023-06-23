import React, { useEffect, useReducer } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../common/Buttons";
import { Board, deleteBoard, updateBoard } from "../../utils/boardUtils";
import Modal from "../../common/Modal";
import { BoardBox } from "../board/Boards";
import IconButton from "../../common/IconButton";
import InputField from "../../common/InputField";
import {
  Stage,
  createStage,
  deleteStage,
  getStage,
} from "../../utils/stageUtils";
import { reducer, State } from "./reducer";

function Stages() {
  const { state } = useLocation();
  const { id, title, description } = state as Board;
  const navigate = useNavigate();

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

  const deleteBoardCB = () => {
    deleteBoard(id)
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

  const createStageCB = (stage: Stage) => {
    dispatch({ type: "CREATE_STAGE", payload: stage });

    createStage(stage)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteStageCB = (id: string) => {
    dispatch({ type: "DELETE_STAGE", id });
    deleteStage(id)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getStage()
      .then((res) => {
        dispatch({ type: "INITIALIZE_STAGE", payload: res.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const [currentState, dispatch] = useReducer(reducer, {
    board: {
      id,
      title,
      description,
    },
    stage: [],
    stageModal: false,
    boardModal: false,
    deleteBoardModal: false,
  } as State);

  return (
    <div className="px-8 pt-4 h-3/4">
      <div className="flex justify-between items-center">
        <div className="flex gap-x-4 items-center">
          <div className="text-2xl font-semibold">
            {currentState.board.title}
          </div>
          <IconButton name="edit" onClick={openBoardModalCB} />
          <IconButton name="delete" onClick={openDeleteBoardCB} />
        </div>
        <div>
          <Button onClick={openStageModalCB} title="Create" theme="light" />
        </div>
      </div>
      <div className="">{currentState.board.description}</div>
      <div className="w-full h-full flex border rounded-xl items-start p-4 text-xl mt-4 gap-x-2">
        {currentState.stage.map((stage) => {
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
        open={currentState.boardModal}
        closeCB={closeBoardModalCB}
        boardData={currentState.board}
        updateBoardCB={updateBoardCB}
      />

      <AddStage
        createStageCB={createStageCB}
        open={currentState.stageModal}
        closeCB={closeStageModalCB}
      />

      <DeleteModal
        deleteBoardCB={deleteBoardCB}
        open={currentState.deleteBoardModal}
        closeCB={closeDeleteBoardCB}
      />
    </div>
  );
}

function UpdateBoard(props: {
  open: boolean;
  closeCB: () => void;
  boardData: Board;
  updateBoardCB: (board: Board) => void;
}) {
  return (
    <Modal open={props.open} closeCB={props.closeCB}>
      <BoardBox addBoardCB={props.updateBoardCB} boardData={props.boardData} />
    </Modal>
  );
}

function AddStage(props: {
  open: boolean;
  closeCB: () => void;
  createStageCB: (stage: Stage) => void;
}) {
  return (
    <Modal open={props.open} closeCB={props.closeCB}>
      <StageComp createStageCB={props.createStageCB} closeCB={props.closeCB} />
    </Modal>
  );
}

function DeleteModal(props: {
  open: boolean;
  closeCB: () => void;
  deleteBoardCB: () => void;
}) {
  return (
    <Modal open={props.open} closeCB={props.closeCB}>
      <div className="flex flex-col gap-y-4">
        <div className="text-xl">
          Are you sure? You want to delete this board.
        </div>
        <div className="flex justify-end gap-x-4">
          <Button title="Cancel" theme="light" onClick={props.closeCB} />
          <Button
            title="Delete"
            theme="dark"
            onClick={() => {
              props.deleteBoardCB();
              props.closeCB();
            }}
          />
        </div>
      </div>
    </Modal>
  );
}

function StageCard(props: {
  stage: Stage;
  deleteStageCB: (id: string) => void;
}) {
  return (
    <div className="bg-slate-100 px-4 py-2 rounded w-72 h-full">
      <div className="flex items-center justify-between">
        <div>{props.stage.title}</div>
        <div>
          <IconButton
            name="delete"
            onClick={() => props.deleteStageCB(props.stage.id)}
          />
        </div>
      </div>
    </div>
  );
}

type updateTitle = {
  type: "UPDATE_TITLE";
  payload: string;
};

type updateDescription = {
  type: "UPDATE_DESCRIPTION";
  payload: string;
};

type clearFields = {
  type: "CLEAR_FIELDS";
};

type newStageAction = updateTitle | updateDescription | clearFields;

const newFieldReducer = (state: Stage, action: newStageAction) => {
  switch (action.type) {
    case "UPDATE_TITLE":
      return {
        ...state,
        title: action.payload,
      };
    case "UPDATE_DESCRIPTION":
      return {
        ...state,
        description: action.payload,
      };
    case "CLEAR_FIELDS":
      return {
        ...state,
        title: "",
        description: "",
      };

    default:
      return state;
  }
};

export function StageComp(props: {
  createStageCB?: (stage: Stage) => void;
  closeCB?: () => void;
  stageData?: Stage;
}) {
  const [state, dispatch] = useReducer(newFieldReducer, {
    id: "",
    title: "",
    description: "",
  });

  const changeTitleCB = (value: string) => {
    dispatch({ type: "UPDATE_TITLE", payload: value });
  };

  const changeDescriptionCB = (value: string) => {
    dispatch({ type: "UPDATE_DESCRIPTION", payload: value });
  };

  return (
    <div className="w-full divide-y divide-gray-200">
      <h1 className="text-2xl text-gray-700 text-center my-2">Create Stage</h1>
      <form
        className="py-4 flex flex-col gap-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          props.createStageCB!(state);
          props.closeCB!();
        }}
      >
        <InputField
          value={state.title}
          onValueChange={changeTitleCB}
          label="Title"
          type="text"
        />
        <InputField
          onValueChange={changeDescriptionCB}
          label="Description"
          type="text"
          value={state.description}
        />
        <div className="flex items-center w-full justify-between">
          <Button theme="dark" title="Cancel" onClick={props.closeCB} />
          <div className="flex my-2">
            <button
              className="bg-slate-100 text-[#030711] hover:bg-slate-200 px-4 py-2 rounded-md "
              type="submit"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Stages;
