import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Select,
  Switch,
  message,
  Button,
  Checkbox,
  Row,
  // Col,
  Typography,
  DatePicker,
  Space,
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { BASE_URL } from "../../@constant/config";
import axios from "axios";
import { useSelector } from "react-redux";
import { UI_COLORS } from "../../@constant/constant";

const { Title } = Typography;

function Meeting_Call_Faculty(props) {
  const [componentSize, setComponentSize] = useState("default");
  const [facultyData, setfacultyData] = useState(null);
  const [committeeData, setcommitteeData] = useState(null);
  const [ilt, setILT] = useState(false);
  const [date, setDate] = useState();
  const [form] = Form.useForm();
  const token = localStorage.getItem("ERPAM_TOKEN");
  const currentFaculty = useSelector(
    (state) => state.FacultyReducer.facultyData
  );

  function ILT(checked) {
    setILT(checked);
  }

  function settingDate(date, dateString) {
    setDate(dateString);
  }

  const getFacultyData = () => {
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

  const getCommitteeData = () => {
    axios({
      method: "get",
      url: String(BASE_URL + "/committee/all"),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        let data = res.data.body.memberCommittee.concat(
          res.data.body.chairpersonCommittee
        );
        setcommitteeData(data);
      })
      .catch((err) => {
        message.error(
          err.response ? err.response.data.message : "Something went wrong"
        );
      });
  };

  useEffect(() => {
    getFacultyData();
    getCommitteeData();
  }, );

  const onFinish = (values) => {
    let data = {};
    if (ilt) {
      data = {
        title: values.title,
        description: values.description,
        date: date,
        purposeOfConduct: values.purposeOfConduct,
        venue: values.venue,
        organizer: currentFaculty.faculty._id || "",
        participants: values.participants,
        attachment: values.attachment,
        isLinkedTo: ilt,
        linkedCommitee: values.linkedCommittee,
      };
    } else {
      data = {
        title: values.title,
        description: values.description,
        date: date,
        purposeOfConduct: values.purposeOfConduct,
        venue: values.venue,
        organizer: currentFaculty.faculty._id || "",
        participants: values.participants,
        attachment: values.attachment,
        isLinkedTo: ilt,
      };
    }
    axios({
      method: "post",
      url: String(BASE_URL + "/meeting/create"),
      data: data,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        console.log(data);
        if (res.status === 200) {
          form.resetFields();
          message.success("New Committee created successfully");
        }
      })
      .catch((err) => {
        console.log(data);
        message.error(
          err.response ? err.response.data.message : "Something went wrong"
        );
      });
  };

  // function onChange(checkedValues) {
  //   console.log("checked = ", checkedValues);
  // }

  const onFormLayoutChange = ({ size }) => setComponentSize(size);

  if (facultyData === null || committeeData === null) {
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
        Call a new Meeting
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
          <Form.Item label="Title" name="title" required={true}>
            <Input required />
          </Form.Item>

          <Form.Item label="Description" name="description" required={true}>
            <Input.TextArea rows={4} showCount maxLength={200} required />
          </Form.Item>

          <Form.Item label="Date" name="date" required={true}>
            <DatePicker onChange={settingDate} format="MM-DD-YYYY" />
          </Form.Item>

          <Form.Item
            label="Purpose of Conduct"
            name="purposeOfConduct"
            required={true}
          >
            <Input.TextArea rows={4} showCount maxLength={200} required />
          </Form.Item>

          <Form.Item label="Venue" name="venue" required={true}>
            <Input required />
          </Form.Item>

          <Form.Item label="Participants" name="participants" required={true}>
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

          <Form.Item label="Is Linked To" name="isLinkedTo">
            <Switch defaultChecked={false} onChange={ILT} />
          </Form.Item>

          {ilt === false ? (
            <div></div>
          ) : (
            <Form.Item
              label="Committee name"
              name="linkedCommittee"
              style={{ textAlign: "left" }}
              required={true}
            >
              <Select>
                {committeeData.map((data, i) => {
                  return (
                    <Select.Option key={i} value={data._id}>
                      {data.name}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
          )}

          <Form.List name="attachment">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, fieldKey, ...restField }) => (
                  <Space
                    key={key}
                    style={{ display: "flex", marginBottom: 8 }}
                    align="baseline"
                  >
                    <Form.Item
                      {...restField}
                      name={[name, "label"]}
                      fieldKey={[fieldKey, "first"]}
                      rules={[{ required: true, message: "Label Missing" }]}
                    >
                      <Input placeholder="label" required />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "url"]}
                      fieldKey={[fieldKey, "last"]}
                      rules={[{ required: true, message: "Link Missing" }]}
                    >
                      <Input placeholder="url" required />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    Add Attachment
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>

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

export default Meeting_Call_Faculty;
