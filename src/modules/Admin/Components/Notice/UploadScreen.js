import React, { useState, useRef } from "react";
import { Form, Input, Select, Switch, message, Button } from "antd";
import { EditableTagGroup, tagsArray } from "./EditableTagGroup";
// import { useHistory, Redirect } from "react-router-dom";
import { BASE_URL } from "../../../../@constant/config";

import axios from "axios";

export function UploadScreen() {
  function clearArray(array) {
    while (array.length) {
      array.pop();
    }
  }
  
  const [isDisabled, setIsDisabled] = useState(false);


  const [componentSize, setComponentSize] = useState("default");
  // let history = useHistory();
  const [form] = Form.useForm();
  const [file, setFile] = useState("");
  const el = useRef();

  const handleChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
  };

  const is_upload_form_valid = (data) => {
    let errors = [];
    if (!data.title) errors.push("Title is required.");
    if (!data.description) errors.push("Description is required.");
    if (!data.category) errors.push("Category is required.");
    if (errors.length) {
      errors.forEach((err) => message.warning(err));
      return false;
    }
    return true;
  };

  const uploadFile = (values) => {
    setIsDisabled(true);
    if (!is_upload_form_valid(values)) return;
    const formData = new FormData();
    formData.append("serialNo", values.serialNo);
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("important", values.important ? values.important : false);
    tagsArray.forEach((item) => {
      formData.append("tags[]", item);
    });
    formData.append("category", values.category);
    formData.append("file", file);
    axios({
      method: "post",
      url: String(BASE_URL + "/notice/create"),
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((res) => {
        setIsDisabled(false);
        if (res.status === 201) {
          form.resetFields();
          setFile("");
          clearArray(tagsArray);
          message.success("Notice was added sucessfully.");
        }
      })
      .catch((err) => {
        setIsDisabled(false);
        message.error("Some error occured");
      });
  };

  const onFormLayoutChange = ({ size }) => setComponentSize(size);

  return (
    <div>
      <br />
      <Form
        layout="vertical"
        initialValues={{ size: componentSize }}
        onValuesChange={onFormLayoutChange}
        size={componentSize}
        onFinish={uploadFile}
        form={form}
        name="control-hooks"
      >
        <Form.Item label="S. No." name="serialNo" required={true}>
          <Input required />
        </Form.Item>

        <Form.Item label="Title" name="title" required={true}>
          <Input required />
        </Form.Item>

        <Form.Item label="Description" name="description" required={true}>
          <Input.TextArea rows={4} showCount maxLength={200} required />
        </Form.Item>

        <Form.Item
          label="Category"
          name="category"
          style={{ textAlign: "left" }}
          required={true}
        >
          <Select>
            <Select.Option value="B.TECH">B.TECH</Select.Option>
            <Select.Option value="M.SC">M.SC</Select.Option>
            <Select.Option value="PHD">PHD</Select.Option>
            <Select.Option value="DEPTARTMENT">DEPTARTMENT</Select.Option>
            <Select.Option value="STAFF">STAFF</Select.Option>
            <Select.Option value="FACULIY">FACULTY</Select.Option>
            <Select.Option value="OTHERS">OTHERS</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="Tags" name="tags" required={true}>
          <EditableTagGroup />
        </Form.Item>
        <Form.Item label="Important" name="important" valuePropName="checked">
          <Switch style={{ float: "left" }} />
        </Form.Item>

        <Form.Item label="Upload" required={true}>
          <input type="file"  ref={el} onChange={handleChange} />
          <br />
          <Button
            type="primary"
            shape="round"
            htmlType="submit"
            className="upbutton"
            style={{ width: "250px" }}
            disabled={isDisabled}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
