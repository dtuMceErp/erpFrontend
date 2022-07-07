import React, { useState } from "react";
import { Card } from "antd";
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
} from "antd";
import { BASE_URL } from "../../../../../@constant/config";
import axios from "axios";
import { DatePicker } from "antd";

const { Title } = Typography;

function Projects(props) {
  const [form] = Form.useForm();
  const [form_visible, setform_visible] = useState(false);
  const [Startdate, setStartdate] = useState();
  const [Enddate, setEnddate] = useState();
  const [isongoing, setisongoing] = useState(false);
  const token = localStorage.getItem("ERPAM_TOKEN");

  function changeParentsState() {
    props.forceUpdateHandler();
  }

  function settingstartdate(date, dateString) {
    setStartdate(dateString);
  }

  function settingenddate(date, dateString) {
    setEnddate(dateString);
  }

  function iog(checked) {
    setisongoing(checked);
  }

  function showDrawer() {
    setform_visible(true);
    console.log(form_visible);
  }

  function onClose() {
    setform_visible(false);
    console.log(form_visible);
  }

  const onFinish = (values) => {
    let data = {};
    if (isongoing) {
      data = {
        title: values.title,
        description: values.description,
        isOngoing: isongoing,
        startDate: Startdate,
        projectType: values.type,
        SupportURL: values.SupportURL,
      };
    } else {
      data = {
        title: values.title,
        description: values.description,
        isOngoing: isongoing,
        endDate: Enddate,
        startDate: Startdate,
        projectType: values.type,
        SupportURL: values.SupportURL,
      };
    }
    axios({
      method: "post",
      url: String(BASE_URL + "/student/project/create"),
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
          message.success("Project Created");
        }
        changeParentsState();
      })
      .catch((err) => {
        message.error(
          err.response ? err.response.data.message : "Something went wrong"
        );
      });
  };

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
            src="./assets/new-proj.png"
            alt="img"
          />
          <div>Add new Project</div>
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
          Add New Project
        </Title>

        <Form
          layout="vertical"
          name="control-hooks"
          onFinish={onFinish}
          form={form}
        >
          <Form.Item label="Title" name="title" required={true}>
            <Input required />
          </Form.Item>

          <Form.Item label="Description" name="description" required={true}>
            <Input.TextArea rows={4} showCount maxLength={200} required />
          </Form.Item>

          <Form.Item
            label="Type"
            name="type"
            style={{ textAlign: "left" }}
            required={true}
          >
            <Select>
              <Select.Option value="Personal">Personal</Select.Option>
              <Select.Option value="Mini">Mini</Select.Option>
              <Select.Option value="Minor">Minor</Select.Option>
              <Select.Option value="Major">Major</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Is on Going"
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
            style={{ width: "100%" }}
          >
            Submit
          </Button>
        </Form>
      </Drawer>
    </div>
  );
}

export default Projects;
