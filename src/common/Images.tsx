import React from "react";

function Images(props: { source: string; width?: number; alt?: string }) {
  return (
    <div className="flex w-full justify-center">
      <img
        src={`${props.source}`}
        width={props.width ? props.width : 75}
        alt={props.alt ? props.alt : ""}
      />
    </div>
  );
}

export default Images;
