import React, { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import Icon from "./Icon";
import { Task } from "../utils/taskUtils";
import { Stage } from "../components/BoardView/reducer";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

function DropdownModal(props: {
  task: Task;
  stageId: Stage["id"];
  openTaskModalCB: () => void;

  deleteTaskCB: (stageId: Stage["id"], taskId: Task["id"]) => void;
}) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button onClick={(e) => e.stopPropagation()}>
        <Icon name="detail" />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          onClick={(e) => e.stopPropagation()}
          className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        >
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <div
                  onClick={props.openTaskModalCB}
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block px-4 py-2 text-sm"
                  )}
                >
                  <div className="flex gap-x-4 items-center">
                    <Icon name="edit" />
                    <div>Edit Task</div>
                  </div>
                </div>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <div
                  onClick={() =>
                    props.deleteTaskCB!(props.stageId, props.task.id)
                  }
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block px-4 py-2 text-sm"
                  )}
                >
                  <div className="flex gap-x-4 items-center">
                    <Icon name="delete" />
                    <div>Delete Task</div>
                  </div>
                </div>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

export default DropdownModal;
