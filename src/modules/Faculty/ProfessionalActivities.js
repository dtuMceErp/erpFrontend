import React, { useState } from "react";
import {
  // Spin,
  // Switch,
  Typography,
  Button,
  Form,
  Drawer,
  Input,
  Select,
  Space,
  DatePicker,
  message,
  Popconfirm,
  Col,
  Row,
  Divider,
} from "antd";
// import { UI_COLORS } from "../../@constant/constant";
import { useSelector } from "react-redux";
import {
  MinusCircleOutlined,
  PlusOutlined,
  QuestionCircleOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { BASE_URL } from "../../@constant/config";
import ActivityUpdate from "./ActivityUpdate";

const { Title } = Typography;
// const dateFormat = "DD/MM/YYYY";

const DescriptionItem = ({ title, content }) => (
  <div className="site-description-item-profile-wrapper">
    <p className="site-description-item-profile-p-label">{title}:</p>
    {content}
  </div>
);

function ProfessionalActivities(props) {
  const [form] = Form.useForm();
  const [form_visible, setform_visible] = useState(false);
  const [date, setdate] = useState();
  const token = localStorage.getItem("ERPAM_TOKEN");

  function settingDate(date, dateString) {
    setdate(dateString);
  }

  function changeParentsState() {
    props.forceUpdateHandler();
  }

  function deleting(id) {
    axios({
      method: "delete",
      url: String(BASE_URL + `/faculty/activities/delete/${id}`),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status === 201) {
          message.success("Activity deleted successfully");
        }
        changeParentsState();
      })
      .catch((err) => {
        message.error(
          err.response ? err.response.data.message : "Something went wrong"
        );
      });
  }

  function showDrawer() {
    setform_visible(true);
    // console.log(form_visible);
  }

  function onClose() {
    setform_visible(false);
    // console.log(form_visible);
  }
  const data = useSelector((state) => state.FacultyReducer.facultyData);

  const onFinish = (values) => {
    // console.log(values);
    let data = {};
    data = {
      title: values.title,
      description: values.description,
      venue: values.venue,
      date: date,
      category: values.category,
      otherCategoryName: values.otherCategoryName,
      attachment: values.attachment,
    };

    // console.log(data);
    axios({
      method: "post",
      url: String(BASE_URL + "/faculty/activities/create"),
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
          message.success("Professional Activity added");
        }
        changeParentsState();
      })
      .catch((err) => {
        message.error(
          err.response ? err.response.data.message : "Something went wrong"
        );
      });
  };

  if (data === null) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <div style={{ margin: "16px 0", display: "flex" }}>
        <p
          className="site-description-item-profile-p"
          style={{
            fontWeight: "bold",
            fontSize: "22px",
            textDecoration: "underline",
            margin: "20px",
          }}
        >
          Professional Activities
        </p>
        <div
          className="switch"
          style={{
            margin: "26px 0",
            position: "absolute",
            right: "0",
          }}
        >
          <Button
            type="primary"
            shape="round"
            className="upbutton"
            style={{ width: "200px", marginRight: "40px", marginLeft: "20px" }}
            onClick={showDrawer}
          >
            Create a new Entry
          </Button>
        </div>
      </div>
      <div
        style={{
          background: "white",
          padding: "20px",
          margin: "20px",
          borderRadius: "20px",
        }}
      >
        <div>
          {data.faculty.professionalActivities
            .map(function (details, i) {
              return (
                <div key={i}>
                  <Popconfirm
                    title="Are you sure to delete this item?"
                    icon={<QuestionCircleOutlined style={{ color: "red" }} />}
                    onConfirm={() => deleting(details._id)}
                  >
                    <Button
                      danger
                      type="text"
                      shape="round"
                      icon={<DeleteOutlined />}
                      style={{ float: "right", marginLeft: "20px" }}
                    />
                  </Popconfirm>

                  <ActivityUpdate
                    data={details}
                    changeParentState={props.forceUpdateHandler}
                  />
                  <Row>
                    <Col span={12}>
                      <DescriptionItem title="Title" content={details.title} />
                    </Col>
                    <Col span={12}>
                      <DescriptionItem
                        title="Type"
                        content={details.category}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24}>
                      <DescriptionItem
                        title="Description"
                        content={details.description}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col span={12}>
                      <DescriptionItem
                        title="Date"
                        content={
                          details.date ? details.date.substring(0, 10) : " "
                        }
                      />
                    </Col>
                    <Col span={12}>
                      <div>
                        {details.attachment.map(function (value, i) {
                          return (
                            <div key={i}>
                              <Row>
                                <DescriptionItem
                                  title="Label"
                                  content={value.label}
                                />
                                <div style={{ marginLeft: "20px" }}>
                                  <DescriptionItem
                                    title="URL"
                                    content={<a href="#*">{value.url}</a>}
                                  />
                                </div>
                              </Row>
                            </div>
                          );
                        })}
                      </div>
                    </Col>
                  </Row>
                  <Divider />
                </div>
              );
            })
            .reverse()}
        </div>
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
          Add New Activity
        </Title>
        <Form
          form={form}
          layout="vertical"
          name="control-hooks"
          style={{ width: "100%" }}
          onFinish={onFinish}
        >
          <Form.Item label="Title" name="title" required={true}>
            <Input required />
          </Form.Item>
          <Form.Item label="Description" name="description" required={true}>
            <Input.TextArea rows={4} required />
          </Form.Item>
          <Form.Item label="Venue" name="venue" required={true}>
            <Input required />
          </Form.Item>
          <Form.Item label="Date" name="Date" required={true}>
            <DatePicker onChange={settingDate} format="MM-DD-YYYY" required />
          </Form.Item>
          <Form.Item label="Category" name="category" required={true}>
            <Select required>
              <Select.Option value="Seminars">Seminars</Select.Option>
              <Select.Option value="Conferences">Conferences</Select.Option>
              <Select.Option value="Workshops">Workshops</Select.Option>
              <Select.Option value="Expert-Lectures">
                Expert Lectures
              </Select.Option>
              <Select.Option value="Others">Others</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Other Category Name" name="otherCategoryName">
            <Input placeholder="If Other" />
          </Form.Item>
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

          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form>
      </Drawer>
    </div>
  );
}

export default ProfessionalActivities;
