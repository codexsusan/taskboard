import React from "react";
import InputField from "../../common/InputField";
import Modal from "../../common/Modal";
import { Task } from "../../utils/taskUtils";
import Button from "../../common/Buttons";
import DropdownModal from "../../common/DropdownModal";
import Icon from "../../common/Icon";

export function TaskComp() {
  return <div></div>;
}

export function TaskCard(props: { task: Task }) {
  return (
    <div className="bg-[#DBDBDB] rounded my-2 p-3">
      <div className="">
        <div className="flex items-center justify-between">
          <div className="bg-[#c4c4c4] p-1 rounded">
            {props.task.priority.charAt(0).toUpperCase() +
              props.task.priority.slice(1)}
          </div>
            <DropdownModal />
        </div>
      </div>
      <div className="my-1">
        <h1 className="text-lg font-semibold">{props.task.title}</h1>
        <div>{props.task.description}</div>
      </div>
      <div className="flex gap-x-2 items-center my-2 justify-end">
          <Icon name="comment" />
          <div className="text-[#787486]">
            Comment
          </div>
      </div>
    </div>
  );
}

type Props = {
  open: boolean;
  closeCB: () => void;
  newTask: Task;
  updateTitleCB: (title: string) => void;
  updateDescriptionCB: (description: string) => void;
  updatePriorityCB: (priority: string) => void;
  createTaskCB: () => void;
};

export function AddTaskModal(props: Props) {
  return (
    <Modal open={props.open} closeCB={props.closeCB}>
      <div className="w-full divide-y divide-gray-200">
        <h1 className="text-2xl text-gray-700 text-center my-2">Create Task</h1>
        <form
          className="py-4 flex flex-col gap-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            props.createTaskCB();
            props.closeCB();
          }}
        >
          <InputField
            value={props.newTask.title}
            onValueChange={props.updateTitleCB}
            label="Title"
            type="text"
          />
          <InputField
            onValueChange={props.updateDescriptionCB}
            label="Description"
            type="text"
            value={props.newTask.description}
          />
          <div className="w-full">
            <label htmlFor="priority" className="block mb-1">
              Priority
            </label>
            <select
              value={props.newTask.priority}
              onChange={(e) => {
                props.updatePriorityCB(e.target.value);
              }}
              className="p-2 rounded w-full"
              name="priority"
              id="priority"
            >
              <option value="" disabled>Select one Option</option>
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

export function UpdateTaskModal(props: Props) {
  return (
    <Modal open={props.open} closeCB={props.closeCB}>
      <div className="w-full divide-y divide-gray-200">
        <h1 className="text-2xl text-gray-700 text-center my-2">Create Task</h1>
        <form
          className="py-4 flex flex-col gap-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            props.createTaskCB();
            props.closeCB();
          }}
        >
          <InputField
            value={props.newTask.title}
            onValueChange={props.updateTitleCB}
            label="Title"
            type="text"
          />
          <InputField
            onValueChange={props.updateDescriptionCB}
            label="Description"
            type="text"
            value={props.newTask.description}
          />
          <div className="w-full">
            <label htmlFor="priority" className="block mb-1">
              Priority
            </label>
            <select
              value={props.newTask.priority}
              onChange={(e) => {
                props.updatePriorityCB(e.target.value);
              }}
              className="p-2 rounded w-full"
              name="priority"
              id="priority"
            >
              <option value="" disabled>Select one Option</option>
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
