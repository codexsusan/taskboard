import React from "react";
import InputField from "../../common/InputField";
import Button from "../../common/Buttons";
import Modal from "../../common/Modal";

export function TaskComp() {
  return <div></div>;
}

export function TaskCard() {
  return <div>Task Card Here</div>;
}

export function AddTaskModal(props: { open: boolean; closeCB: () => void }) {
  return (
    <Modal open={props.open} closeCB={props.closeCB}>
      <div className="w-full divide-y divide-gray-200">
        <h1 className="text-2xl text-gray-700 text-center my-2">Create Task</h1>
        <form
          className="py-4 flex flex-col gap-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            //   props.createStageCB!(props.newStage);
            //   props.closeCB!();
          }}
        >
          <InputField
            //   value={props.newStage.title}
            //   onValueChange={props.updateNewStageTitleCB}
            label="Title"
            type="text"
          />
          <InputField
            //   onValueChange={props.updateNewStageDescriptionCB}
            label="Description"
            type="text"
            //   value={props.newStage.description}
          />
          <div className="flex items-center w-full justify-between">
            {/* <Button theme="dark" title="Cancel" onClick={props.closeCB} /> */}
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

export function AddTask() {
  return (
    <div className="w-full divide-y divide-gray-200">
      <h1 className="text-2xl text-gray-700 text-center my-2">Create Task</h1>
      <form
        className="py-4 flex flex-col gap-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          //   props.createStageCB!(props.newStage);
          //   props.closeCB!();
        }}
      >
        <InputField
          //   value={props.newStage.title}
          //   onValueChange={props.updateNewStageTitleCB}
          label="Title"
          type="text"
        />
        <InputField
          //   onValueChange={props.updateNewStageDescriptionCB}
          label="Description"
          type="text"
          //   value={props.newStage.description}
        />
        <div className="flex items-center w-full justify-between">
          {/* <Button theme="dark" title="Cancel" onClick={props.closeCB} /> */}
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
