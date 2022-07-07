import React from "react";
import "./popup.css";
import { Button } from "antd";

function Popup(props) {
  return (
    <div>
      <div className="popup-box">
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
              src="/assets/Mail_send.svg"
              style={{
                height: "200px",
                width: "auto",
                padding: "20px",

                textAlign: "center",
              }}
            />
            <div
              style={{
                "align-items": " center",
                justifyContent: "center",
                padding: "20px",
                textAlign: "center",
              }}
            >
              Email has been send to your email
            </div>
            <Button
              type="primary"
              shape="round"
              style={{
                width: "200px",
              }}
              onClick={(event) => (window.location.href = "/login")}
            >
              login
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Popup;
