import React from "react";
import { Dialog } from "@headlessui/react";

import { Task } from "../utils/taskUtils";
import { IconButton } from "./IconButton";
import InputField from "./InputField";
import Button from "./Buttons";

export type Stage = {
  id: string;
  title: string;
  tasks: Task[];
};

function SideOversContent(props: {
  task: Task;
  deleteTaskCB: (stageId: Stage["id"], taskId: Task["id"]) => void;
  updateTaskCB: (task: Task) => void;
  stageId: Stage["id"];
}) {
  const [editController, setEditController] = React.useState(false);
  const [assignTaskController, setAssignTaskController] = React.useState(false);
  const [currentTask, setCurrentTask] = React.useState<Task>(props.task);
  return (
    <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
      <div className="flex gap-x-4 items-center justify-between px-4 sm:px-6">
        <div className="flex gap-x-4 items-center">
          <Dialog.Title className="text-2xl font-semibold leading-6 text-gray-900">
            {currentTask.title}
          </Dialog.Title>
          <div className="bg-[#c4c4c4] p-1 rounded">
            {currentTask.priority.charAt(0).toUpperCase() +
              currentTask.priority.slice(1)}
          </div>
          {!editController ? (
            <IconButton name="edit" onClick={() => setEditController(true)} />
          ) : (
            <IconButton
              name="cancel"
              onClick={() => {
                setEditController(false);
              }}
            />
          )}

          <IconButton
            name="delete"
            onClick={() =>
              props.deleteTaskCB(currentTask.stageId!, currentTask.id)
            }
          />
        </div>
        {assignTaskController ? (
          <IconButton
            name="cancel"
            onClick={() => {
              setAssignTaskController(false);
            }}
          />
        ) : (
          <IconButton
            onClick={() => {
              setAssignTaskController(true);
            }}
            name="user-plus"
          />
        )}
      </div>
      <div className="mt-6 flex-1 px-4 sm:px-6">
        {!editController && (
          <div className="text-gray-700">{currentTask.description}</div>
        )}
        {editController && (
          <form
            className=" transition-opacity ease-in duration-700 opacity-100 "
            action=""
          >
            <div className="mt-6 flex flex-col gap-6">
              <InputField
                value={currentTask.title}
                onValueChange={(value) => {
                  setCurrentTask({ ...currentTask, title: value });
                }}
                label="Title"
                type="text"
              />
              <InputField
                onValueChange={(value) => {
                  setCurrentTask({ ...currentTask, description: value });
                }}
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
                    setCurrentTask({
                      ...currentTask,
                      priority: e.target.value,
                    });
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
              <div className="flex gap-x-2 items-center w-full justify-between">
                <Button
                  customClass="w-1/2"
                  onClick={() => {
                    props.updateTaskCB(currentTask);
                    setEditController(false);
                  }}
                  theme="light"
                  children={"Update"}
                />
                <Button
                  customClass="w-1/2"
                  onClick={() => {
                    setEditController(false);
                  }}
                  theme="dark"
                  children={"Cancel"}
                />
              </div>
            </div>
          </form>
        )}
        {assignTaskController && (
          <div className="mt-8">
            <div className="text-2xl font-semibold">Assign Task</div>
            <div></div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SideOversContent;
