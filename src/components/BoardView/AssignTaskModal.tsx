import React from "react";
import Divider from "../../common/Divider";
import Button from "../../common/Buttons";

import { XMarkIcon } from "@heroicons/react/24/solid";
import Modal from "../../common/Modal";

function AssignTaskModal(props: { open: boolean; closeCB: () => void }) {
  return (
    <div className="w-full">
      <Modal open={props.open} closeCB={props.closeCB}>
        <div className="flex flex-col w-full gap-y-2">
          <div className="flex justify-between">
            <div className="text-xl font-semibold">Add Member?</div>
            <XMarkIcon
              className="h-6 w-6 cursor-pointer"
              //   onClick={props.closeCB}
            />
          </div>
          {/* <Divider /> */}
          <div>
            <label htmlFor={"addMember"} className="block mb-1">
              Email
            </label>
            <div className="w-full flex gap-x-2">
              <input
                onChange={(e) => {
                  //   setEmail(e.target.value);
                }}
                type={"text"}
                id={"addMember"}
                // value={email}
                className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder={"johndoe@gmail.com"}
              />
              {/* <Button onClick={handleAddMember} theme="light" title="Add" /> */}
            </div>
          </div>
          <Divider />
          <div>
            <div className="text-xl font-semibold">Members</div>
            <div className="flex flex-col gap-y-2 mt-2">
              {/* {currentMembers.map((member) => {
                return (
                  <MemberCard
                    key={member.id}
                    member={member}
                    handleRemoveMember={handleRemoveMember}
                  />
                );
              })} */}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default AssignTaskModal;
