import React, { useState } from "react";
// import { Card } from "antd";
import { Drawer, Form, Input, Button, Typography, message, Spin } from "antd";

import { BASE_URL } from "../../../../../@constant/config";
import axios from "axios";
import { DatePicker } from "antd";
import { EditOutlined } from "@ant-design/icons";
import moment from "moment";

const { Title } = Typography;
const dateFormat = "YYYY-MM-DD";

function Certification(props) {
  const [form] = Form.useForm();
  const [form_visible, setform_visible] = useState(false);
  const [issuedDate, setissueDate] = useState();
  const token = localStorage.getItem("ERPAM_TOKEN");

  const [formData, setformData] = useState(null);

  const fetchFormData = () => {
    axios
      .get(BASE_URL + `/student/certification/${props.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        let data = res.data.body;
        setformData(data);
        setissueDate(data.issueDate.substring(0, 10));
      })

      .catch((err) => {
        message.error(
          err.response ? err.response.data.message : "Something went wrong"
        );
      });
  };

  function settingissuedDate(date, dateString) {
    setissueDate(dateString);
  }
  function changeParentsState() {
    props.forceUpdateHandler();
  }

  function showDrawer() {
    setform_visible(true);
    fetchFormData();
  }

  function onClose() {
    setform_visible(false);
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
      method: "patch",
      url: String(BASE_URL + `/student/certification/${props.id}`),
      data: data,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        // console.log(res);
        form.resetFields();
        if (res.status === 200) {
          message.success("Certification updated successfully");
        }
        changeParentsState();
      })
      .catch((err) => {
        // console.log(err.resonse);
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
          Update Certificate
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

              <Form.Item label="Issued By" name="issued_by">
                <Input defaultValue={formData.issuingOrganisation} />
              </Form.Item>

              <Form.Item label="Issued on">
                <DatePicker 
                  format={dateFormat} 
                  onChange={settingissuedDate}
                  defaultValue={moment(formData.issueDate, dateFormat)}
                />
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

export default Certification;
