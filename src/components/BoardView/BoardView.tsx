import React, { useEffect, useReducer } from "react";
import {
  Board,
  deleteBoard,
  getBoard,
  updateBoard,
} from "../../utils/boardUtils";
import { useNavigate, useParams } from "react-router-dom";
import {
  createStage,
  deleteStage,
  getAllStage,
  updateStageTitle,
} from "../../utils/stageUtils";
import { IconButton } from "../../common/IconButton";
import Button from "../../common/Buttons";
import Divider from "../../common/Divider";
import StageCol from "./StageCol";
import { Stage, reducer } from "./reducer";
import { AddStage } from "../stage/StageComp";
import {
  Task,
  createTask,
  deleteTask,
  updateTask,
} from "../../utils/taskUtils";
import { DeleteModal, UpdateBoard } from "../board/BoardComp";

// const openStageModalCB = (setCreateStageModal: (value: boolean) => void) => {
//   setCreateStageModal(true);
// };

// const closeStageModalCB = (setCreateStageModal: (value: boolean) => void) => {
//   setCreateStageModal(false);
// };

// const enableDeleteBoard = (setDeleteBoardModal: (value: boolean) => void) => {
//   setDeleteBoardModal(true);
// };

// const disableDeleteBoard = (setDeleteBoardModal: (value: boolean) => void) => {
//   setDeleteBoardModal(false);
// };

const enableUpdateBoard = (
  modalStatus: ModalState,
  setModalStatus: (value: ModalState) => void
) => {
  setModalStatus({ ...modalStatus, updateBoard: true });
};

const disableUpdateBoard = (
  modalStatus: ModalState,
  setModalStatus: (value: ModalState) => void
) => {
  setModalStatus({ ...modalStatus, updateBoard: false });
};

const enableDeleteBoard = (
  modalStatus: ModalState,
  setModalStatus: (value: ModalState) => void
) => {
  setModalStatus({ ...modalStatus, deleteBoard: true });
};

const disableDeleteBoard = (
  modalStatus: ModalState,
  setModalStatus: (value: ModalState) => void
) => {
  setModalStatus({ ...modalStatus, deleteBoard: false });
};

const enableCreateStage = (
  modalStatus: ModalState,
  setModalStatus: (value: ModalState) => void
) => {
  setModalStatus({ ...modalStatus, createStage: true });
};

const disableCreateStage = (
  modalStatus: ModalState,
  setModalStatus: (value: ModalState) => void
) => {
  setModalStatus({ ...modalStatus, createStage: false });
};

type ModalState = {
  updateBoard: boolean;
  deleteBoard: boolean;
  createStage: boolean;
};

