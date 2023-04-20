import React, { useState, useEffect } from "react";
import "./style.css";
import {
  // Layout,
  Divider,
  Col,
  Row,
  Typography,
  Spin,
  Button,
  message,
} from "antd";
import Projects from "./Project/Projects";
import Achievement from "./Achievement/Achievement";
import Certification from "./Certification/Certification";
import Research from "./Research/Research";
import Experience from "./Experience/Experience";
import axios from "axios";
import {
  // EditOutlined,
  DeleteOutlined } from "@ant-design/icons";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { UI_COLORS } from "../../../../@constant/constant";
import { BASE_URL } from "../../../../@constant/config";
import ProjectUpdate from "./Project/Project_Update";
import { Popconfirm } from "antd";
import ExperienceUpdate from "./Experience/Experience_Updete";
import AchievementUpdate from "./Achievement/Achievement_Update";
import CertificationUpdate from "./Certification/Certification_Update";
import ResearchUpdate from "./Research/Research_Update";

// const { Content } = Layout;
const { Title } = Typography;

const DescriptionItem = ({ title, content }) => (
  <div className="site-description-item-profile-wrapper">
    <p className="site-description-item-profile-p-label">{title}:</p>
    {content}
  </div>
);

function Student_profile() {
  const token = localStorage.getItem("ERPAM_TOKEN");
  const [studentDetails, setstudentDetails] = useState(null);
  const [loading, setloading] = useState(false);
  const [isError, setisError] = useState([]);
  const [updateNow, setUpdateNow] = useState(true);

  function forceUpdateHandler() {
    setUpdateNow(!updateNow);
  }

  function getstudentDetailsData() {
    setloading(true);
    axios
      .get(BASE_URL + "/student", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        let profiledetails = res.data.body;
        setstudentDetails(profiledetails);
        setloading(false);
      })
      .catch((err) => {
        console.log(err);
        setisError([
          ...isError,
          "User profile loading failed. Please try again later",
        ]);
      });
  }

  useEffect(() => {
    getstudentDetailsData();
  }, 
  [updateNow]
  );

  if (studentDetails === null) return <Spin />;

  function deleting(type, id) {
    console.log(type);
    console.log(id);

    axios({
      method: "delete",
      url: String(BASE_URL + `/student/${type}/${id}`),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status === 201) {
          message.success(type + " deleted successfully");
        }
        forceUpdateHandler();
      })
      .catch((err) => {
        message.error(
          err.response ? err.response.data.message : "Something went wrong"
        );
      });
  }

  return (
    <div>
      {loading === true ? (
        <Spin />
      ) : (
        <div>
          <div
            style={{
              marginTop: "90px",
              float: "right",
              height: "100%",
              width: "25%",
              marginLeft: "30px",
              position: "sticky",
              top: "70px",
            }}
          >
            <Row>
              <Projects forceUpdateHandler={forceUpdateHandler} />
              <Experience forceUpdateHandler={forceUpdateHandler} />
            </Row>

            <Divider />
            <Row>
              <Achievement forceUpdateHandler={forceUpdateHandler} />
              <Research forceUpdateHandler={forceUpdateHandler} />
            </Row>

            <Divider />
            <Row>
              <Certification forceUpdateHandler={forceUpdateHandler} />
            </Row>
          </div>
          <div
            style={{
              float: "left",
              height: "100%",
              width: "65%",
            }}
          >
            <Title
              level={2}
              style={{
                marginLeft: "20px",
                marginBottom: "40px",
                marginTop: "20px",

                color: UI_COLORS.PRIMARY_COLOR,
              }}
            >
              Student Profile
            </Title>
            <div className="int">
              <div
                style={{ background: "white", padding: "20px", margin: "10px" }}
              >
                <p
                  className="site-description-item-profile-p"
                  style={{ fontWeight: "bold", textDecoration: "underline" }}
                >
                  Personal
                </p>
                <Row>
                  <Col span={12}>
                    <DescriptionItem
                      title="Full Name"
                      content={studentDetails.user.name}
                    />
                  </Col>
                  <Col span={12}>
                    <DescriptionItem
                      title="Roll No "
                      content={studentDetails.student.roll_no}
                    />
                  </Col>
                </Row>

                <Col span={12}>
                  <DescriptionItem
                    title="Email"
                    content={studentDetails.user.email}
                  />
                </Col>

                {/* <Divider /> */}
              </div>

              <Divider />

              <div
                style={{ background: "white", padding: "20px", margin: "10px" }}
              >
                <p
                  className="site-description-item-profile-p"
                  style={{ fontWeight: "bold", textDecoration: "underline" }}
                >
                  Projects
                </p>
                <div>
                  {studentDetails.student.project_id
                    .map(function (details, i) {
                      return (
                        <div key={i}>
                          <Popconfirm
                            title="Are you sure to delete this item?"
                            icon={
                              <QuestionCircleOutlined
                                style={{ color: "red" }}
                              />
                            }
                            onConfirm={() => deleting("project", details._id)}
                          >
                            <Button
                              danger
                              type="text"
                              shape="round"
                              icon={<DeleteOutlined />}
                              style={{ float: "right", marginLeft: "20px" }}
                            />
                          </Popconfirm>

                          <ProjectUpdate
                            id={details._id}
                            forceUpdateHandler={forceUpdateHandler}
                          />
                          <Row>
                            <Col span={12}>
                              <DescriptionItem
                                title="Title"
                                content={details.title}
                              />
                            </Col>
                            <Col span={12}>
                              <DescriptionItem
                                title="Type"
                                content={details.projectType}
                              />
                            </Col>
                          </Row>
                          <Row>
                            <Col span={24}>
                              <DescriptionItem
                                title="Description"
                                content={details.description}
                              />
                            </Col>
                          </Row>
                          <Row>
                            <Col span={12}>
                              <DescriptionItem
                                title="Start-End Date"
                                content={details.startDate
                                  .substring(0, 10)
                                  .concat(
                                    " - ",
                                    details.endDate === null
                                      ? "Ongoing"
                                      : details.endDate.substring(0, 10) ===
                                        "1970-01-01"
                                      ? "Ongoing"
                                      : details.endDate.substring(0, 10)
                                  )}
                              />
                            </Col>
                            <Col span={12}>
                              <DescriptionItem
                                title="Support URL"
                                content={<a href="#*">{details.SupportURL}</a>}
                              />
                            </Col>
                          </Row>
                          <Divider />
                        </div>
                      );
                    })
                    .reverse()}
                </div>
              </div>

              <Divider />
              <div
                style={{ background: "white", padding: "20px", margin: "10px" }}
              >
                <p
                  className="site-description-item-profile-p"
                  style={{ fontWeight: "bold", textDecoration: "underline" }}
                >
                  Experiences
                </p>
                <div>
                  {studentDetails.student.experience_id
                    .map(function (details, i) {
                      return (
                        <div key={i}>
                          <Popconfirm
                            title="Are you sure to delete this item?"
                            icon={
                              <QuestionCircleOutlined
                                style={{ color: "red" }}
                              />
                            }
                            onConfirm={() =>
                              deleting("experience", details._id)
                            }
                          >
                            <Button
                              danger
                              type="text"
                              shape="round"
                              icon={<DeleteOutlined />}
                              style={{ float: "right", marginLeft: "20px" }}
                            />
                          </Popconfirm>
                          <ExperienceUpdate
                            id={details._id}
                            forceUpdateHandler={forceUpdateHandler}
                          />

                          <Row>
                            <Col span={12}>
                              <DescriptionItem
                                title="Title"
                                content={details.title}
                              />
                            </Col>
                            <Col span={12}>
                              <DescriptionItem
                                title="Employment Type"
                                content={details.employmentType}
                              />
                            </Col>
                          </Row>
                          <Row>
                            <Col span={24}>
                              <DescriptionItem
                                title="Description"
                                content={details.description}
                              />
                            </Col>
                          </Row>
                          <Row>
                            <Col span={24}>
                              <DescriptionItem
                                title="Company"
                                content={details.company}
                              />
                            </Col>
                          </Row>
                          <Row>
                            <Col span={12}>
                              <DescriptionItem
                                title="Start - End"
                                content={details.startDate
                                  .substring(0, 10)
                                  .concat(
                                    " - ",
                                    details.endDate === null
                                      ? "Ongoing"
                                      : details.endDate.substring(0, 10) ===
                                        "1970-01-01"
                                      ? "Ongoing"
                                      : details.endDate.substring(0, 10)
                                  )}
                              />
                            </Col>
                            <Col span={12}>
                              <DescriptionItem
                                title="Support URL"
                                content={<a href="#*">{details.SupportURL}</a>}
                              />
                            </Col>
                          </Row>

                          <Divider />
                        </div>
                      );
                    })
                    .reverse()}
                </div>
              </div>
              <Divider />
              <div
                style={{ background: "white", padding: "20px", margin: "10px" }}
              >
                <p
                  className="site-description-item-profile-p"
                  style={{ fontWeight: "bold", textDecoration: "underline" }}
                >
                  Achievement
                </p>
                <div>
                  {studentDetails.student.achievement_id
                    .map(function (details, i) {
                      return (
                        <div key={i}>
                          <Popconfirm
                            title="Are you sure to delete this item?"
                            icon={
                              <QuestionCircleOutlined
                                style={{ color: "red" }}
                              />
                            }
                            onConfirm={() =>
                              deleting("achievement", details._id)
                            }
                          >
                            <Button
                              danger
                              type="text"
                              shape="round"
                              icon={<DeleteOutlined />}
                              style={{ float: "right", marginLeft: "20px" }}
                            />
                          </Popconfirm>

                          <AchievementUpdate
                            id={details._id}
                            forceUpdateHandler={forceUpdateHandler}
                          />

                          <Row>
                            <Col span={12}>
                              <DescriptionItem
                                title="Title"
                                content={details.title}
                              />
                            </Col>
                            <Col span={12}>
                              <DescriptionItem
                                title="Achievement Type"
                                content={details.achievementType}
                              />
                            </Col>
                          </Row>
                          <Row>
                            <Col span={24}>
                              <DescriptionItem
                                title="Description"
                                content={details.description}
                              />
                            </Col>
                          </Row>

                          <Row>
                            <Col span={12}>
                              <DescriptionItem
                                title="Support URL"
                                content={<a href="#*">{details.SupportURL}</a>}
                              />
                            </Col>
                          </Row>

                          <Divider />
                        </div>
                      );
                    })
                    .reverse()}
                </div>
              </div>
              <Divider />
              <div
                style={{ background: "white", padding: "20px", margin: "10px" }}
              >
                <p
                  className="site-description-item-profile-p"
                  style={{ fontWeight: "bold", textDecoration: "underline" }}
                >
                  Certification
                </p>
                <div>
                  {studentDetails.student.certification_id
                    .map(function (details, i) {
                      return (
                        <div key={i}>
                          <Popconfirm
                            title="Are you sure to delete this item?"
                            icon={
                              <QuestionCircleOutlined
                                style={{ color: "red" }}
                              />
                            }
                            onConfirm={() =>
                              deleting("certification", details._id)
                            }
                          >
                            <Button
                              danger
                              type="text"
                              shape="round"
                              icon={<DeleteOutlined />}
                              style={{ float: "right", marginLeft: "20px" }}
                            />
                          </Popconfirm>

                          <CertificationUpdate
                            id={details._id}
                            forceUpdateHandler={forceUpdateHandler}
                          />

                          <Row>
                            <Col span={12}>
                              <DescriptionItem
                                title="Title"
                                content={details.title}
                              />
                            </Col>
                            <Col span={12}>
                              <DescriptionItem
                                title="Issued By"
                                content={details.issuingOrganisation}
                              />
                            </Col>
                          </Row>
                          <Row>
                            <Col span={24}>
                              <DescriptionItem
                                title="Issued On"
                                content={details.issueDate.substring(0, 10)}
                              />
                            </Col>
                            <Col span={12}>
                              <DescriptionItem
                                title="Support URL"
                                content={<a href="#*">{details.SupportURL}</a>}
                              />
                            </Col>
                          </Row>

                          <Divider />
                        </div>
                      );
                    })
                    .reverse()}
                </div>
              </div>

              <Divider />
              <div
                style={{ background: "white", padding: "20px", margin: "10px" }}
              >
                <p
                  className="site-description-item-profile-p"
                  style={{ fontWeight: "bold", textDecoration: "underline" }}
                >
                  Research Work
                </p>
                <div>
                  {studentDetails.student.research_id
                    .map(function (details, i) {
                      return (
                        <div key={i}>
                          <Popconfirm
                            title="Are you sure to delete this item?"
                            icon={
                              <QuestionCircleOutlined
                                style={{ color: "red" }}
                              />
                            }
                            onConfirm={() => deleting("research", details._id)}
                          >
                            <Button
                              danger
                              type="text"
                              shape="round"
                              icon={<DeleteOutlined />}
                              style={{ float: "right", marginLeft: "20px" }}
                            />
                          </Popconfirm>

                          <ResearchUpdate
                            id={details._id}
                            forceUpdateHandler={forceUpdateHandler}
                          />

                          <Row>
                            <Col span={12}>
                              <DescriptionItem
                                title="Title"
                                content={details.title}
                              />
                            </Col>
                            <Col span={12}>
                              <DescriptionItem
                                title="Publisher"
                                content={details.publisher}
                              />
                            </Col>
                          </Row>
                          <Row>
                            <Col span={24}>
                              <DescriptionItem
                                title="Description"
                                content={details.description}
                              />
                            </Col>
                          </Row>
                          <Row>
                            <Col span={12}>
                              <DescriptionItem
                                title="Publication Date "
                                content={
                                  details.isOngoing === false
                                    ? details.publicationDate.substring(0, 10)
                                    : "On Going"
                                }
                              />
                            </Col>
                          </Row>
                          <Row>
                            <Col span={24}>
                              <DescriptionItem
                                title="Support URL"
                                content={<a href="#*">{details.SupportURL}</a>}
                              />
                            </Col>
                          </Row>

                          <Divider />
                        </div>
                      );
                    })
                    .reverse()}
                </div>
              </div>
              <Divider />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Student_profile;
