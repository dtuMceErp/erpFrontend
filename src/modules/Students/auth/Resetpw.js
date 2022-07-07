import React from "react";
import { Button, Row, Input, Form } from "antd";

const FormItem = Form.Item;

function Resetpw() {
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
          src="./assets/lock.svg"
          style={{
            height: "200px",
            width: "auto",
            padding: "20px",

            textAlign: "center",
          }}
        />
        <Form style={{ "marginTop": "10px" }}>
          <FormItem
            name="new_password"
            rules={[{ required: true }]}
            // hasFeedback
          >
            <Input type="new_password" placeholder={`New Password`} />
          </FormItem>

          <Row>
            <Button
              type="primary"
              htmlType="submit"
              shape="round"
              style={{
                width: "200px",
              }}
              onClick={(event) => (window.location.href = "/")}
            >
              <div>Update</div>
            </Button>
          </Row>
        </Form>
      </div>
    </div>
  );
}

export default Resetpw;
