import React, { useEffect } from "react";
import Modal from "../../common/Modal";
import { XMarkIcon } from "@heroicons/react/24/solid";
import Divider from "../../common/Divider";
import Button from "../../common/Buttons";
import { addMember, removeMember } from "../../utils/boardUtils";
import { allBoardMembers, allOrgUsers } from "../../utils/userUtils";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type MemberType = {
  id: string;
  username: string;
  email: string;
  orgId: string;
};

function AddMemberModal(props: {
  open: boolean;
  closeCB: () => void;
  boardId: string;
}) {
  const [email, setEmail] = React.useState<string>("");
  const [currentMembers, setCurrentMembers] = React.useState<MemberType[]>([]);
  // const [orgMembers, setOrgMembers] = React.useState<MemberType[]>([]);
  // const [members, setMembers] = React.useState<MemberType[]>([]);

  useEffect(() => {
    allBoardMembers(props.boardId)
      .then((res) => {
        setCurrentMembers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    // allOrgUsers()
    //   .then((res) => {
    //     setOrgMembers(res.data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }, [props.boardId]);

  const handleAddMember: () => void = () => {
    addMember(props.boardId, email)
      .then((res) => {
        if (!res.success) {
          return toast.error(res.message);
        }
        setCurrentMembers([
          ...currentMembers,
          {
            ...res.data,
          },
        ]);
        setEmail("");
        toast.success(res.message);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // TODO: Delete member is not working properly
  const handleRemoveMember: (memberId: string) => void = (memberId) => {
    removeMember(props.boardId, memberId)
      .then((res) => {
        console.log(res);
        if (!res.success) {
          return toast.error(res.message);
        }
        setCurrentMembers(
          currentMembers.filter((member) => member.id !== memberId)
        );
        toast.success(res.message);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="w-full">
      <Modal open={props.open} closeCB={props.closeCB}>
        <div className="flex flex-col w-full gap-y-2">
          <div className="flex justify-between">
            <div className="text-xl font-semibold">Add Member?</div>
            <XMarkIcon
              className="h-6 w-6 cursor-pointer"
              onClick={props.closeCB}
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
                  setEmail(e.target.value);
                }}
                type={"text"}
                id={"addMember"}
                value={email}
                className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder={"johndoe@gmail.com"}
              />
              <Button onClick={handleAddMember} theme="light" title="Add" />
            </div>
          </div>
          <Divider />
          <div>
            <div className="text-xl font-semibold">Members</div>
            <div className="flex flex-col gap-y-2 mt-2">
              {currentMembers.map((member) => {
                return (
                  <MemberCard
                    key={member.id}
                    member={member}
                    handleRemoveMember={handleRemoveMember}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

function MemberCard(props: {
  member: MemberType;
  handleRemoveMember: (memberId: string) => void;
}) {
  return (
    <div
      key={props.member.id}
      className="flex justify-between items-center bg-blue-gray-50 p-2 rounded"
    >
      <div className="flex gap-x-2 items-center">
        <div className="text-gray-900 font-semibold">
          {props.member.username}
        </div>
        <div className="text-gray-500">{props.member.email}</div>
      </div>
      <div>
        <Button
          theme="white"
          title="Remove"
          onClick={() => {
            props.handleRemoveMember(props.member.id);
          }}
        />
      </div>
    </div>
  );
}

export default AddMemberModal;
