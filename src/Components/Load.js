import React, { Component } from "react";
import load from "./load.gif";

export class Load extends Component {
  render() {
    return (
      <div className="text-center">
        <img
          src={load}
          alt="Loading..."
          style={{ width: "50px", height: "50px" }}
        />
      </div>
    );
  }
}

export default Load;
