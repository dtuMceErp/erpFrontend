import React, { useState } from "react";
import {
  Drawer,
  Form,
  Input,
  Select,
  Button,
  Typography,
  message,
  Space,
} from "antd";
import moment from "moment";
import { BASE_URL } from "../../@constant/config";
import axios from "axios";
import { DatePicker } from "antd";
import {
  EditOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";

const { Title } = Typography;

const dateFormat = "YYYY-MM-DD";

function Activity_Update(props) {
  const [form] = Form.useForm();
  const [form_visible, setform_visible] = useState(false);
  const [date, setdate] = useState(props.data.date);
  const token = localStorage.getItem("ERPAM_TOKEN");

  function settingDate(date, dateString) {
    setdate(dateString);
  }
  // useEffect(() => {
  //   setdate(props.date ? props.date.substring(0, 10) : "2000-01-01");
  // }, []);

  function showDrawer() {
    setform_visible(true);
    console.log(form_visible);
  }

  function onClose() {
    setform_visible(false);
    console.log(form_visible);
  }

  function changePState() {
    console.log("called form update");
    props.changeParentState();
  }

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

    axios({
      method: "patch",
      url: String(BASE_URL + `/faculty/activities/update/${props.data._id}`),
      data: data,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        form.resetFields();
        if (res.status === 200) {
          message.success("Professional Activity updated ");
          changePState();
          onClose();
        }
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
          <Form
            form={form}
            layout="vertical"
            name="control-hooks"
            style={{ width: "100%" }}
            onFinish={onFinish}
            initialValues={props.data}
          >
            {/* props.data.title */}
            <Form.Item label="Title" name="title" required={true}>
              <Input required />
            </Form.Item>
            <Form.Item label="Description" name="description" required={true}>
              <Input.TextArea rows={4} required />
            </Form.Item>
            <Form.Item label="Venue" name="venue" required={true}>
              <Input required />
            </Form.Item>
            {/* <Form.Item label="Date" name="Date" required={true}> */}
            <div> Date</div>
            <DatePicker
              style={{ margin: "10px", marginLeft: "0px" }}
              onChange={settingDate}
              defaultValue={moment(
                props.data.date
                  ? props.data.date.substring(0, 10)
                  : "2000-01-01",
                dateFormat
              )}
              format={dateFormat}
            />
            {/* </Form.Item> */}
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
              <Input placeholder="if other" />
            </Form.Item>
            <Form.List name="attachment" initialValue={props.data.attachment}>
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
        </div>
      </Drawer>
    </div>
  );
}

export default Activity_Update;
