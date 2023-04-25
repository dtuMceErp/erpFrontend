import React, { useState } from "react";
import { Card } from "antd";
// import { PlusOutlined } from "@ant-design/icons";
import { Drawer, Form, Input, Select, Button, Typography, message } from "antd";
import { BASE_URL } from "../../../../../@constant/config";
import axios from "axios";
// import { useSelector } from "react-redux";
const { Title } = Typography;

function Achievement(props) {
  const [form] = Form.useForm();
  const [form_visible, setform_visible] = useState(false);
  const token = localStorage.getItem("ERPAM_TOKEN");

  function showDrawer() {
    setform_visible(true);
    // console.log(form_visible);
  }

  function onClose() {
    setform_visible(false);
    // console.log(form_visible);
  }
  function changeParentsState() {
    props.forceUpdateHandler();
  }

  const onFinish = (values) => {
    let data = {};

    data = {
      title: values.title,
      // company: values.company,
      description: values.description,
      achievementType: values.Type,
      SupportURL: values.SupportURL,
    };

    axios({
      method: "post",
      url: String(BASE_URL + "/student/achievement/create"),
      data: data,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        // console.log(res);
        form.resetFields();
        if (res.status === 201) {
          message.success("Achievement added successfully");
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
            src="./assets/Achievement.png"
            alt="img"
          />
          <div>Achievement</div>
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
          Add New Achievement
        </Title>
        <Form
          onFinish={onFinish}
          form={form}
          layout="vertical"
          name="control-hooks"
        >
          <Form.Item label="Title" name="title" required={true}>
            <Input required />
          </Form.Item>

          <Form.Item label="Description" name="description" required={true}>
            <Input.TextArea rows={4} showCount maxLength={200} required />
          </Form.Item>

          <Form.Item
            label="Achievement Type"
            name="Type"
            style={{ textAlign: "left" }}
            required={true}
          >
            <Select>
              <Select.Option value="Music">Music</Select.Option>
              <Select.Option value="Dance">Dance</Select.Option>
              <Select.Option value="Debate">Debate</Select.Option>
              <Select.Option value="Coding">Coding</Select.Option>
              <Select.Option value="Academic">Academic</Select.Option>
              <Select.Option value="Sports">Sports</Select.Option>
              <Select.Option value="Other">Other</Select.Option>
            </Select>
          </Form.Item>

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

export default Achievement;
