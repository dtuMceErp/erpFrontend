import React, { useState } from "react";
import { Card } from "antd";
import {
  Drawer,
  Form,
  Input,
  Switch,
  Button,
  Typography,
  message,
  Row,
  Select,
} from "antd";
import { BASE_URL } from "../../../../../@constant/config";
import axios from "axios";
import { DatePicker } from "antd";
// import { useSelector } from "react-redux";

const { Title } = Typography;

function Experience(props) {
  const [form] = Form.useForm();
  const [form_visible, setform_visible] = useState(false);
  const [Startdate, setStartdate] = useState();
  const [Enddate, setEnddate] = useState();
  const [isongoing, setisongoing] = useState(false);
  const token = localStorage.getItem("ERPAM_TOKEN");

  function settingstartdate(date, dateString) {
    setStartdate(dateString);
  }

  function settingenddate(date, dateString) {
    setEnddate(dateString);
  }
  function changeParentsState() {
    props.forceUpdateHandler();
  }

  function iog(checked) {
    setisongoing(checked);
  }

  const onFinish = (values) => {
    let data = {};
    if (isongoing) {
      data = {
        title: values.title,
        description: values.description,
        company: values.company,
        isOngoing: isongoing,
        startDate: Startdate,
        employmentType: values.Type,
        SupportURL: values.SupportURL,
      };
    } else {
      data = {
        title: values.title,
        company: values.company,
        description: values.description,

        isOngoing: isongoing,
        startDate: Startdate,
        endDate: Enddate,
        employmentType: values.Type,
        SupportURL: values.SupportURL,
      };
    }
    axios({
      method: "post",
      url: String(BASE_URL + "/student/experience/create"),
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

  function showDrawer() {
    setform_visible(true);
    console.log(form_visible);
  }

  function onClose() {
    setform_visible(false);
    console.log(form_visible);
  }

  // function onChange(value, dateString) {
  //   console.log("Selected Time: ", value);
  //   console.log("Formatted Selected Time: ", dateString);
  // }

  // function onOk(value) {
  //   console.log("onOk: ", value);
  // }

  return (
    <div>
      <div
        className="site-card-border-less-wrapper"
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Card
          onClick={showDrawer}
          bordered={false}
          style={{
            width: "150px",
            height: "150px",
            margin: "10px",
            display: "flex",
            flexDirection: "column",
            cursor: "pointer",

            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            style={{ marginLeft: "7px", marginBottom: "5px" }}
            src="./assets/exp.png"
            alt="img"
          />
          <div>New Experience</div>
        </Card>
      </div>
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
          <Form.Item label="Title" name="title" required={true}>
            <Input required />
          </Form.Item>
          <Form.Item label="Description" name="description" required={true}>
            <Input.TextArea rows={4} showCount maxLength={200} required />
          </Form.Item>
          <Form.Item label="Company" name="company" required={true}>
            <Input required />
          </Form.Item>
          <Form.Item
            label="Employment Type"
            name="Type"
            style={{ textAlign: "left" }}
            required={true}
          >
            <Select>
              <Select.Option value="Full-time">Full-time</Select.Option>
              <Select.Option value="Part-time">Part-time</Select.Option>
              <Select.Option value="Internship">Internship</Select.Option>
              <Select.Option value="Trainee">Trainee</Select.Option>
              <Select.Option value="Freelancer">Freelancer</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Is Ongoing"
            name="isongoing"
            valuePropName="checked"
          >
            <Switch defaultChecked={false} onChange={iog} />
          </Form.Item>
          <Row>
            <Form.Item label="Start Date" name="startdate" required={true}>
              <DatePicker onChange={settingstartdate} format="MM-DD-YYYY" />
            </Form.Item>
            {isongoing === false ? (
              <Form.Item
                label="End Date"
                name="enddate"
                required={true}
                style={{ marginLeft: "20px" }}
              >
                <DatePicker onChange={settingenddate} format="MM-DD-YYYY" />
              </Form.Item>
            ) : (
              <div></div>
            )}
          </Row>

          <Form.Item label="Support URL" name="SupportURL" required={true}>
            <Input required />
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
