import React, { useState } from "react";

import {
  Drawer,
  Form,
  Input,
  Select,
  Button,
  Typography,
  message,
  Spin,
} from "antd";
import { BASE_URL } from "../../../../../@constant/config";
import axios from "axios";
import { EditOutlined } from "@ant-design/icons";
const { Title } = Typography;

function Achievement_Update(props) {
  const [form] = Form.useForm();
  const [form_visible, setform_visible] = useState(false);
  const token = localStorage.getItem("ERPAM_TOKEN");
  const [formData, setformData] = useState(null);

  const fetchFormData = () => {
    axios
      .get(BASE_URL + `/student/achievement/${props.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        let data = res.data.body;
        setformData(data);
      })

      .catch((err) => {
        message.error(
          err.response ? err.response.data.message : "Something went wrong"
        );
      });
  };

  function showDrawer() {
    setform_visible(true);
    fetchFormData();
  }

  function onClose() {
    setform_visible(false);
  }

  function changeParentsState() {
    props.forceUpdateHandler();
  }

  const onFinish = (values) => {
    let data = {};

    data = {
      title: values.title,
      description: values.description,
      achievementType: values.Type,
      SupportURL: values.SupportURL,
    };

    axios({
      method: "patch",
      url: String(BASE_URL + `/student/achievement/${props.id}`),
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
          Update Achievement
        </Title>

        <div>
          {formData === null ? (
            <Spin />
          ) : (
            <Form
              onFinish={onFinish}
              form={form}
              layout="vertical"
              name="control-hooks"
            >
              <Form.Item label="Title" name="title">
                <Input defaultValue={formData.title} />
              </Form.Item>
              <Form.Item label="Description" name="description">
                <Input.TextArea
                  rows={4}
                  showCount
                  maxLength={200}
                  defaultValue={formData.description}
                />
              </Form.Item>

              <Form.Item
                label="Achievement Type"
                name="Type"
                style={{ textAlign: "left" }}
              >
                <Select defaultValue={formData.achievementType}>
                  <Select.Option value="Music">Music</Select.Option>
                  <Select.Option value="Dance">Dance</Select.Option>
                  <Select.Option value="Debate">Debate</Select.Option>
                  <Select.Option value="Coding">Coding</Select.Option>
                  <Select.Option value="Academic">Academic</Select.Option>
                  <Select.Option value="Sports">Sports</Select.Option>
                  <Select.Option value="Other">Other</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item label="Support URL" name="SupportURL">
                <Input defaultValue={formData.SupportURL} />
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
          )}
        </div>
      </Drawer>
    </div>
  );
}

export default Achievement_Update;
