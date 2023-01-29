import React from "react";
import load from "./load.gif";

const Load = () => {
  return (
    <div className="text-center my-4">
      <img
        src={load}
        alt="Loading..."
        style={{ width: "50px", height: "50px" }}
      />
    </div>
  );
};

export default Load;
