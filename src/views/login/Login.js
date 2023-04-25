import React, { Fragment } from "react";
import "./Login.css";
import { Button,Input, Form, Checkbox, message } from "antd";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { get_user_role, set_token} from "../../@helper/localstorage";
import Navbar from "../Navbar/index";
import { BASE_URL } from "../../@constant/config";
import { useDispatch } from "react-redux";

const FormItem = Form.Item;

function Login() {
  const dispatch = useDispatch();
  const history = useHistory();
  const onFinish = (values) => {
    axios({
      method: "post",
      url: `${BASE_URL}/user/login`,
      data: {
        email: values.email,
        password: values.password,
      },
      headers: {},
    })
      .then((res) => {
        if (res.status === 200) {
          let token = res.data.body.token;

          set_token(token);
          let ss = get_user_role();
          if (ss === "Faculty") {
            axios({
              method: "get",
              url: "http://localhost:8080/faculty",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }).then((res) => {
              let data = res.data.body;

              dispatch({
                type: "SET_FACULTY_DATA",
                facultyData: data,
              });
            });
          }

          message.success("Login Successful");
          history.push("/dashboard");
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
          </div>
          <div className="pagetitle">Login</div>
          <div>
            <Form style={{ "marginTop": "20px" }} onFinish={onFinish}>
              <FormItem name="email" rules={[{ required: true }]} hasFeedback>
                <Input placeholder={"Email"} />
              </FormItem>
              <FormItem
                name="password"
                rules={[{ required: true }]}
                hasFeedback
              >
                <Input type="password" placeholder={`Password`} />
              </FormItem>
              <Form.Item name="remember" valuePropName="checked">
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "100%", marginBottom: "20px" }}
              >
                <div>Sign in</div>
              </Button>
              <div style={{ textAlign: "center" }}>
                Register As a Faculty? <a href="/signup">Click Here</a>
              </div>
              <div style={{ textAlign: "center" }}>
                Register As a Student? <a href="/student/signup">Click Here</a>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Login;
