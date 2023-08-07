import Icon from "../../common/Icon";
import React, { useEffect, useReducer } from "react";
import Button from "../../common/Buttons";
import {
  Board,
  createBoard,
  getAllBoards,
  getAllBoardsByUser,
} from "../../utils/boardUtils";
import { BoardState, reducer } from "./reducer";
import { useLocation, useNavigate } from "react-router-dom";
import Modal from "../../common/Modal";
import { BoardPopUp } from "./BoardPopUp";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Boards() {
  const navigate = useNavigate();
  const location = useLocation();
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
    createBoard(board)
      .then((res) => {
        if (res.success) {
          dispatch({ type: "ADD_BOARD", payload: res.data });
          toast.success(res.message);
          closeModalCB();
        } else {
          toast.error(res.message);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
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
    if (location.pathname === "/") {
      navigate("/board");
    }
    const fetchBoardData = async () => {
      const userType = localStorage.getItem("userType");
      if (userType === "org") {
        await getAllBoards()
          .then((res) => {
            if (res.error) {
              return toast.error(res.message);
            }
            if (res.boardCount !== 0) {
              dispatch({ type: "INITIALIZE_STATE", data: res.data });
            } else {
              dispatch({ type: "INITIALIZE_STATE", data: [] });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else if (userType === "user") {
        await getAllBoardsByUser()
          .then((res) => {
            console.log(res);
            if (res.error) {
              return toast.error(res.message);
            }
            if (res.boardCount !== 0) {
              dispatch({ type: "INITIALIZE_STATE", data: res.data });
            } else {
              dispatch({ type: "INITIALIZE_STATE", data: [] });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    };
    fetchBoardData();
  }, [location.pathname, navigate]);
  return (
    <div className="flex flex-col gap-y-10 w-full px-[5rem] py-[2rem]">
      <div className="flex w-full justify-between">
        <div className="text-4xl opacity-60 text-[#0D062D] font-bold">
          My Boards
        </div>
        <div className="">
          <Button
            customClass="border"
            onClick={() => {
              openModalCB();
            }}
            title="Create"
            theme="white"
          >
            <div className="flex items-center gap-x-2">
              <Icon name="add" /> Create
            </div>
          </Button>
        </div>
      </div>
      <div className="flex w-full flex-wrap gap-10">
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
          state.boards &&
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
        <BoardPopUp
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

function BoardCard(props: { id: string; title: string; description: string }) {
  const navigate = useNavigate();
  const navigateToBoard = () => {
    navigate(`/board/${props.id}`);
  };
  return (
    <div
      onClick={navigateToBoard}
      className="w-72 flex cursor-pointer flex-col bg-[#B5B5B5]/[0.6] border rounded-xl pt-6 pb-4 px-4 gap-4 flex-initial"
    >
      <div className="flex text-[#0D062D]/[0.75] justify-between w-full items-start">
        <div className=" font-semibold text-xl">{props.title}</div>
        {/* <Icon name="vertical-detail" /> */}
      </div>
      <div className="w-full ">
        <div className="font-normal">
          {props.description.length > 50
            ? props.description.slice(0, 50)
            : props.description}
        </div>
      </div>
    </div>
  );
}

export default Boards;
