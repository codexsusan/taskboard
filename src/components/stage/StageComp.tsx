import React from "react";
import { Stage } from "../BoardView/reducer";
import Modal from "../../common/Modal";
import Button from "../../common/Buttons";
import InputField from "../../common/InputField";

export function AddStage(props: {
  open: boolean;
  closeCB: () => void;
  createStageCB?: (stage: Stage) => void;
}) {
  return (
    <Modal open={props.open} closeCB={props.closeCB}>
      <StageCreateModal
        createStageCB={props.createStageCB!}
        closeCB={props.closeCB}
      />
    </Modal>
  );
}

export function StageCreateModal(props: {
  createStageCB: (stage: Stage) => void;
  closeCB?: () => void;
}) {
  const [stage, setStage] = React.useState<Stage>({
    id: "",
    title: "",
    tasks: [],
  });

  const updateTitleCB = (value: string) => {
    setStage({
      ...stage,
      title: value,
    });
  };

  return (
    <div className="w-full divide-y divide-gray-200">
      <h1 className="text-2xl text-gray-700 text-center my-2">Create Stage</h1>
      <form
        className="py-4 flex flex-col gap-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          props.createStageCB(stage);
          props.closeCB!();
        }}
      >
        <InputField
          value={stage.title}
          onValueChange={updateTitleCB}
          label="Title"
          type="text"
        />
        {/* <InputField
          onValueChange={updateDescriptionCB}
          label="Description"
          type="text"
          value={stage.description}
        /> */}
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