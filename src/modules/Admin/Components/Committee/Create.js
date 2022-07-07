import React, { useState, useEffect } from "react";
import {
  // Spin,
  Form,
  Input,
  Select,
  // Switch,
  message,
  Button,
  Checkbox,
  Row,
  // Col,
  Typography,
} from "antd";
import { BASE_URL } from "../../../../@constant/config";
import axios from "axios";
import { UI_COLORS } from "../../../../@constant/constant";

const { Title } = Typography;

function Committee_Create(props) {
  const [componentSize, setComponentSize] = useState("default");
  const [facultyData, setfacultyData] = useState(null);
  const [form] = Form.useForm();
  const token = localStorage.getItem("ERPAM_TOKEN");

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

  const is_upload_form_valid = (data) => {
    let errors = [];
    if (!data.name) errors.push("Name is required.");
    if (!data.purpose) errors.push("Purpose is required");
    if (!data.chairPerson) errors.push("Chair Person is required");
    if (!data.description) errors.push("Description is required.");
    if (errors.length) {
      errors.forEach((err) => message.warning(err));
      return false;
    }
    return true;
  };

  const onFinish = (values) => {
    if (!is_upload_form_valid(values)) return;
    let data = {};
    data = {
      name: values.name,
      purpose: values.purpose,
      chairPerson: values.chairPerson,
      members: values.members,
      description: values.description,
      isDeleted: false,
    };
    axios({
      method: "post",
      url: String(BASE_URL + "/committee/create"),
      data: data,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status === 200) {
          // console.log(data);
          form.resetFields();
          message.success("New Committee created successfully");
        }
      })
      .catch((err) => {
        message.error(
          err.response ? err.response.data.message : "Something went wrong"
        );
      });
  };

  // function onChange(checkedValues) {
  //   console.log("checked = ", checkedValues);
  // }

  const onFormLayoutChange = ({ size }) => setComponentSize(size);

  if (facultyData === null) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <Title
        level={2}
        style={{
          marginLeft: "30px",
          marginRight: "20px",
          marginTop: "30px",
          color: UI_COLORS.PRIMARY_COLOR,
        }}
      >
        Create a new Committee
      </Title>
      <br />
      <div
        className="site-layout-background"
        style={{
          padding: 24,
          minHeight: 360,
          borderRadius: "20px",
          margin: "20px",
          marginTop: "0px",
        }}
      >
        <Form
          layout="vertical"
          initialValues={{ size: componentSize }}
          onValuesChange={onFormLayoutChange}
          size={componentSize}
          onFinish={onFinish}
          form={form}
          name="control-hooks"
        >
          <Form.Item label="Name" name="name" required={true}>
            <Input required />
          </Form.Item>

          <Form.Item label="Purpose" name="purpose" required={true}>
            <Input.TextArea rows={4} showCount maxLength={200} required />
          </Form.Item>

          <Form.Item
            label="Chair Person"
            name="chairPerson"
            style={{ textAlign: "left" }}
            required={true}
          >
            <Select>
              {facultyData.map((data, i) => {
                return (
                  <Select.Option key={i} value={data._id}>
                    {data.name}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>

          <Form.Item label="Members" name="members" required={true}>
            <Checkbox.Group>
              <Row>
                {facultyData.map((data, i) => {
                  return (
                    <Checkbox key={i} value={data._id}>
                      {data.name}
                    </Checkbox>
                  );
                })}
              </Row>
            </Checkbox.Group>
          </Form.Item>

          <Form.Item label="Description" name="description" required={true}>
            <Input.TextArea rows={4} showCount maxLength={200} required />
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
      </div>
    </div>
  );
}

export default Committee_Create;
