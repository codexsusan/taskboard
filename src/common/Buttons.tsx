import React from "react";

type Props = {
  type?: ButtonType;
  title?: string;
  onClick?: () => void;
  theme: string;
  customClass?: string;
  children?: React.ReactNode;
};

type ButtonType = "submit" | "button";

function Button(props: Props) {
  switch (props.theme) {
    case "dark":
      return <DarkButton {...props} />;
    case "light":
      return <LightButton {...props} />;
    case "white":
      return <WhiteButton {...props} />;
    default:
      return null;
  }
}

function DarkButton(props: Props) {
  return (
    <>
      <button
        type="submit"
        className={`border bg-[#030711] text-[#F8FAFC] border-slate-50 px-4 py-2 rounded-md ${props.customClass}`}
        onClick={(e) => {
          e.preventDefault();
          props.onClick!();
        }}
      >
        {props.children ? props.children : props.title}
      </button>
    </>
  );
}

function LightButton(props: Props) {
  return (
    <>
      <button
        type={props.type}
        className={`bg-gray-200 text-[#030711] hover:bg-slate-200 px-4 py-2.5 rounded-md ${props.customClass}`}
        onClick={(e) => {
          e.preventDefault();
          props.onClick!();
        }}
      >
        {props.children ? props.children : props.title}
      </button>
    </>
  );
}
function WhiteButton(props: Props) {
  return (
    <>
      <button
        type={props.type}
        className={`bg-white text-[#030711] hover:bg-slate-50 px-4 py-2.5 rounded-md ${props.customClass}`}
        onClick={(e) => {
          e.preventDefault();
          props.onClick!();
        }}
      >
        {props.children ? props.children : props.title}
      </button>
    </>
  );
}

export default Button;
