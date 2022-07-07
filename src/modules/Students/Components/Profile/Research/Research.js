import React, { useState, useEffect } from "react";
import { Card } from "antd";
import {
  Drawer,
  Form,
  Input,
  Switch,
  Button,
  Typography,
  message,
  Select,
} from "antd";

import { BASE_URL } from "../../../../../@constant/config";
import axios from "axios";
import { DatePicker } from "antd";

const { Title } = Typography;

function Research(props) {
  const [form] = Form.useForm();
  const [form_visible, setform_visible] = useState(false);
  const [isongoing, setisongoing] = useState(false);
  const [publicationDate, setpublicationDate] = useState(null);
  const token = localStorage.getItem("ERPAM_TOKEN");
  const [facultyData, setfacultyData] = useState(null);

  useEffect(() => {
    // console.log("data fetching");
    getData();
  },);

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
        // console.log(data);
        setfacultyData(data);
      })
      .catch((err) => {
        message.error(
          err.response ? err.response.data.message : "Something went wrong"
        );
      });
  };

  function settingPublicationDate(date, dateString) {
    setpublicationDate(dateString);
  }

  function showDrawer() {
    setform_visible(true);
    console.log(form_visible);
  }
  function iog(checked) {
    setisongoing(checked);
  }
  function changeParentsState() {
    props.forceUpdateHandler();
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
      method: "post",
      url: String(BASE_URL + "/student/research/create"),
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
          message.success("Research Created");
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
            src="./assets/research.png"
            alt="img"
          />
          <div>New Research</div>
        </Card>
      </div>
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
          Add New Research Work
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
          <Form.Item label="Publisher" name="publisher" required={true}>
            <Input required />
          </Form.Item>
          <Form.Item
            label="Is on Going"
            name="isongoing"
            valuePropName="checked"
          >
            <Switch defaultChecked={false} onChange={iog} />
          </Form.Item>
          {isongoing === false ? (
            <Form.Item label="Publication Date" required={true}>
              <DatePicker
                onChange={settingPublicationDate}
                format="MM-DD-YYYY"
              />
            </Form.Item>
          ) : (
            <div></div>
          )}
          <div>
            {facultyData === null ? (
              <div></div>
            ) : (
              <Form.Item label="Faculty" name="faculty" required={true}>
                <Select required>
                  {facultyData.map((data, i) => {
                    return (
                      <Select.Option key={i} value={data._id}>
                        {data.name}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>
            )}
          </div>

          <Form.Item label="Support url" name="SupportURL" required={true}>
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

export default Research;