function BoardView() {
  const { boardId } = useParams();
  const navigate = useNavigate();
  const [modalStatus, setModalStatus] = React.useState<ModalState>({
    updateBoard: false,
    deleteBoard: false,
    createStage: false,
  });

  const [state, dispatch] = useReducer(reducer, {
    board: {} as Board,
    stage: [],
  });

  useEffect(() => {
    getBoard(boardId!)
      .then((res) => {
        if (!res.success) {
          return navigate("/board");
        }
        dispatch({
          type: "INITIALIZE_BOARD",
          payload: res.data,
        });
      })
      .catch((err) => console.log(err));
    getAllStage(boardId!)
      .then((res) => {
        dispatch({
          type: "INITIALIZE_STAGE",
          payload: res.data,
        });
      })
      .catch((err) => console.log(err));
  }, [boardId, navigate]);

  const updateBoardCB = (board: Board) => {
    dispatch({ type: "UPDATE_BOARD", payload: board });
    updateBoard(board)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteBoardCB = () => {
    deleteBoard(boardId!)
      .then((res) => {
        if (res.success) {
          navigate("/board");
        } else {
          alert("Board not deleted");
        }
      })
      .catch((err) => {});
  };

  const createStageCB = (stage: Stage) => {
    createStage(stage, boardId!)
      .then((res) => {
        res.success
          ? dispatch({
              type: "ADD_STAGE",
              payload: {
                id: res.data.id,
                title: res.data.title,
                description: res.data.description,
                tasks: [],
              },
            })
          : console.log("not created");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const UpdateStageTitleCB = (id: Stage["id"], title: Stage["title"]) => {
    dispatch({
      type: "UPDATE_STAGE_TITLE",
      payload: { title, id },
    });
    updateStageTitle(id, title, boardId!)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteStageCB = (id: Stage["id"]) => {
    deleteStage(id, boardId!)
      .then((res) => {
        res.success
          ? dispatch({
              type: "DELETE_STAGE",
              payload: id,
            })
          : console.log("not deleted");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addTaskCB = (stageId: Stage["id"], task: Task) => {
    createTask(stageId, task)
      .then((res) => {
        if (res.success) {
          dispatch({
            type: "ADD_TASK",
            payload: {
              stageId,
              task: res.data,
            },
          });
        }
      })
      .catch((err) => console.log(err));
  };

  const updateTaskCB = (task: Task) => {
    dispatch({ type: "UPDATE_TASK", payload: task });
    updateTask(task)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteTaskCB = (stageId: Stage["id"], taskId: Task["id"]) => {
    deleteTask(stageId, taskId)
      .then((res) => {
        if (res.success) {
          dispatch({ type: "DELETE_TASK", payload: { stageId, taskId } });
        } else {
          alert("Task not deleted");
        }
      })
      .catch((err) => console.log(err));
  };

  const switchStage = (
    source: Stage["id"],
    destination: Stage["id"],
    task: Task
  ) => {
    addTaskCB(destination, task);
    deleteTaskCB(source, task.id);
  };

  return (
    <div className="px-8 w-full">
      <div className="flex justify-between items-center">
        <div className="flex my-5 gap-x-4 items-center">
          <div className="text-2xl font-semibold">{state.board.title}</div>
          <IconButton
            name="edit"
            onClick={() => enableUpdateBoard(modalStatus, setModalStatus)}
          />
          <IconButton
            name="delete"
            onClick={() => enableDeleteBoard(modalStatus, setModalStatus)}
          />
        </div>
        <div>
          <Button
            onClick={() => {
              enableCreateStage(modalStatus, setModalStatus);
            }}
            title="New Stage"
            theme="light"
          />
        </div>
      </div>
      <Divider />
      <div className="flex gap-x-4 h-full">
        {state.board.stageOrder &&
          state.board.stageOrder.map((stage) => {
            const stageData = state.stage.find((s) => s.id === stage);
            return stageData ? (
              <StageCol
                switchStage={switchStage}
                deleteTaskCB={deleteTaskCB}
                addTaskCB={addTaskCB}
                updateTaskCB={updateTaskCB}
                updateStageTitleCB={UpdateStageTitleCB}
                deleteStageCB={deleteStageCB}
                key={stageData.id}
                stage={stageData}
              />
            ) : null;
          })}
      </div>
      <AddStage
        open={modalStatus.createStage}
        closeCB={() => {
          disableCreateStage(modalStatus, setModalStatus);
        }}
        createStageCB={createStageCB}
      />
      <UpdateBoard
        open={modalStatus.updateBoard}
        closeCB={() => disableUpdateBoard(modalStatus, setModalStatus)}
        boardData={state.board}
        updateBoardCB={updateBoardCB}
        // updateNewBoardTitleCB={updateBoardTitleCB}
        // updateNewBoardDescriptionCB={updateBoardDescriptionCB}
      />
      <DeleteModal
        deleteBoardCB={deleteBoardCB}
        open={modalStatus.deleteBoard}
        closeCB={() => disableDeleteBoard(modalStatus, setModalStatus)}
      />
    </div>
  );
}

export default BoardView;
