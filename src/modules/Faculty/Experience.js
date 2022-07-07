import React, { useState } from "react";
import {
  // Spin,
  Typography,
  Button,
  Drawer,
  Form,
  Input,
  Select,
  DatePicker,
  Switch,
  message,
  Row,
  Col,
  Divider,
  Popconfirm,
} from "antd";
// import { UI_COLORS } from "../../@constant/constant";
import axios from "axios";
import { BASE_URL } from "../../@constant/config";
// import moment from "moment";
import { useSelector } from "react-redux";
import { QuestionCircleOutlined, DeleteOutlined } from "@ant-design/icons";
import ExperienceUpdate from "./ExperienceUpdate";

const { Title } = Typography;
// const dateFormat = "DD/MM/YYYY";

const DescriptionItem = ({ title, content }) => (
  <div className="site-description-item-profile-wrapper">
    <p className="site-description-item-profile-p-label">{title}:</p>
    {content}
  </div>
);

function Experience(props) {
  const [form] = Form.useForm();
  const [form_visible, setform_visible] = useState(false);
  const [dateOfJoining, setdateOfJoining] = useState();
  const [dateOfLeaving, setdateOfLeaving] = useState();
  const [isOngoing, setisongoing] = useState(false);
  const token = localStorage.getItem("ERPAM_TOKEN");

  function settingdateOfJoining(date, dateString) {
    setdateOfJoining(dateString);
  }

  function settingdateOfLeaving(date, dateString) {
    setdateOfLeaving(dateString);
  }

  function iog(checked) {
    setisongoing(checked);
  }

  function changeParentsState() {
    props.forceUpdateHandler();
  }

  function deleting(id) {
    axios({
      method: "delete",
      url: String(BASE_URL + `/faculty/experience/delete/${id}`),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status === 201) {
          message.success("Experience deleted successfully");
        }
        changeParentsState();
      })
      .catch((err) => {
        message.error(
          err.response ? err.response.data.message : "Something went wrong"
        );
      });
  }

  function showDrawer() {
    setform_visible(true);
  }

  function onClose() {
    setform_visible(false);
  }

  const onFinish = (values) => {
    let data = {};
    if (isOngoing) {
      data = {
        institution: values.institution,
        designation: values.designation,
        natureOfAppointment: values.natureOfAppointment,
        natureOfDuties: values.natureOfDuties,
        payScale: values.payScale,
        isOngoing: isOngoing,
        dateOfJoining: dateOfJoining,
        remarks: values.remarks,
      };
    } else {
      data = {
        institution: values.institution,
        designation: values.designation,
        natureOfAppointment: values.natureOfAppointment,
        natureOfDuties: values.natureOfDuties,
        payScale: values.payScale,
        isOngoing: isOngoing,
        dateOfJoining: dateOfJoining,
        dateOfLeaving: dateOfLeaving,
        remarks: values.remarks,
      };
    }
    axios({
      method: "post",
      url: String(BASE_URL + "/faculty/experience/create"),
      data: data,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        console.log(res);
        form.resetFields();
        if (res.status === 201) {
          message.success("Experience Added Successfully");
        }
        changeParentsState();
      })
      .catch((err) => {
        message.error(
          err.response ? err.response.data.message : "Something went wrong"
        );
      });
  };

  const data = useSelector((state) => state.FacultyReducer.facultyData);

  if (data === null) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <div style={{ margin: "16px 0", display: "flex" }}>
        <p
          className="site-description-item-profile-p"
          style={{
            fontWeight: "bold",
            fontSize: "22px",
            textDecoration: "underline",
            margin: "20px",
          }}
        >
          Experience
        </p>
        <div
          className="switch"
          style={{
            margin: "26px 0",
            position: "absolute",
            right: "0",
          }}
        >
          <Button
            type="primary"
            shape="round"
            className="upbutton"
            style={{ width: "200px", marginRight: "40px", marginLeft: "20px" }}
            onClick={showDrawer}
          >
            Create a new Entry
          </Button>
        </div>
      </div>
      <div
        style={{
          background: "white",
          padding: "20px",
          margin: "20px",
          borderRadius: "20px",
        }}
      >
        <div>
          {data.faculty.experience.experience
            .map(function (details, i) {
              return (
                <div key={i}>
                  <Popconfirm
                    title="Are you sure to delete this item?"
                    icon={<QuestionCircleOutlined style={{ color: "red" }} />}
                    onConfirm={() => deleting(details._id)}
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
                    data={details}
                    changeParentState={props.forceUpdateHandler}
                  />
                  <Row>
                    <Col span={12}>
                      <DescriptionItem
                        title="Institution"
                        content={details.institution}
                      />
                    </Col>
                    <Col span={12}>
                      <DescriptionItem
                        title="Designation"
                        content={details.designation}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col span={12}>
                      <DescriptionItem
                        title="Nature Of Appointment"
                        content={details.natureOfAppointment}
                      />
                    </Col>
                    <Col span={12}>
                      <DescriptionItem
                        title="Nature Of Duties"
                        content={details.natureOfDuties}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col span={12}>
                      <DescriptionItem
                        title="Pay Scale"
                        content={details.payScale}
                      />
                    </Col>
                    <Col span={12}>
                      <DescriptionItem
                        title="Is Ongoing"
                        content={details.isOngoing ? "Yes" : "No"}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col span={12}>
                      <DescriptionItem
                        title="Date of Joining"
                        content={
                          details.dateOfJoining
                            ? details.dateOfJoining.substring(0, 10)
                            : " "
                        }
                      />
                    </Col>
                    <Col span={12}>
                      <DescriptionItem
                        title="Date of Leaving"
                        content={
                          details.dateOfLeaving
                            ? details.dateOfLeaving.substring(0, 10)
                            : " "
                        }
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24}>
                      <DescriptionItem
                        title="Remarks"
                        content={details.remarks}
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
      <div
        style={{
          margin: "20px",

          right: "5px",
        }}
      ></div>
      <Drawer
        width={550}
        placement="right"
        closable={true}
        onClose={onClose}
        visible={form_visible}
      >
        <Title
          level={2}
          style={{
            marginRight: "20px",
            marginTop: "10px",
            marginBottom: "40px",
          }}
        >
          Add New Experience
        </Title>
        <Form
          onFinish={onFinish}
          form={form}
          layout="vertical"
          name="control-hooks"
          style={{ width: "100%" }}
        >
          <Form.Item label="Institution" name="institution" required={true}>
            <Input required />
          </Form.Item>
          <Form.Item label="Designation" name="designation" required={true}>
            <Input required />
          </Form.Item>
          <Form.Item
            label="Natuer of Appointment"
            name="natureofAppointment"
            required={true}
          >
            <Select required>
              <Select.Option value="Regular">Regular</Select.Option>
              <Select.Option value="Fixed term">Fixed Term</Select.Option>
              <Select.Option value="Temporary">Temporary</Select.Option>
              <Select.Option value="Adhoc">Adhoc</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Nature of Duties"
            name="natureOfDuties"
            required={true}
          >
            <Input.TextArea required rows={4} showCount maxLength={200} />
          </Form.Item>
          <Form.Item label="Pay Scale" name="payScale" required={true}>
            <Input required />
          </Form.Item>
          <Form.Item
            label="Is Ongoing"
            name="isOngoing"
            required={true}
            valuePropName="checked"
          >
            <Switch defaultChecked={false} onChange={iog} required />
          </Form.Item>
          <Row>
            <Form.Item
              label="Date of Joining"
              name="dateofJoining"
              required={true}
            >
              <DatePicker onChange={settingdateOfJoining} format="MM-DD-YYYY" />
            </Form.Item>
            {isOngoing === false ? (
              <Form.Item
                label="Date of Leaving"
                name="dateofLeaving"
                required={true}
                style={{ marginLeft: "20px" }}
              >
                <DatePicker
                  onChange={settingdateOfLeaving}
                  format="MM-DD-YYYY"
                />
              </Form.Item>
            ) : (
              <div></div>
            )}
          </Row>
          <Form.Item label="Remarks" name="remarks" required={true}>
            <Input.TextArea rows={4} showCount maxLength={200} required />
          </Form.Item>
          <Button
            type="primary"
            shape="round"
            htmlType="submit"
            className="upbutton"
            style={{ width: "100%", marginTop: "20px" }}
          >
            Submit
          </Button>
        </Form>
      </Drawer>
    </div>
  );
}

export default Experience;
