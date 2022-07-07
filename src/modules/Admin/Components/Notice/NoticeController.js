import React, { useState } from "react";
import CustomTable from "../CustomTable/CustomTable";
import { 
  // Layout,
   Typography } from "antd";
import { Switch } from "antd";
import { UploadScreen } from "./UploadScreen";
import { UI_COLORS } from "../../../../@constant/constant";
// const { Content } = Layout;

const { Title } = Typography;

function NoticeController(props) {
  const [uploadScreen, setuploadScreen] = useState(false);

  function onChange(checked) {
    setuploadScreen(checked);
  }

  return (
    <div>
      <div style={{ margin: "16px 0", display: "flex" }}>
        <Title
          level={2}
          style={{
            marginLeft: "30px",
            marginRight: "20px",
            marginTop: "10px",
            color: UI_COLORS.PRIMARY_COLOR,
          }}
        >
          Notices
        </Title>
        <div
          className="switch"
          style={{
            margin: "26px 0",
            position: "absolute",
            right: "0",
          }}
        >
          <span>Create a new Entry </span>
          <Switch
            defaultChecked={false}
            onChange={onChange}
            style={{ margin: "0 20px" }}
          />
        </div>
      </div>

      <div
        className="site-layout-background"
        style={{ padding: 24, minHeight: 360, borderRadius: "20px" }}
      >
        {uploadScreen === false ? <CustomTable /> : <UploadScreen />}
      </div>
    </div>
  );
}

export default NoticeController;
