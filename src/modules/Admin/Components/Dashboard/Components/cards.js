import React from "react";
import { Card } from "antd";

function OverviewCard({ title, img, count }) {
  return (
    <div>
      <Card
        bordered={false}
        style={{
          width: "330px",
          height: "180px",
          margin: "20px",
          borderRadius: "30px",
          display: "flex",
          flexDirection: "column",
          cursor: "pointer",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          style={{
            marginLeft: "7px",
            marginBottom: "15px",
            height: "80px",
            width: "auto",
            margin: "auto",
          }}
          src={img}
          alt="img"
        />
        <div style={{ marginTop: "15px", fontWeight: "700" }}>
          Total {title} : {count}
        </div>
      </Card>
    </div>
  );
}

export default OverviewCard;
