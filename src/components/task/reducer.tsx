import { Task } from "../../utils/taskUtils";
export type Stage = {
  id: string;
  title: string;
  tasks: Task[];
};

export type MemberType = {
  id: string;
  username: string;
  email: string;
  orgId: string;
  image?: string;
};

type TaskDetailType = {
  editController: boolean;
  assignTaskController: boolean;
  currentTask: Task;
  boardMembers: MemberType[];
  assignedMembers: MemberType[];
  unAssignedMembers: MemberType[];
};

type InitializeState = {
  type: "INITIALIZE_STATE";
};

type EnableEditController = {
  type: "ENABLE_EDIT";
};

type DisableEditController = {
  type: "DISABLE_EDIT";
};

type EnableAssignController = {
  type: "ENABLE_ASSIGN";
};

type DisableAssignController = {
  type: "DISABLE_ASSIGN";
};

type UpdateCurrentTitle = {
  type: "UPDATE_TITLE";
  payload: string;
};

type UpdateCurrentDescription = {
  type: "UPDATE_DESC";
  payload: string;
};

type UpdateTask = {
  type: "UPDATE_TASK";
  payload: Task;
};

type UpdateCurrentPriority = {
  type: "UPDATE_PRIORITY";
  payload: string;
};

type InitializeBoardMembers = {
  type: "INITIALIZE_BOARD_MEMBERS";
  payload: MemberType[];
};

type InitializeAssignedMembers = {
  type: "INITIALIZE_ASSIGNED_MEMBERS";
  payload: MemberType[];
};

type InitializeUnAssignedMembers = {
  type: "INITIALIZE_UNASSIGNED_MEMBERS";
  payload: MemberType[];
};

type AssignMember = {
  type: "ASSIGN_MEMBER";
  payload: MemberType;
};

type UnAssignMember = {
  type: "UNASSIGN_MEMBER";
  payload: MemberType;
};

type TaskDetailAction =
  | InitializeState
  | EnableEditController
  | DisableEditController
  | EnableAssignController
  | DisableAssignController
  | UpdateCurrentTitle
  | UpdateCurrentDescription
  | UpdateTask
  | UpdateCurrentPriority
  | InitializeBoardMembers
  | InitializeAssignedMembers
  | InitializeUnAssignedMembers
  | AssignMember
  | UnAssignMember;

export const reducer = (state: TaskDetailType, action: TaskDetailAction) => {
  switch (action.type) {
    case "INITIALIZE_STATE":
      return state;
    case "ENABLE_EDIT":
      return {
        ...state,
        editController: true,
      };
    case "DISABLE_EDIT":
      return {
        ...state,
        editController: false,
      };
    case "ENABLE_ASSIGN":
      return {
        ...state,
        assignTaskController: true,
      };

    case "DISABLE_ASSIGN":
      return {
        ...state,
        assignTaskController: false,
      };
    case "UPDATE_TITLE":
      return {
        ...state,
        currentTask: {
          ...state.currentTask,
          title: action.payload,
        },
      };
    case "UPDATE_DESC":
      return {
        ...state,
        currentTask: {
          ...state.currentTask,
          description: action.payload,
        },
      };
    case "UPDATE_PRIORITY":
      return {
        ...state,
        currentTask: {
          ...state.currentTask,
          priority: action.payload,
        },
      };
    case "UPDATE_TASK":
      return {
        ...state,
        currentTask: action.payload,
      };
    case "INITIALIZE_BOARD_MEMBERS":
      return {
        ...state,
        boardMembers: action.payload,
      };
    case "INITIALIZE_ASSIGNED_MEMBERS":
      return {
        ...state,
        assignedMembers: action.payload,
      };
    case "INITIALIZE_UNASSIGNED_MEMBERS":
      return {
        ...state,
        unAssignedMembers: action.payload,
      };
    case "ASSIGN_MEMBER":
      return {
        ...state,
        assignedMembers: [...state.assignedMembers, action.payload],
        unAssignedMembers: state.unAssignedMembers.filter(
          (member) => member.id !== action.payload.id
        ),
      };

    case "UNASSIGN_MEMBER":
      return {
        ...state,
        unAssignedMembers: [...state.unAssignedMembers, action.payload],
        assignedMembers: state.assignedMembers.filter(
          (member) => member.id !== action.payload.id
        ),
      };

    default:
      return state;
  }
};
