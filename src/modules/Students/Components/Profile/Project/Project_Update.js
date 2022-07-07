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

function Project_Update(props) {
  const [form] = Form.useForm();
  const [form_visible, setform_visible] = useState(false);
  const [Startdate, setStartdate] = useState();
  const [Enddate, setEnddate] = useState();
  const [isOngoing, setisOngoing] = useState(false);
  const token = localStorage.getItem("ERPAM_TOKEN");
  const [formData, setformData] = useState(null);

  const fetchFormData = () => {
    axios
      .get(BASE_URL + `/student/project/${props.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        let data = res.data.body;

        setformData(data);
        setisOngoing(data.isOngoing);
        // let startdate = Date(data.startDate);

        // console.log(data.startDate, data.endDate);
        setStartdate(data.startDate.substring(0, 10));

        if (data.endDate) setEnddate(data.endDate.substring(0, 10));
      })

      .catch((err) => {
        message.error(
          err.response ? err.response.data.message : "Something went wrong"
        );
      });
  };

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
    setisOngoing(checked);
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
    if (isOngoing) {
      data = {
        title: values.title,
        description: values.description,
        isOngoing: isOngoing,
        startDate: Startdate,
        endDate: null,
        projectType: values.type,
        SupportURL: values.SupportURL,
      };
    } else {
      data = {
        title: values.title,
        description: values.description,
        isOngoing: isOngoing,
        endDate: Enddate,
        startDate: Startdate,
        projectType: values.type,
        SupportURL: values.SupportURL,
      };
    }
    // console.log(isongoing);
    console.log(data);
    axios({
      method: "patch",
      url: String(BASE_URL + `/student/project/${props.id}`),
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
          message.success("Project updated");
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
          Update your project
        </Title>
        <div>
          {formData === null ? (
            <Spin />
          ) : (
            <Form
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
                  defaultValue={formData.description}
                  rows={4}
                  showCount
                  maxLength={200}
                />
              </Form.Item>

              <Form.Item label="Type" name="type" style={{ textAlign: "left" }}>
                <Select defaultValue={formData.projectType}>
                  <Select.Option value="Personal">Personal</Select.Option>
                  <Select.Option value="Mini">Mini</Select.Option>
                  <Select.Option value="Minor">Minor</Select.Option>
                  <Select.Option value="Major">Major</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item
                label="Is on Going"
                name="isOngoing"
                valuePropName="checked"
              >
                <Switch defaultChecked={isOngoing} onChange={iog} />
              </Form.Item>
              <Row>
                <Form.Item label="Start Date" name="startdate">
                  <DatePicker 
                    format={dateFormat} 
                    onChange={settingstartdate}
                    defaultValue={moment(formData.startDate, dateFormat)}
                  />
                </Form.Item>
                {isOngoing === false ? (
                  <Form.Item
                    label="End Date"
                    name="enddate"
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

export default Project_Update;
