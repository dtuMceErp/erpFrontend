import React, { useState } from "react";
import {
  Drawer,
  Form,
  Input,
  Select,
  Button,
  Typography,
  Switch,
  Row,
  message,
  // Spin,
  // Space,
} from "antd";
import { BASE_URL } from "../../@constant/config";
import axios from "axios";
import { DatePicker } from "antd";
import moment from "moment";
import {
  EditOutlined,
  // MinusCircleOutlined,
  // PlusOutlined,
} from "@ant-design/icons";

const { Title } = Typography;

const dateFormat = "YYYY-MM-DD";

function Experience_Update(props) {
  const [form] = Form.useForm();
  const [form_visible, setform_visible] = useState(false);
  const [dateOfJoining, setdateOfJoining] = useState(props.data.dateOfJoining);
  const [dateOfLeaving, setdateOfLeaving] = useState(props.data.dateOfLeaving);
  const [isOngoing, setisongoing] = useState(props.data.isOngoing);
  const token = localStorage.getItem("ERPAM_TOKEN");

  function settingdateOfJoining(date, dateString) {
    setdateOfJoining(dateString);
  }

  function settingdateOfLeaving(date, dateString) {
    setdateOfLeaving(dateString);
  }

  function showDrawer() {
    setform_visible(true);
    console.log(form_visible);
  }

  function onClose() {
    setform_visible(false);
    console.log(form_visible);
  }

  function iog(checked) {
    setisongoing(checked);
  }

  function changePState() {
    console.log("called form update");
    props.changeParentState();
  }

  const onFinish = (values) => {
    console.log(values);
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

    console.log(data);
    axios({
      method: "patch",
      url: String(BASE_URL + `/faculty/experience/update/${props.data._id}`),
      data: data,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        console.log(res);
        form.resetFields();
        if (res.status === 200) {
          message.success("Experience updated ");
          changePState();
          onClose();
        }
        // changePState();
      })
      .catch((err) => {
        message.error(
          err.response ? err.response.data.message : "Something went wrong"
        );
      });
  };

  return (
    <div>
      <Button
        type="text"
        shape="round"
        icon={<EditOutlined />}
        style={{ float: "right" }}
        onClick={showDrawer}
      />
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
          Update Your Experience
        </Title>
        <div>
          <Form
            form={form}
            layout="vertical"
            name="control-hooks"
            style={{ width: "100%" }}
            onFinish={onFinish}
            initialValues={props.data}
          >
            <Form.Item label="Institution" name="institution" required={true}>
              <Input required />
            </Form.Item>
            <Form.Item label="Designation" name="designation" required={true}>
              <Input required />
            </Form.Item>
            <Form.Item
              label="Natuer of Appointment"
              name="natureOfAppointment"
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
              valuePropName="checked"
              required={true}
            >
              <Switch defaultChecked={isOngoing} onChange={iog} />
            </Form.Item>
            <Row>
              <div>
                <div> Date of Joining</div>
                <DatePicker
                  onChange={settingdateOfJoining}
                  defaultValue={moment(
                    props.data.dateOfJoining
                      ? props.data.dateOfJoining.substring(0, 10)
                      : "2000-01-01",
                    dateFormat
                  )}
                  format={dateFormat}
                  style={{ margin: "10px", marginLeft: "0px" }}
                />
              </div>

              {isOngoing === false ? (
                <div>
                  <div>Date of Leaving</div>
                  <DatePicker
                    style={{ margin: "10px", marginLeft: "0px" }}
                    onChange={settingdateOfLeaving}
                    defaultValue={moment(
                      props.data.dateOfLeaving
                        ? props.data.dateOfLeaving.substring(0, 10)
                        : "2000-01-01",
                      dateFormat
                    )}
                    format={dateFormat}
                  />
                </div>
              ) : (
                <div></div>
              )}
            </Row>
            <Form.Item label="Remarks" name="remarks" required={true}>
              <Input.TextArea rows={4} showCount maxLength={200} />
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
        </div>
      </Drawer>
    </div>
  );
}

export default Experience_Update;
