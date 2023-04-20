import React, { Suspense, useEffect, useState } from "react";

import "./Dashboard.css";
import { Layout, Menu, Dropdown, message } from "antd";
import { useHistory } from "react-router-dom";
// import StudentVerify from "../../modules/Admin/Components/Students Table/StudentVerify";
// import Overview from "../../modules/Admin/Components/Students Table/Overview";
// import StudentDelete from "../../modules/Admin/Components/Students Table/StudentDelete";

import Personal from "../../modules/Faculty/Personal";
import ProfessionalActivities from "../../modules/Faculty/ProfessionalActivities";
import Experience from "../../modules/Faculty/Experience";
import Academics from "../../modules/Faculty/Academics";
import Publications from "../../modules/Faculty/Publications";
import CommitteeOverviewFaculty from "../../modules/Faculty/Committee_Overview";
import MeetingOverviewFaculity from "../../modules/Faculty/MeetingOverview";
import MeetingCallFaculity from "../../modules/Faculty/MeetingCall";
import MeetingEditFaculty from "../../modules/Faculty/MeetingEdit";

// import FaculityOverview from "../../modules/Admin/Components/Faculity Tables/FaculityOverview";
// import FaculityVerify from "../../modules/Admin/Components/Faculity Tables/FaculityVerify";
// import FacultyDelete from "../../modules/Admin/Components/Faculity Tables/FacultyDelete";

// import Meeting_Overview from "../../modules/Admin/Components/Meetings/Overview";
// import Meeting_Call from "../../modules/Admin/Components/Meetings/Call";

// import Committee_Overview from "../../modules/Admin/Components/Committee/Overview";
// import Committee_Create from "../../modules/Admin/Components/Committee/Create";
import {
  PieChartOutlined,
  // HeartOutlined,
  // TeamOutlined,
  UserOutlined,
  LogoutOutlined,
  DiffOutlined,
  IdcardFilled,
  ReadFilled,
  FundFilled,
  VideoCameraOutlined,
  MailFilled,
  ProfileFilled,
  TeamOutlined,
} from "@ant-design/icons";
import { Avatar, Spin } from "antd";
import NoticeController from "../../../src/modules/Admin/Components/Notice/NoticeController";
import StudentProfile from "../../modules/Students/Components/Profile/Student_profile";
import axios from "axios";

import YouNeedToLoginFirst from "../Login_First/You_Need_to_Login_First";
import {
  get_user_name,
  get_user_role,
  is_logged_in,
  remove_token,
} from "../../@helper/localstorage";
import { useDispatch } from "react-redux";
import AdminDashboard from "../../modules/Admin/Components/Dashboard";
import { BASE_URL } from "../../@constant/config";
import SubMenu from "antd/lib/menu/SubMenu";
const { Header, Footer, Sider, Content } = Layout;
// const { SubMenu } = Menu;

