import React, { useEffect } from "react";
import Divider from "../../common/Divider";
import Button from "../../common/Buttons";

import { Task, allAssigned } from "../../utils/taskUtils";

import { XMarkIcon } from "@heroicons/react/24/solid";
import Modal from "../../common/Modal";
import { useParams } from "react-router-dom";
import { getAllUsersInBoard } from "../../utils/userUtils";
import { MemberType } from "./AddMemberModal";

function AssignTaskModal(props: {
  open: boolean;
  closeCB: () => void;
  task: Task;
}) {
  const { boardId } = useParams();
  const [boardMembers, setBoardMembers] = React.useState<MemberType[]>([]);
  const [assignedMembers, setAssignedMembers] = React.useState<MemberType[]>(
    []
  );
  const [unAssignedMembers, setUnAssignedMembers] = React.useState<
    MemberType[]
  >([]);

  useEffect(() => {
    getAllUsersInBoard(boardId!)
      .then((res) => {
        setBoardMembers(res.data);
      })
      .catch((err) => console.log(err));
  }, [boardId]);

  useEffect(() => {
    setUnAssignedMembers(
      boardMembers.filter((member) => {
        return !assignedMembers.includes(member);
      })
    );
  }, [assignedMembers, boardMembers]);

  useEffect(() => {
    allAssigned(boardId!, props.task.id)
      .then((res) => {
        setAssignedMembers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [boardId, props.task.id]);

  return (
    <div onClick={(e) => e.stopPropagation()} className="w-full">
      <Modal open={props.open} closeCB={props.closeCB}>
        <div className="flex flex-col w-full gap-y-2">
          <div className="flex w-full justify-between items-center">
            <div />
            <div className="text-xl font-semibold text-center">Assign Task</div>
            <XMarkIcon
              className="h-6 w-6 cursor-pointer item"
              onClick={props.closeCB}
            />
          </div>
          <Divider />
          <div className="">
            <div className="flex flex-col gap-y-2 mt-2">
              <div className="mb-2 flex flex-col gap-4">
                {unAssignedMembers.length !== 0 && (
                  <div className="text-xl font-semibold">Members</div>
                )}
                {unAssignedMembers.map((member) => {
                  return (
                    <div
                      key={member.id}
                      className="flex justify-between items-center bg-blue-gray-50 p-2 rounded"
                    >
                      <div className="flex gap-x-2 items-center">
                        <div className="text-gray-900 font-semibold">
                          {member.username}
                        </div>
                        <div className="text-gray-500">{member.email}</div>
                      </div>
                      <div>
                        <Button theme="white" title="Assign" />
                      </div>
                    </div>
                  );
                })}
              </div>
              {assignedMembers.length + unAssignedMembers.length === 0 && (
                <div className="text-center py-5">
                  You have no member in this board!!!
                </div>
              )}

              <div className="text-xl font-semibold">Assigned Members</div>
              {assignedMembers.map((member) => {
                return (
                  <div
                    key={member.id}
                    className="flex justify-between items-center bg-blue-gray-50 p-2 rounded"
                  >
                    <div className="flex gap-x-2 items-center">
                      <div className="text-gray-900 font-semibold">
                        {member.username}
                      </div>
                      <div className="text-gray-500">{member.email}</div>
                    </div>
                    <div>
                      <Button theme="blue" title="Remove" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default AssignTaskModal;
