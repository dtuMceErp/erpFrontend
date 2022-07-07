import React from "react";
import { Spin } from "antd";

function Committee(props) {
  return (
    <div style={{ margin: "35vh", display: "flex", flexDirection: "column" }}>
      <Spin size="large" />
      <br />
      <div style={{ textAlign: "center", fontWeight: "700" }}>
        Committee
      </div>
    </div>
  );
}

export default Committee;
