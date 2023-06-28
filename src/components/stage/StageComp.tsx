import React from "react";
import IconButton from "../../common/IconButton";
import AddBtn from "./AddBtn";
import Divider from "../../common/Divider";
import { Stage } from "../../utils/stageUtils";
import Modal from "../../common/Modal";
import Button from "../../common/Buttons";
import InputField from "../../common/InputField";

export function AddStage(props: {
  open: boolean;
  newStage: Stage;
  closeCB: () => void;
  createStageCB: (stage: Stage) => void;
  updateNewStageTitleCB?: (title: string) => void;
  updateNewStageDescriptionCB?: (description: string) => void;
}) {
  return (
    <Modal open={props.open} closeCB={props.closeCB}>
      <StageCreateModal
        newStage={props.newStage}
        updateNewStageTitleCB={props.updateNewStageTitleCB}
        updateNewStageDescriptionCB={props.updateNewStageDescriptionCB}
        createStageCB={props.createStageCB}
        closeCB={props.closeCB}
      />
    </Modal>
  );
}

export function StageCard(props: {
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

export function StageCreateModal(props: {
  createStageCB: (stage: Stage) => void;
  closeCB?: () => void;
  newStage: Stage;
  updateNewStageTitleCB?: (title: string) => void;
  updateNewStageDescriptionCB?: (description: string) => void;
}) {
  return (
    <div className="w-full divide-y divide-gray-200">
      <h1 className="text-2xl text-gray-700 text-center my-2">Create Stage</h1>
      <form
        className="py-4 flex flex-col gap-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          props.createStageCB!(props.newStage);
          props.closeCB!();
        }}
      >
        <InputField
          value={props.newStage.title}
          onValueChange={props.updateNewStageTitleCB}
          label="Title"
          type="text"
        />
        <InputField
          onValueChange={props.updateNewStageDescriptionCB}
          label="Description"
          type="text"
          value={props.newStage.description}
        />
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
  );
}
