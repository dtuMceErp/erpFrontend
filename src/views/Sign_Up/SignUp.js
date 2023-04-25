import React, { Fragment } from "react";
import "./SignUp.css";
import { Button,
  // Row,
  Input, Form, message, Select } from "antd";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../@constant/config";
import Navbar from "../Navbar";

const { Option } = Select;

const FormItem = Form.Item;

function SignUp() {
  const history = useHistory();
  // const role = "Faculty";
  const onFinish = (values) => {
    let data = {
      name: values.Name,
      email: values.Email,
      password: values.Password,
      role: values.Role,
    };
    axios({
      method: "post",
      url: String(BASE_URL + "/user/signup"),
      data: data,
      headers: {},
    })
      .then((res) => {
        if (res.status === 201) {
          message.success("User Registration Successful");
          history.push("/login");
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
          <div className="pagetitle">Sign Up</div>
          <div>
            <Form style={{ "marginTop": "20px" }} onFinish={onFinish}>
              <FormItem name="Name" rules={[{ required: true }]}>
                <Input placeholder={"Name"} />
              </FormItem>

              <FormItem name="Email" rules={[{ required: true }]}>
                <Input placeholder={"Email"} />
              </FormItem>

              <Form.Item name="Role">
                <Select placeholder="Select your role" allowClear>
                  <Option value="Faculty">Faculty</Option>
                  {/* <Option value="staff">Staff</Option> */}
                  {/* <Option value="student">Student</Option> */}
                </Select>
              </Form.Item>

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
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default SignUp;
