import React from "react";
import { Board } from "../../utils/boardUtils";
import Modal from "../../common/Modal";
import Button from "../../common/Buttons";
import { BoardPopUp } from "./BoardPopUp";

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
      <BoardPopUp
        closeCB={props.closeCB}
        updateBoardCB={props.updateBoardCB!}
        newBoard={props.boardData}
        updateNewBoardTitleCB={props.updateNewBoardTitleCB}
        updateNewBoardDescriptionCB={props.updateNewBoardDescriptionCB}
      />
    </Modal>
  );
}

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