function Dashboard(props) {
  const history = useHistory();

  const [collapsed, setcollapsed] = useState(false);
  const [logined, setlogined] = useState(false);
  const [PageView, setPageView] = useState(1);

  const role = get_user_role();
  const username = get_user_name();
  const token = localStorage.getItem("ERPAM_TOKEN");
  const dispatch = useDispatch();

  const [updateNow, setUpdateNow] = useState(true);

  function forceUpdateHandler() {
    setUpdateNow(!updateNow);
  }

  function checklogin() {
    let token = localStorage.getItem("ERPAM_TOKEN");
    if (token) return true;
    return false;
  }

  function SetFacultyData() {
    axios({
      method: "get",
      url: String(BASE_URL + "/faculty"),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        let data = res.data.body;

        dispatch({
          type: "SET_FACULTY_DATA",
          facultyData: data,
        });
      })
      .catch((err) => {
        message.error(
          err.response ? err.response.data.message : "Something went wrong"
        );
      });
  }

  function adminPageController(x) {
    if(x===1){
      return <AdminDashboard />
    }
    return <NoticeController/>;
    // if (x === 2) {
    //   return <NoticeController />;
    // } else if (x === 3) {
    //   return <Overview />;
    // } else if (x === 4) {
    //   return <StudentVerify />;
    // } else if (x === 5) {
    //   return <FaculityOverview />;
    // } else if (x === 6) {
    //   return <FaculityVerify />;
    // } else if (x === 7) {
    //   return <Meeting_Overview />;
    // } else if (x == 8) {
    //   return <Meeting_Call />;
    // } else if (x == 9) {
    //   return <Committee_Overview />;
    // } else if (x == 10) {
    //   return <Committee_Create />;
    // } else if (x == 11) {
    //   return <StudentDelete />;
    // } else if (x == 12) {
    //   return <FacultyDelete />;
    // } else return <AdminDashboard />;
  }

  function faculityPageController(x) {
    if (x === 1) {
      return <Personal forceUpdateHandler={forceUpdateHandler} />;
    } else if (x === 3) {
      return <Experience forceUpdateHandler={forceUpdateHandler} />;
    } else if (x === 4) {
      return <Publications forceUpdateHandler={forceUpdateHandler} />;
    } else if (x === 5) {
      return <ProfessionalActivities forceUpdateHandler={forceUpdateHandler} />;
    } else if (x === 10) {
      return <CommitteeOverviewFaculty />;
    } else if (x === 11) {
      return <MeetingOverviewFaculity />;
    } else if (x === 12) {
      return <MeetingCallFaculity />;
    } else if (x === 15) {
      return <MeetingEditFaculty />;
    } else {
      return <Academics forceUpdateHandler={forceUpdateHandler} />;
    }
  }

  useEffect(() => {
    setlogined(checklogin());
  },
   [updateNow, logined]
  );

  function onCollapse() {
    if (collapsed === true) {
      setcollapsed(false);
    } else {
      setcollapsed(true);
    }
  }

  function pageController(x) {
    setPageView(x);
  }

  function getYear() {
    return new Date().getFullYear();
  }

  function loggingOut() {
    remove_token();
    history.push("/");
  }

  const menu = (
    <Menu style={{ marginTop: "12px" }}>
      <Menu.Item key="0">
        <a href="#*">
          <UserOutlined /> Profile
        </a>
      </Menu.Item>
      <Menu.Item key="1" onClick={loggingOut}>
        <a href="#*">
          <LogoutOutlined /> Logout
        </a>
      </Menu.Item>
    </Menu>
  );

  return (
    <div>
      {is_logged_in ? (
        <Layout style={{ minHeight: "100vh" }}>
          <Sider
            style={{
              overflow: "auto",
              height: "100vh",
              position: "fixed",
              left: 0,
            }}
            collapsible
            collapsed={collapsed}
            onCollapse={onCollapse}
          >
            <div className="logo">{role}</div>
            <br />
            {(() => {
              if (role === "Student") {
                return (
                  <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
                    <Menu.Item key="1" icon={<PieChartOutlined  />}>
                      Profile Details
                    </Menu.Item>
                  </Menu>
                );
              }
              else if (role === "Admin") {
                return (
                  <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
                    <Menu.Item
                      key="1"
                      icon={<PieChartOutlined />}
                      onClick={() => pageController(1)}
                    >
                      Dashboard
                    </Menu.Item>
                    <Menu.Item
                      key="2"
                      icon={<DiffOutlined />}
                      onClick={() => pageController(2)}
                    >
                      Notices
                    </Menu.Item>

                    <SubMenu
                      key="sub2"
                      icon={<TeamOutlined />}
                      title="Students"
                    >
                      <Menu.Item key="7" onClick={() => pageController(3)}>
                        Overview
                      </Menu.Item>
                      <Menu.Item key="8" onClick={() => pageController(4)}>
                        Verify
                      </Menu.Item>
                      <Menu.Item key="15" onClick={() => pageController(11)}>
                        Deactivate
                      </Menu.Item>
                    </SubMenu>

                    <SubMenu key="sub3" icon={<TeamOutlined />} title="Faculty">
                      <Menu.Item key="9" onClick={() => pageController(5)}>
                        Overview
                      </Menu.Item>
                      <Menu.Item key="10" onClick={() => pageController(6)}>
                        Verify
                      </Menu.Item>
                      <Menu.Item key="16" onClick={() => pageController(12)}>
                        Deactivate
                      </Menu.Item>
                    </SubMenu>
                    <SubMenu
                      key="sub4"
                      icon={<VideoCameraOutlined />}
                      title="Meetings"
                    >
                      <Menu.Item key="11" onClick={() => pageController(7)}>
                        Overview
                      </Menu.Item>
                      <Menu.Item key="12" onClick={() => pageController(8)}>
                        Call
                      </Menu.Item>
                    </SubMenu>
                    <SubMenu
                      key="sub5"
                      icon={<TeamOutlined />}
                      title="Committee"
                    >
                      <Menu.Item key="13" onClick={() => pageController(9)}>
                        Overview
                      </Menu.Item>
                      <Menu.Item key="14" onClick={() => pageController(10)}>
                        Create
                      </Menu.Item>
                    </SubMenu>
                  </Menu>
                );
              }
              else if (role === "Faculty") {
                return (
                  <div>
                    <Menu
                      theme="dark"
                      defaultSelectedKeys={["1"]}
                      mode="inline"
                    >
                      {/* <Menu.Item key="1" icon={<AppstoreFilled Link/>}>  Dashboard</Menu.Item> */}
                      <Menu.Item
                        key="8"
                        icon={<IdcardFilled  />}
                        onClick={() => pageController(1)}
                      >
                        Personal
                      </Menu.Item>
                      <Menu.Item
                        key="6"
                        icon={<ReadFilled  />}
                        onClick={() => pageController(7)}
                      >
                        Academics
                      </Menu.Item>
                      <Menu.Item
                        key="3"
                        icon={<FundFilled  />}
                        onClick={() => pageController(3)}
                      >
                        Experience
                      </Menu.Item>
                      <Menu.Item
                        key="4"
                        icon={<ProfileFilled  />}
                        onClick={() => pageController(4)}
                      >
                        Publications
                      </Menu.Item>
                      <Menu.Item
                        key="5"
                        icon={<MailFilled  />}
                        onClick={() => pageController(5)}
                      >
                        Professional Activities
                      </Menu.Item>
                      {/* <SubMenu
                        key="sub4"
                        icon={<VideoCameraOutlined />}
                        title="Meetings"
                      >
                        <Menu.Item key="11" onClick={() => pageController(11)}>
                          Overview
                        </Menu.Item>
                        <Menu.Item key="12" onClick={() => pageController(12)}>
                          Call
                        </Menu.Item>
                        <Menu.Item key="15" onClick={() => pageController(15)}>
                          Edit
                        </Menu.Item>
                      </SubMenu> */}
                      {/* <SubMenu
                        key="sub5"
                        icon={<TeamOutlined />}
                        title="Committee"
                      >
                        <Menu.Item key="13" onClick={() => pageController(10)}>
                          Overview
                        </Menu.Item>
                       <Menu.Item key="14" onClick={() => pageController(10)}>
                       Create
                       </Menu.Item>
                      </SubMenu> */}
                    </Menu>
                  </div>
                );
              }
            })()}
          </Sider>
          <Layout
            className="site-layout"
            style={{ "marginLeft": collapsed ? "80px" : "200px" }}
          >
            <Header className="site-layout-background" style={{ padding: 0 }}>
              <img
                src="assets/logo.png"
                alt="logo"
                style={{
                  height: "45px",
                  width: "auto",
                  float: "left",
                  margin: "8px 2px 2px 20px",
                }}
              />
              <div className="userinfo">
                <Dropdown overlay={menu}>
                  <a href="#*"
                    className="ant-dropdown-link"
                    onClick={(e) => e.preventDefault()}
                  >
                    <span style={{ margin: "20px" }}>{username}</span>
                  </a>
                </Dropdown>
                <span className="avatar-item">
                  <Avatar size="large" icon={<UserOutlined />} />
                </span>
              </div>
            </Header>
            <Content style={{ margin: "0 16px" }}>
              <Suspense fallback={<Spin />}>
                {(() => {
                  if (role === "Student") {
                    return <StudentProfile />;
                  } else if (role === "Admin") {
                    return adminPageController(PageView);
                  } else if (role === "Faculty") {
                    SetFacultyData();
                    return faculityPageController(PageView);
                    // return <div>BC KU NAHI AA RHA</div>;
                  }
                })()}
                {/* {role === "Student" ? (
                 
                ) : (
                  adminPageController(PageView)
                )} */}
              </Suspense>
            </Content>
            <Footer style={{ textAlign: "center" }}>
              <strong style={{ float: "left" }}>
                APPLIED MATHEMATICS ERP © {getYear()}
              </strong>
              <p style={{ float: "right" }}>
                {/* Made with <HeartOutlined /> by Satyam Jaiswal & Samyak Jain */}
              </p>
            </Footer>
          </Layout>
        </Layout>
      ) : (
        <YouNeedToLoginFirst />
      )}
    </div>
  );
}

export default Dashboard;
