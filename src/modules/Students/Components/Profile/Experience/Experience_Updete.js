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
  Spin,
} from "antd";
import { BASE_URL } from "../../../../../@constant/config";
import axios from "axios";
import { DatePicker } from "antd";
import { EditOutlined } from "@ant-design/icons";
import moment from "moment";

const { Title } = Typography;

const dateFormat = "YYYY-MM-DD";

function Experience_Updete(props) {
  const [form] = Form.useForm();
  const [form_visible, setform_visible] = useState(false);
  const [Startdate, setStartdate] = useState();
  const [Enddate, setEnddate] = useState();
  const [isongoing, setisongoing] = useState(false);
  const token = localStorage.getItem("ERPAM_TOKEN");
  const [formData, setformData] = useState(null);

  const fetchFormData = () => {
    axios
      .get(BASE_URL + `/student/experience/${props.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        let data = res.data.body;
        setformData(data);
        setisongoing(data.isOngoing);
        setStartdate(data.startDate.substring(0, 10));
        if (data.endDate) setEnddate(data.endDate.substring(0, 10));
      })

      .catch((err) => {
        message.error(
          err.response ? err.response.data.message : "Something went wrong"
        );
      });
  };

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
        endDate: null,
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
      method: "patch",
      url: String(BASE_URL + `/student/experience/${props.id}`),
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
          message.success("Experience updated successfully");
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
    fetchFormData();
  }

  function onClose() {
    setform_visible(false);
  }

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
          Update Experience
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
              style={{ width: "100%" }}
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
              <Form.Item label="Company" name="company">
                <Input defaultValue={formData.company} />
              </Form.Item>
              <Form.Item
                label="Employment Type"
                name="Type"
                style={{ textAlign: "left" }}
              >
                <Select defaultValue={formData.employmentType}>
                  <Select.Option value="Full-time">Full-time</Select.Option>
                  <Select.Option value="Part-time">Part-time</Select.Option>
                  <Select.Option value="Internship">Internship</Select.Option>
                  <Select.Option value="Trainee">Trainee</Select.Option>
                  <Select.Option value="Freelancer">Freelancer</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item
                label="Is on Going"
                name="isongoing"
                valuePropName="checked"
              >
                <Switch defaultChecked={isongoing} onChange={iog} />
              </Form.Item>
              <Row>
                <Form.Item label="Start Date" name="startdate" required={true}>
                  <DatePicker 
                    format={dateFormat} 
                    onChange={settingstartdate}
                    defaultValue={moment(formData.startDate, dateFormat)}
                  />
                </Form.Item>
                {isongoing === false ? (
                  <Form.Item
                    label="End Date"
                    name="enddate"
                    required={true}
                    style={{ marginLeft: "20px" }}
                  >
                    <DatePicker 
                      format={dateFormat} 
                      onChange={settingenddate}
                      defaultValue={moment(formData.endDate, dateFormat)}
                    />
                  </Form.Item>
                ) : (
                  <div></div>
                )}
              </Row>

              <Form.Item label="Support URL" name="SupportURL">
                <Input defaultValue={formData.SupportURL} />
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
          )}
        </div>
      </Drawer>
    </div>
  );
}

export default Experience_Updete;
