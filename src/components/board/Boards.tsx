import React, { useEffect, useReducer } from "react";
import Button from "../../common/Buttons";
import InputField from "../../common/InputField";
import Modal from "../../common/Modal";
import { listBoard, Board, createBoard } from "../../utils/boardUtils";
import { useNavigate } from "react-router-dom";

type BoardState = {
  boards: Board[];
  loading: boolean;
  modalStatus: boolean;
};

type InitializeState = {
  type: "INITIALIZE_STATE";
  data: Board[];
};

type updateModalStatus = {
  type: "UPDATE_MODAL_STATUS";
  payload: boolean;
};

type addBoardAction = {
  type: "ADD_BOARD";
  payload: Board;
};

type ReducerAction = InitializeState | updateModalStatus | addBoardAction;

const reducer = (state: BoardState, action: ReducerAction) => {
  switch (action.type) {
    case "INITIALIZE_STATE":
      return {
        ...state,
        loading: false,
        boards: [...action.data],
      };
    case "UPDATE_MODAL_STATUS":
      return { ...state, modalStatus: action.payload };
    case "ADD_BOARD":
      return { ...state, boards: [...state.boards, action.payload] };
    default:
      return state;
  }
};

function Boards() {
  const [state, dispatch] = useReducer(reducer, {
    boards: [],
    loading: true,
    modalStatus: false,
  } as BoardState);

  const addBoardCB = (board: Board) => {
    console.log(board);
    dispatch({ type: "ADD_BOARD", payload: board });
    createBoard(board)
      .then((res) => {
        console.log(res);
        if (res.success) {
          closeModalCB();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const openModalCB = () => {
    dispatch({ type: "UPDATE_MODAL_STATUS", payload: true });
  };

  const closeModalCB = () => {
    dispatch({ type: "UPDATE_MODAL_STATUS", payload: false });
  };

  useEffect(() => {
    const fetchBoardData = async () => {
      await listBoard().then((res) => {
        dispatch({ type: "INITIALIZE_STATE", data: res.data });
      });
    };
    fetchBoardData();
  }, []);

  return (
    <div className="px-8 pt-4 h-auto">
      <div className="flex justify-between mb-5">
        <div className="text-2xl font-semibold ">MY BOARDS</div>
        <div>
          <Button
            onClick={() => {
              openModalCB();
            }}
            title="Create"
            theme="light"
          />
        </div>
      </div>
      <div className="flex flex-wrap gap-6">
        {state.loading && (
          <div className="text-2xl font-semibold text-center w-full">
            Loading...
          </div>
        )}
        {!state.loading && state.boards.length === 0 && (
          <div className="text-2xl font-semibold text-center w-full">
            No Boards Found
          </div>
        )}
        {!state.loading &&
          state.boards.length > 0 &&
          state.boards.map((board) => {
            return (
              <BoardCard
                id={board.id}
                key={board.id}
                title={board.title}
                description={board.description}
              />
            );
          })}
      </div>
      <Modal open={state.modalStatus} closeCB={() => closeModalCB()}>
        <BoardBox closeCB={closeModalCB} addBoardCB={addBoardCB} />
      </Modal>
    </div>
  );
}

export function BoardCard(props: {
  id: string;
  title: string;
  description: string;
}) {
  const navigate = useNavigate();

  const navigateToBoard = () => {
    navigate(`/board/${props.id}`, {
      state: {
        id: props.id,
        title: props.title,
        description: props.description,
      },
    });
  };
  return (
    <div
      onClick={navigateToBoard}
      className="border cursor-pointer border-slate-200 w-72 py-6 px-4 rounded-lg flex flex-col gap-y-1 hover:bg-slate-50 hover:border-slate-300"
    >
      <div className="text-2xl font-medium text-neutral-600">{props.title}</div>
      <div className="text-lg font-medium text-neutral-500">
        {props.description}
      </div>
      <div className=" text-sm text-neutral-400">03/04/2023</div>
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

type newFieldAction = updateTitle | updateDescription | clearFields;

const newFieldReducer = (state: Board, action: newFieldAction) => {
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

export function BoardBox(props: {
  addBoardCB?: (board: Board) => void;
  closeCB?: () => void;
  boardData?: Board;
}) {
  const initializer = () => {
    if (props.boardData) {
      return {
        id: props.boardData.id,
        title: props.boardData.title,
        description: props.boardData.description,
      };
    } else {
      return {
        id: "",
        title: "",
        description: "",
      };
    }
  };

  const [state, dispatch] = useReducer(newFieldReducer, {
    id: "",
    title: "",
    description: "",
  }, initializer);

  const changeTitleCB = (value: string) => {
    dispatch({ type: "UPDATE_TITLE", payload: value });
  };

  const changeDescriptionCB = (value: string) => {
    dispatch({ type: "UPDATE_DESCRIPTION", payload: value });
  };

  return (
    <div className="w-full divide-y divide-gray-200">
      <h1 className="text-2xl text-gray-700 text-center my-2">Create Board</h1>
      <form
        className="py-4 flex flex-col gap-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          props.addBoardCB!(state);
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

export default Boards;
