import React from "react";

type Props = {
  name: string;
  stroke?: string;
};

function Icon(props: Props) {
  switch (props.name) {
    case "edit":
      return <EditIcon {...props} />;
    case "delete":
      return <DeleteIcon {...props} />;
    case "add":
      return <AddIcon {...props} />;
    case "roundedadd":
      return <RoundedAddIcon {...props} />;
    case "detail":
      return <HorizontalDetail {...props} />;
    case "vertical-detail":
      return <VerticalDetail {...props} />;
    case "comment":
      return <Comment {...props} />;
    case "check":
      return <Check {...props} />;
    case "cancel":
      return <Cancel {...props} />;
    case "home":
      return <Home {...props} />;
    case "board":
      return <BoardIcon {...props} />;
    case "tasksquare":
      return <TaskSquare {...props} />;
    case "user-plus":
      return <UserPlus {...props} />;
    default:
      return <></>;
  }
}

function AddIcon(props: Props) {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 4.5v15m7.5-7.5h-15"
        />
      </svg>
    </>
  );
}

function RoundedAddIcon(props: Props) {
  return (
    <svg
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      strokeWidth={1.5}
      viewBox="0 0 24 24"
      className="w-6 h-6"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M13.0122 0.791504C15.8835 0.791504 17.8128 2.80709 17.8128 5.80671V12.7971C17.8128 15.7968 15.8835 17.8123 13.0122 17.8123H5.59266C2.72128 17.8123 0.791992 15.7968 0.791992 12.7971V5.80671C0.791992 2.80709 2.72128 0.791504 5.59266 0.791504H13.0122ZM13.0122 1.979H5.59266C3.39816 1.979 1.97949 3.4808 1.97949 5.80671V12.7971C1.97949 15.123 3.39816 16.6248 5.59266 16.6248H13.0122C15.2075 16.6248 16.6253 15.123 16.6253 12.7971V5.80671C16.6253 3.4808 15.2075 1.979 13.0122 1.979ZM9.30241 5.80062C9.63016 5.80062 9.89616 6.06662 9.89616 6.39437V8.70025L12.2051 8.70041C12.5328 8.70041 12.7988 8.96641 12.7988 9.29416C12.7988 9.62191 12.5328 9.88791 12.2051 9.88791L9.89616 9.88775V12.1949C9.89616 12.5227 9.63016 12.7887 9.30241 12.7887C8.97466 12.7887 8.70866 12.5227 8.70866 12.1949V9.88775L6.39976 9.88791C6.07122 9.88791 5.80601 9.62191 5.80601 9.29416C5.80601 8.96641 6.07122 8.70041 6.39976 8.70041L8.70866 8.70025V6.39437C8.70866 6.06662 8.97466 5.80062 9.30241 5.80062Z"
        fill="#787486"
      />
    </svg>
  );
}

function EditIcon(props: Props) {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
        />
      </svg>
    </>
  );
}

function DeleteIcon(props: Props) {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke={props.stroke ? props.stroke : "currentColor"}
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
        />
      </svg>
    </>
  );
}

function HorizontalDetail(props: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={props.stroke ? props.stroke : "currentColor"}
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
      />
    </svg>
  );
}

function VerticalDetail(props: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
      />
    </svg>
  );
}

function Comment(props: Props) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 16 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.99967 15.4568C7.53967 15.4568 7.10634 15.2235 6.79967 14.8168L5.79967 13.4835C5.77967 13.4568 5.69967 13.4235 5.66634 13.4168H5.33301C2.55301 13.4168 0.833008 12.6635 0.833008 8.91683V5.5835C0.833008 2.63683 2.38634 1.0835 5.33301 1.0835H10.6663C13.613 1.0835 15.1663 2.63683 15.1663 5.5835V8.91683C15.1663 11.8635 13.613 13.4168 10.6663 13.4168H10.333C10.2797 13.4168 10.233 13.4435 10.1997 13.4835L9.19967 14.8168C8.89301 15.2235 8.45967 15.4568 7.99967 15.4568ZM5.33301 2.0835C2.94634 2.0835 1.83301 3.19683 1.83301 5.5835V8.91683C1.83301 11.9302 2.86634 12.4168 5.33301 12.4168H5.66634C6.00634 12.4168 6.39301 12.6102 6.59967 12.8835L7.59967 14.2168C7.83301 14.5235 8.16634 14.5235 8.39967 14.2168L9.39968 12.8835C9.61967 12.5902 9.96634 12.4168 10.333 12.4168H10.6663C13.053 12.4168 14.1663 11.3035 14.1663 8.91683V5.5835C14.1663 3.19683 13.053 2.0835 10.6663 2.0835H5.33301Z"
        fill="#787486"
      />
      <path
        d="M7.99967 8.24984C7.62634 8.24984 7.33301 7.94984 7.33301 7.58317C7.33301 7.2165 7.63301 6.9165 7.99967 6.9165C8.36634 6.9165 8.66634 7.2165 8.66634 7.58317C8.66634 7.94984 8.37301 8.24984 7.99967 8.24984Z"
        fill="#787486"
      />
      <path
        d="M10.6667 8.24984C10.2933 8.24984 10 7.94984 10 7.58317C10 7.2165 10.3 6.9165 10.6667 6.9165C11.0333 6.9165 11.3333 7.2165 11.3333 7.58317C11.3333 7.94984 11.04 8.24984 10.6667 8.24984Z"
        fill="#787486"
      />
      <path
        d="M5.33366 8.24984C4.96033 8.24984 4.66699 7.94984 4.66699 7.58317C4.66699 7.2165 4.96699 6.9165 5.33366 6.9165C5.70033 6.9165 6.00033 7.2165 6.00033 7.58317C6.00033 7.94984 5.70699 8.24984 5.33366 8.24984Z"
        fill="#787486"
      />
    </svg>
  );
}

function Check(props: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 12.75l6 6 9-13.5"
      />
    </svg>
  );
}

function Cancel(props: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke={props.stroke ? props.stroke : "currentColor"}
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
}

function Home(props: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
      />
    </svg>
  );
}

function BoardIcon(props: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
      />
    </svg>
  );
}

function TaskSquare(props: Props) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.3701 8.87988H17.6201"
        stroke="black"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.37988 8.87988L7.12988 9.62988L9.37988 7.37988"
        stroke="black"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.3701 15.8799H17.6201"
        stroke="black"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.37988 15.8799L7.12988 16.6299L9.37988 14.3799"
        stroke="black"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z"
        stroke="black"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function UserPlus(props: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
      />
    </svg>
  );
}

export default Icon;
