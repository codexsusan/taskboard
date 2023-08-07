import React, { useState } from "react";
import InputField from "../../common/InputField";
import Modal from "../../common/Modal";
import { Task } from "../../utils/taskUtils";
import Button from "../../common/Buttons";
import { Stage } from "../BoardView/reducer";

type Props = {
  open: boolean;
  closeCB: () => void;
  stageId: Stage["id"];
  addTaskCB: (stageId: Stage["id"], task: Task) => void;
};

// TODO: Refactor this component to use add task and update task in the same component as board modal

export function AddTaskModal(props: Props) {
  const [task, setTask] = React.useState<Task>({
    id: "",
    title: "",
    description: "",
    priority: "",
  });

  return (
    <Modal open={props.open} closeCB={props.closeCB}>
      <div className="w-full divide-y divide-gray-200">
        <h1 className="text-2xl text-gray-700 text-center my-2">Create Task</h1>
        <form
          className="py-4 flex flex-col gap-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            props.addTaskCB(props.stageId, task);
            props.closeCB();
            setTask({
              id: "",
              title: "",
              description: "",
              priority: "",
            });
          }}
        >
          <InputField
            value={task.title}
            onValueChange={(value) => {
              setTask({ ...task, title: value });
            }}
            label="Title"
            type="text"
          />
          <InputField
            onValueChange={(value) => {
              setTask({ ...task, description: value });
            }}
            label="Description"
            type="text"
            value={task.description}
          />
          <div className="w-full">
            <label htmlFor="priority" className="block mb-1">
              Priority
            </label>
            <select
              value={task.priority}
              onChange={(event) => {
                setTask({ ...task, priority: event.target.value });
              }}
              className="p-2 rounded w-full"
              name="priority"
              id="priority"
            >
              <option value="" disabled>
                Select one Option
              </option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
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
    </Modal>
  );
}

export function UpdateTaskModal(props: {
  open: boolean;
  closeCB: () => void;
  task: Task;
  updateTaskCB: (task: Task) => void;
}) {
  const [currentTask, setCurrentTask] = useState<Task>(props.task);
  return (
    <Modal open={props.open} closeCB={props.closeCB}>
      <div className="w-full divide-y divide-gray-200">
        <h1 className="text-2xl text-gray-700 text-center my-2">Update Task</h1>
        <form
          className="py-4 flex flex-col gap-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            props.updateTaskCB(currentTask);
            props.closeCB();
          }}
        >
          <InputField
            value={currentTask.title}
            onValueChange={(value) =>
              setCurrentTask({ ...currentTask, title: value })
            }
            label="Title"
            type="text"
          />
          <InputField
            onValueChange={(value) =>
              setCurrentTask({ ...currentTask, description: value })
            }
            label="Description"
            type="text"
            value={currentTask.description}
          />
          <div className="w-full">
            <label htmlFor="priority" className="block mb-1">
              Priority
            </label>
            <select
              value={currentTask.priority}
              onChange={(e) => {
                setCurrentTask({ ...currentTask, priority: e.target.value });
              }}
              className="p-2 rounded w-full"
              name="priority"
              id="priority"
            >
              <option value="" disabled>
                Select one Option
              </option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div className="flex items-center w-full justify-between">
            <Button theme="dark" title="Cancel" onClick={props.closeCB} />
            <div className="flex my-2">
              <button
                className="bg-slate-100 text-[#030711] hover:bg-slate-200 px-4 py-2 rounded-md "
                type="submit"
              >
                Update
              </button>
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
}
