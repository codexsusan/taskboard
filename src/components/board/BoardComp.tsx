import React from "react";
import { Board } from "../../utils/boardUtils";
import Modal from "../../common/Modal";
import Button from "../../common/Buttons";
import { useNavigate } from "react-router-dom";
import { BoardBox } from "./Boards";

export function DeleteModal(props: {
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

export function BoardCard(props: {
  id: string;
  title: string;
  description: string;
}) {
  const navigate = useNavigate();

  const navigateToBoard = () => {
    navigate(`/board/${props.id}`);
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

export function UpdateBoard(props: {
  open: boolean;
  closeCB: () => void;
  boardData: Board;
  updateBoardCB?: (board: Board) => void;
  updateNewBoardTitleCB?: (value: string) => void;
  updateNewBoardDescriptionCB?: (value: string) => void;
}) {
  return (
    <Modal open={props.open} closeCB={props.closeCB}>
      <BoardBox
        closeCB={props.closeCB}
        updateBoardCB={props.updateBoardCB!}
        newBoard={props.boardData}
        updateNewBoardTitleCB={props.updateNewBoardTitleCB}
        updateNewBoardDescriptionCB={props.updateNewBoardDescriptionCB}
      />
    </Modal>
  );
}
