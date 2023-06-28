import React from "react";

function AddBtn() {
  return (
    <div
      onClick={() => {}}
      className="bg-white flex justify-center mt-3 p-2 rounded"
    >
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path
            fillRule="evenodd"
            d="M12 5.25a.75.75 0 01.75.75v5.25H18a.75.75 0 010 1.5h-5.25V18a.75.75 0 01-1.5 0v-5.25H6a.75.75 0 010-1.5h5.25V6a.75.75 0 01.75-.75z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <div>Add Task</div>
    </div>
  );
}

export default AddBtn;
