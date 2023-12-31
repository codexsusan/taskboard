import React, { useEffect, useReducer } from "react";
import {
  Board,
  deleteBoard,
  getBoard,
  updateBoard,
} from "../../utils/boardUtils";
import { UserPlusIcon } from "@heroicons/react/24/solid";
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
import {
  Task,
  createTask,
  deleteTask,
  updateTask,
  updateTaskStage,
} from "../../utils/taskUtils";
import { DeleteModal, UpdateBoard } from "../board/BoardComp";
import { AddStage } from "../stage/StageComp";
import AddMemberModal from "./AddMemberModal";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// const AddMemberModal = React.lazy(() => import("./AddMemberModal"));

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

const enableAddMember = (
  modalStatus: ModalState,
  setModalStatus: (value: ModalState) => void
) => {
  setModalStatus({ ...modalStatus, addMember: true });
};

const disableAddMember = (
  modalStatus: ModalState,
  setModalStatus: (value: ModalState) => void
) => {
  setModalStatus({ ...modalStatus, addMember: false });
};

type ModalState = {
  updateBoard: boolean;
  deleteBoard: boolean;
  createStage: boolean;
  addMember: boolean;
};

function BoardView() {
  const { boardId } = useParams();
  const navigate = useNavigate();

  const [modalStatus, setModalStatus] = React.useState<ModalState>({
    updateBoard: false,
    deleteBoard: false,
    createStage: false,
    addMember: false,
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
      .catch((err) => toast.error(err.message));
    getAllStage(boardId!)
      .then((res) => {
        dispatch({
          type: "INITIALIZE_STAGE",
          payload: res.data,
        });
      })
      .catch((err) => toast.error(err.message));
  }, [boardId, navigate]);

  const updateBoardCB = (board: Board) => {
    dispatch({ type: "UPDATE_BOARD", payload: board });
    updateBoard(board)
      .then((res) => {
        if (res.success) {
          toast.success(res.message);
        } else {
          toast.error(res.message);
        }
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const deleteBoardCB = () => {
    deleteBoard(boardId!)
      .then((res) => {
        if (res.success) {
          navigate("/board");
          toast.success(res.message);
        } else {
          toast.error(res.message);
        }
      })
      .catch((err) => {
        toast.error(err.message);
      });
    disableDeleteBoard(modalStatus, setModalStatus);
  };

  const createStageCB = (stage: Stage) => {
    createStage(stage, boardId!)
      .then((res) => {
        if (res.success) {
          dispatch({
            type: "ADD_STAGE",
            payload: {
              id: res.data.id,
              title: res.data.title,
              tasks: [],
            },
          });
          toast.success(res.message);
        } else {
          toast.error(res.message);
        }
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const UpdateStageTitleCB = (id: Stage["id"], title: Stage["title"]) => {
    dispatch({
      type: "UPDATE_STAGE_TITLE",
      payload: { title, id },
    });
    updateStageTitle(id, title, boardId!)
      .then((res) => {
        if (res.success) {
          toast.success(res.message);
        } else {
          toast.error(res.message);
        }
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const deleteStageCB = (id: Stage["id"]) => {
    deleteStage(id, boardId!)
      .then((res) => {
        if (res.success) {
          dispatch({
            type: "DELETE_STAGE",
            payload: id,
          });
          toast.success(res.message);
        } else {
          toast.error(res.message);
        }
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const addTaskCB = (stageId: Stage["id"], task: Task) => {
    createTask(boardId!, stageId, task)
      .then((res) => {
        if (res.success) {
          dispatch({
            type: "ADD_TASK",
            payload: {
              stageId,
              task: res.data,
            },
          });
          toast.success(res.message);
        } else {
          toast.error(res.message);
        }
      })
      .catch((err) => toast.error(err.message));
  };

  const updateTaskCB = (task: Task) => {
    dispatch({ type: "UPDATE_TASK", payload: task });
    updateTask(boardId!, task)
      .then((res) => {
        toast.success(res.message);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const deleteTaskCB = (stageId: Stage["id"], taskId: Task["id"]) => {
    deleteTask(boardId!, stageId, taskId)
      .then((res) => {
        if (res.success) {
          dispatch({ type: "DELETE_TASK", payload: { stageId, taskId } });
          toast.success(res.message);
        } else {
          toast.error(res.message);
        }
      })
      .catch((err) => toast.error(err.message));
  };

  const switchStage = (
    source: Stage["id"],
    destination: Stage["id"],
    task: Task
  ) => {
    updateTaskStage(boardId!, task.id, source, destination)
      .then((res) => {
        dispatch({
          type: "SWITCH_STAGE",
          payload: {
            source,
            destination,
            task: {
              ...task,
              stageId: destination,
            },
          },
        });
      })
      .catch((err) => toast.error(err.message));
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
          <Button
            onClick={() => {
              enableAddMember(modalStatus, setModalStatus);
            }}
            theme="light"
          >
            <div className="flex gap-x-4 items-center ">
              <UserPlusIcon className="h-5 w-5" /> Assign Member
            </div>
          </Button>
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
      <div className="flex w-full gap-x-4 h-full">
        {state.board.stageOrder &&
          state.board.stageOrder.map((stageId) => {
            const stageData =
              state.stage &&
              state.stage.find((currentStage) => currentStage.id === stageId);
            return (
              stageData && (
                <StageCol
                  stageCount={state.stage.length}
                  switchStage={switchStage}
                  deleteTaskCB={deleteTaskCB}
                  addTaskCB={addTaskCB}
                  updateTaskCB={updateTaskCB}
                  updateStageTitleCB={UpdateStageTitleCB}
                  deleteStageCB={deleteStageCB}
                  key={stageData.id}
                  stage={stageData}
                />
              )
            );
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
      />
      <DeleteModal
        deleteBoardCB={deleteBoardCB}
        open={modalStatus.deleteBoard}
        closeCB={() => disableDeleteBoard(modalStatus, setModalStatus)}
      />
      <AddMemberModal
        boardId={boardId!}
        open={modalStatus.addMember}
        closeCB={() => {
          disableAddMember(modalStatus, setModalStatus);
        }}
      />
    </div>
  );
}

export default BoardView;
