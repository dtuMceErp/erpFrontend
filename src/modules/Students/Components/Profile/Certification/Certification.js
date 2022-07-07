import React, { useState } from "react";
import { Card } from "antd";
import { Drawer, Form, Input, Button, Typography, message } from "antd";

import { BASE_URL } from "../../../../../@constant/config";
import axios from "axios";
import { DatePicker } from "antd";

const { Title } = Typography;

function Certification(props) {
  const [form] = Form.useForm();
  const [form_visible, setform_visible] = useState(false);
  const [issuedDate, setissueDate] = useState();
  const token = localStorage.getItem("ERPAM_TOKEN");
  function settingissuedDate(date, dateString) {
    setissueDate(dateString);
  }
  function changeParentsState() {
    props.forceUpdateHandler();
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
    data = {
      title: values.title,
      issuingOrganisation: values.issued_by,
      issueDate: issuedDate,
      SupportURL: values.SupportURL,
    };
    axios({
      method: "post",
      url: String(BASE_URL + "/student/certification/create"),
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
          message.success("Certification added successfully");
        }
        changeParentsState();
      })
      .catch((err) => {
        console.log(err.resonse);
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
            style={{
              marginLeft: "23px",
              marginBottom: "5px",
              height: "80px",
              width: "auto",
            }}
            src="./assets/certificate.png"
            alt="img"
          />
          <div>Add Certificate</div>
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
          Add New Certificate
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

          <Form.Item label="Issued By" name="issued_by" required={true}>
            <Input required />
          </Form.Item>

          <Form.Item label="Issued on" required={true}>
            <DatePicker onChange={settingissuedDate} format="MM-DD-YYYY" />
          </Form.Item>

          <Form.Item label="SupportURL" name="SupportURL" required={true}>
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

export default Certification;
