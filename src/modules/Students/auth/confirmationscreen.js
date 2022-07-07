import React, { useState, useEffect } from "react";
import axios from "axios";

import { message, Spin, Button } from "antd";

function Confirmationscreen(props) {
  const current_url = window.location.href;
  const [loading, setloading] = useState(true);
  const [verified, setverfifed] = useState(false);

  let requestURL = current_url.replace("3000", "8080");
  function verifing() {
    axios({
      method: "post",
      url: requestURL,
    })
      .then((res) => {
        setloading(false);
        console.log(res);
        if (res.status === 200) {
          setverfifed(true);
          message.success("you Accout has been verified");
        } else {
          message.error(res.data.message);
        }
      })
      .catch((err) => {
        setloading(false);
        message.error(err.message ? err.message : "something went wrong");
      });
  }

  useEffect(() => {
    verifing();
  },);

  return (
    <div>
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Spin
            style={{
              marginTop: "23%",
            }}
          />
          <div
            style={{
              "margin-top": "20px",
              "margin-left": "auto",
              "margin-right": "auto",
            }}
          >
            Loading...
          </div>
        </div>
      ) : verified ? (
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
              src="../assets/done.svg"
              style={{
                height: "200px",
                width: "auto",
                padding: "20px",

                textAlign: "center",
              }}
            />

            <h1>Done! You are good to go.</h1>

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
      ) : (
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
              src="../assets/404.svg"
              style={{
                height: "200px",
                width: "auto",
                padding: "20px",

                textAlign: "center",
              }}
            />

            <h1>Something went wrong</h1>
          </div>
        </div>
      )}
    </div>
  );
}

export default Confirmationscreen;
