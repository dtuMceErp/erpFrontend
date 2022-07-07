import React from "react";
import { Spin } from "antd";

function MeetingEdit(props) {
  return (
    <div style={{ margin: "35vh", display: "flex", flexDirection: "column" }}>
      <Spin size="large" />
      <br />
      <div style={{ textAlign: "center", fontWeight: "700" }}>
        Meeting Edit
      </div>
    </div>
  );
}

export default MeetingEdit;