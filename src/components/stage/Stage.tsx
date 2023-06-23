import React, { useReducer } from "react";
import { useLocation } from "react-router-dom";
import Button from "../../common/Buttons";
import { Board } from "../../utils/boardUtils";
import Modal from "../../common/Modal";
import { BoardBox } from "../board/Boards";
import IconButton from "../../common/IconButton";
import InputField from "../../common/InputField";

type StageModalAction = {
  type: "OPEN_STAGE_MODAL" | "CLOSE_STAGE_MODAL";
  payload: boolean;
};

type BoardModalAction = {
  type: "OPEN_BOARD_MODAL" | "CLOSE_BOARD_MODAL";
  payload: boolean;
};

type deleteBoardModalAction = {
  type: "OPEN_DELETE_BOARD_MODAL" | "CLOSE_DELETE_BOARD_MODAL";
  payload: boolean;
};

type BoardActions =
  | StageModalAction
  | BoardModalAction
  | deleteBoardModalAction;

type State = {
  board: Board;
  stageModal: boolean;
  boardModal: boolean;
  deleteBoardModal: boolean;
};

const reducer = (state: State, action: BoardActions) => {
  switch (action.type) {
    case "OPEN_BOARD_MODAL":
      return {
        ...state,
        boardModal: action.payload,
      };
    case "CLOSE_BOARD_MODAL":
      return {
        ...state,
        boardModal: action.payload,
      };
    case "OPEN_STAGE_MODAL":
      return {
        ...state,
        stageModal: action.payload,
      };
    case "CLOSE_STAGE_MODAL":
      return {
        ...state,
        stageModal: action.payload,
      };
    case "OPEN_DELETE_BOARD_MODAL":
      return {
        ...state,
        deleteBoardModal: action.payload,
      };
    case "CLOSE_DELETE_BOARD_MODAL":
      return {
        ...state,
        deleteBoardModal: action.payload,
      };
    default:
      return state;
  }
};

function Stages() {
  const { state } = useLocation();
  const { id, title, description } = state as Board;

  const openBoardModalCB = () => {
    dispatch({ type: "OPEN_BOARD_MODAL", payload: true });
  };
  const closeBoardModalCB = () => {
    dispatch({ type: "CLOSE_BOARD_MODAL", payload: false });
  };

  const openStageModalCB = () => {
    dispatch({ type: "OPEN_STAGE_MODAL", payload: true });
  };
  const closeStageModalCB = () => {
    dispatch({ type: "CLOSE_STAGE_MODAL", payload: false });
  };

  const openDeleteBoardCB = () => {
    dispatch({ type: "OPEN_DELETE_BOARD_MODAL", payload: true });
  };

  const closeDeleteBoardCB = () => {
    dispatch({ type: "CLOSE_DELETE_BOARD_MODAL", payload: false });
  };

  const [currentState, dispatch] = useReducer(reducer, {
    board: {
      id,
      title,
      description,
    },
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
      <div className="">{description}</div>
      <div className="w-full border h-full rounded p-4 text-center mt-4">
        This is a Stage section
      </div>

      <UpdateBoard
        open={currentState.boardModal}
        closeCB={closeBoardModalCB}
        boardData={currentState.board}
      />

      <AddStage open={currentState.stageModal} closeCB={closeStageModalCB} />

      <DeleteModal
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
}) {
  return (
    <Modal open={props.open} closeCB={props.closeCB}>
      <BoardBox boardData={props.boardData} />
    </Modal>
  );
}

function AddStage(props: { open: boolean; closeCB: () => void }) {
  return (
    <Modal open={props.open} closeCB={props.closeCB}>
      <StageComp />
    </Modal>
  );
}

function DeleteModal(props: { open: boolean; closeCB: () => void }) {
  return (
    <Modal open={props.open} closeCB={props.closeCB}>
      <div className="flex flex-col gap-y-4">
        <div className="text-xl">
          Are you sure? You want to delete this board.
        </div>
        <div className="flex justify-end gap-x-4">
          <Button title="Cancel" theme="light" onClick={props.closeCB} />
          <Button title="Delete" theme="dark" onClick={props.closeCB} />
        </div>
      </div>
    </Modal>
  );
}

type Stage = {
  id: string;
  title: string;
  description: string;
};

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
  addStageCB?: (stage: Stage) => void;
  closeCB?: () => void;
  stageData?: Stage;
}) {
  const initializer = () => {
    if (props.stageData) {
      return {
        id: props.stageData.id,
        title: props.stageData.title,
        description: props.stageData.description,
      };
    } else {
      return {
        id: "",
        title: "",
        description: "",
      };
    }
  };

  const [state, dispatch] = useReducer(
    newFieldReducer,
    {
      id: "",
      title: "",
      description: "",
    },
    initializer
  );

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
          props.addStageCB!(state);
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
