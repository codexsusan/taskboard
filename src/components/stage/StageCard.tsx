import React from "react";
import IconButton from "../../common/IconButton";
import AddBtn from "./AddBtn";
import Divider from "../../common/Divider";
import { Stage } from "../../utils/stageUtils";

function StageCard(props: {
  stage: Stage;
  deleteStageCB: (id: string) => void;
}) {
  return (
    <div className="bg-slate-100 mt-5 px-4 py-2 rounded w-80 h-5/6">
      <div className="flex mb-2 items-center justify-between">
        <div className=" text-xl font-medium">{props.stage.title}</div>
        <div>
          <IconButton
            name="delete"
            onClick={() => props.deleteStageCB(props.stage.id)}
          />
        </div>
      </div>
      <Divider />
      <AddBtn />
    </div>
  );
}

export default StageCard;
