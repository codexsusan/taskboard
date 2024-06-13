import React from 'react'
import { Board } from '../../utils/boardUtils';
import InputField from '../../common/InputField';
import Button from '../../common/Buttons';

export function BoardPopUp(props: {
    addBoardCB?: (board: Board) => void;
    updateBoardCB?: (board: Board) => void;
    closeCB?: () => void;
    newBoard: Board;
    updateNewBoardCB?: (board: Board) => void;
    updateNewBoardTitleCB?: (value: string) => void;
    updateNewBoardDescriptionCB?: (value: string) => void;
  }) {
    const [board, setBoard] = React.useState<Board>(props.newBoard);
    const type = props.addBoardCB ? "add" : "update";
    return (
      <div className="w-full divide-y divide-gray-200">
        <h1 className="text-2xl text-gray-700 text-center my-2">
          {type === "add" ? "Create Board" : "Update Board"}
        </h1>
        <form
          className="py-4 flex flex-col gap-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            if (props.addBoardCB) {
              props.addBoardCB(board);
            }
            if (props.updateBoardCB) {
              props.updateBoardCB(board);
            }
            props.closeCB!();
          }}
        >
          <InputField
            value={board.title}
            onValueChange={(value) => setBoard({ ...board, title: value })}
            label="Title"
            type="text"
          />
          <InputField
            onValueChange={(value) => setBoard({ ...board, description: value })}
            label="Description"
            type="text"
            value={board.description}
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
