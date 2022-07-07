import React, { useState, useEffect } from "react";
// import { Card } from "antd";

import {
  Drawer,
  Form,
  Input,
  Switch,
  Button,
  Typography,
  message,
  Spin,
  Select,
} from "antd";

import { BASE_URL } from "../../../../../@constant/config";
import axios from "axios";
import { DatePicker } from "antd";
import { EditOutlined } from "@ant-design/icons";
import moment from "moment";

const { Title } = Typography;

const dateFormat = "YYYY-MM-DD";

function Research_Update(props) {
  const [form] = Form.useForm();
  const [form_visible, setform_visible] = useState(false);
  const [isongoing, setisongoing] = useState(false);
  const [publicationDate, setpublicationDate] = useState(null);
  const token = localStorage.getItem("ERPAM_TOKEN");
  const [formData, setformData] = useState(null);
  const [facultyData, setfacultyData] = useState(null);

  const getData = () => {
    axios({
      method: "get",
      url: String(BASE_URL + "/faculty/all"),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        let data = res.data.body;
        setfacultyData(data);
      })
      .catch((err) => {
        message.error(
          err.response ? err.response.data.message : "Something went wrong"
        );
      });
  };

  useEffect(() => getData(),);

  function settingPublicationDate(date, dateString) {
    setpublicationDate(dateString);
  }
  const fetchFormData = () => {
    axios
      .get(BASE_URL + `/student/research/${props.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        let data = res.data.body;
        console.log(data);
        setformData(data);
        setisongoing(data.isOngoing);
        if (data.publicationDate)
          setpublicationDate(data.publicationDate.substring(0, 10));
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
  function iog(checked) {
    setisongoing(checked);
  }
  function changeParentsState() {
    props.forceUpdateHandler();
  }

  function onClose() {
    setform_visible(false);
  }

  const onFinish = (values) => {
    let data = {};
    if (isongoing) {
      data = {
        title: values.title,
        description: values.description,
        isOngoing: isongoing,
        publicationDate: null,
        publisher: values.publisher,
        faculty: values.faculty,
        SupportURL: values.SupportURL,
      };
    } else {
      data = {
        title: values.title,
        description: values.description,
        isOngoing: isongoing,
        publicationDate: publicationDate,
        publisher: values.publisher,
        faculty: values.faculty,
        SupportURL: values.SupportURL,
      };
    }
    axios({
      method: "patch",
      url: String(BASE_URL + `/student/research/${props.id}`),
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
          message.success("Research Updated");
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
        width={580}
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
          Update Research
        </Title>

        <div>
          {" "}
          {formData === null ? (
            <Spin />
          ) : (
            <Form
              initialValues={formData}
              layout="vertical"
              name="control-hooks"
              onFinish={onFinish}
              form={form}
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
              <Form.Item label="Publisher" name="publisher">
                <Input defaultValue={formData.publisher} />
              </Form.Item>
              <Form.Item
                label="Is on Going"
                name="isongoing"
                valuePropName="checked"
              >
                <Switch defaultChecked={isongoing} onChange={iog} />
              </Form.Item>
              {isongoing === false ? (
                <Form.Item label="Publication Date" required={true}>
                  <DatePicker
                    onChange={settingPublicationDate}
                    defaultValue={moment(formData.publicationDate, dateFormat)}
                    format={dateFormat}
                  />
                </Form.Item>
              ) : (
                <div></div>
              )}

              <Form.Item label="Faculty" name="faculty" required={true}>
                <Select defaultValue={formData.faculty.name} required>
                  {facultyData.map((data, i) => {
                    return (
                      <Select.Option key={i} value={data._id}>
                        {data.name}
                      </Select.Option>
                    );
                  })}
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

export default Research_Update;
