import React, { useState, Fragment } from "react";
import { Button, Input, Form, message } from "antd";
import "./style.css";
import Popup from "./Popup";
import { BASE_URL } from "../../../@constant/config";
import axios from "axios";
import Navbar from "../../../views/Navbar/index";

const FormItem = Form.Item;

function Student_signup() {
  const [isOpen, setIsOpen] = useState(false);
  const role = "Student";

  const togglePopup = () => {
    setIsOpen(true);
  };

  const onFinish = (values) => {
    axios({
      method: "post",
      url: String(BASE_URL + "/user/signup"),
      data: {
        name: values.Name,
        email: values.Email,
        roll_no: values.Roll_Number,
        password: values.Password,
        role: role,
      },
      headers: {},
    })
      .then((res) => {
        if (res.status === 201) {
          message.success("User Registration Successful");
          togglePopup();
        }
      })
      .catch((err) => {
        message.error(
          err.response ? err.response.data.message : "Something went wrong"
        );
      });
  };

  return (
    <Fragment>
      <Navbar />
      <div className="form">
        <div className="formfields">
          <div className="logo">
            <img
              alt="logo"
              src="https://upload.wikimedia.org/wikipedia/en/b/b5/DTU%2C_Delhi_official_logo.png"
            />
            <span></span>
          </div>
          <div className="pagetitle">Student Sign Up</div>
          <div>
            <Form style={{ "margin-top": "20px" }} onFinish={onFinish}>
              <FormItem name="Name" rules={[{ required: true }]}>
                <Input placeholder={"Name"} />
              </FormItem>

              <FormItem name="Email" rules={[{ required: true }]}>
                <Input placeholder={"Email"} />
              </FormItem>

              <FormItem name="Roll_Number" rules={[{ required: true }]}>
                <Input placeholder={"Roll No"} />
              </FormItem>
              <FormItem name="Password" rules={[{ required: true }]}>
                <Input type="password" placeholder={`Password`} />
              </FormItem>

              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "100%", marginBottom: "20px" }}
              >
                <div>Sign Up</div>
              </Button>

              <div style={{ textAlign: "center" }}>
                Already have an account? <a href="/login">Login</a>
              </div>
            </Form>

            {isOpen && <Popup handleClose={togglePopup} />}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Student_signup;
