import React from "react";
import { Layout, Menu, Dropdown } from "antd";
import { UserOutlined, UserAddOutlined } from "@ant-design/icons";

const { Header } = Layout;

function Navbar() {
  const menu = (
    <Menu style={{ marginTop: "12px" }}>
      <Menu.Item key="0">
        <a href="/signup">
          <UserOutlined /> Register as Faculty
        </a>
      </Menu.Item>
      <Menu.Item key="1">
        <a href="/student/signup">
          <UserAddOutlined /> Register as Student
        </a>
      </Menu.Item>
    </Menu>
  );
  return (
    <Header
      theme="light"
      className="site-layout-background"
      style={{ padding: 0, background: "#fff" }}
    >
      <img
        src="../assets/logo.png"
        alt="logo"
        style={{
          height: "45px",
          width: "auto",
          float: "left",
          margin: "8px 2px 2px 20px",
        }}
      />
      <div className="userinfo">
      {/* <a
          className="ant-dropdown-link" href="#*"
          onClick={(event) => (window.location.href="/#")}
        >
          <span style={{ margin: "20px" }}>Notification</span>
        </a> */}
        <a
          className="ant-dropdown-link" href="#*"
          onClick={(event) => (window.location.href = "/login")}
        >
          <span style={{ margin: "20px" }}>Login</span>
        </a>

        <Dropdown overlay={menu}>
          <a className="ant-dropdown-link" href="#*" onClick={(e) => e.preventDefault()}>
            <span style={{ margin: "20px", marginRight: "40px" }}>Sign Up</span>
          </a>
        </Dropdown>
      </div>
    </Header>
  );
}

export default Navbar;
