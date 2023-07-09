import React from "react";
import MembersTable from "./MembersTable";

function Members() {
  return (
    <div className="flex flex-col gap-y-4">
      <div className="text-2xl text-[#0D062D] opacity-70 font-bold">
        All Members
      </div>
      <MembersTable />
    </div>
  );
}

export default Members;
