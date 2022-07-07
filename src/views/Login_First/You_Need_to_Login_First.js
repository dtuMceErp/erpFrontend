import React from "react";
import { Button } from "antd";

function You_Need_to_Login_First(props) {
  return (
    <div className="box">
      <div
        style={{
          display: "flex",
          alignContent: "center",
          alignItems: "center",
          "flex-direction": "column",
        }}
      >
        <img
          alt="logo"
          src="./assets/login_first.svg"
          style={{
            height: "200px",
            width: "auto",
            padding: "20px",

            textAlign: "center",
          }}
        />

        <h1>You need to login first</h1>

        <Button
          type="primary"
          htmlType="submit"
          shape="round"
          style={{
            width: "200px",
          }}
          onClick={(event) => (window.location.href = "/")}
        >
          <div>Login</div>
        </Button>
      </div>
    </div>
  );
}

export default You_Need_to_Login_First;
