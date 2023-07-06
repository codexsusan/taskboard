import React, { useEffect, useReducer } from "react";
import Button from "../../common/Buttons";
import InputField from "../../common/InputField";
import Modal from "../../common/Modal";
import { listBoard, Board, createBoard } from "../../utils/boardUtils";
import { BoardState, reducer } from "./reducer";
import { BoardCard } from "./BoardComp";

function Boards() {
  const [state, dispatch] = useReducer(reducer, {
    boards: [],
    loading: true,
    modalStatus: false,
    newBoard: {
      id: "",
      title: "",
      description: "",
    },
  } as BoardState);

  const addBoardCB = (board: Board) => {
    dispatch({ type: "ADD_BOARD", payload: board });
    createBoard(board)
      .then((res) => {
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

  const updateNewBoardCB = (board: Board) => {
    dispatch({ type: "UPDATE_NEW_BOARD", board });
  };

  const updateNewBoardTitleCB = (value: string) => {
    dispatch({ type: "UPDATE_NEW_BOARD_TITLE", payload: value });
  };
  const updateNewBoardDescriptionCB = (value: string) => {
    dispatch({ type: "UPDATE_NEW_BOARD_DESCRIPTION", payload: value });
  };

  useEffect(() => {
    const fetchBoardData = async () => {
      await listBoard().then((res) => {
        if (res.error) {
          return console.log(res.error);
        }
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
        <BoardBox
          updateNewBoardCB={updateNewBoardCB}
          closeCB={closeModalCB}
          addBoardCB={addBoardCB}
          newBoard={state.newBoard}
          updateNewBoardTitleCB={updateNewBoardTitleCB}
          updateNewBoardDescriptionCB={updateNewBoardDescriptionCB}
        />
      </Modal>
    </div>
  );
}

export function BoardBox(props: {
  addBoardCB?: (board: Board) => void;
  updateBoardCB?: (board: Board) => void;
  closeCB?: () => void;
  newBoard: Board;
  updateNewBoardCB?: (board: Board) => void;
  updateNewBoardTitleCB?: (value: string) => void;
  updateNewBoardDescriptionCB?: (value: string) => void;
}) {
  return (
    <div className="w-full divide-y divide-gray-200">
      <h1 className="text-2xl text-gray-700 text-center my-2">Create Board</h1>
      <form
        className="py-4 flex flex-col gap-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          if (props.addBoardCB) {
            props.addBoardCB(props.newBoard);
          }
          if (props.updateBoardCB) {
            props.updateBoardCB(props.newBoard);
          }
        }}
      >
        <InputField
          value={props.newBoard.title}
          onValueChange={(value) => props.updateNewBoardTitleCB!(value)}
          label="Title"
          type="text"
        />
        <InputField
          onValueChange={(value) => props.updateNewBoardDescriptionCB!(value)}
          label="Description"
          type="text"
          value={props.newBoard.description}
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
