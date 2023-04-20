import React from "react";
import { Button, Form, Input, DatePicker, Radio, message } from "antd";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../@constant/config";
import axios from "axios";
import moment from "moment";

const dateFormat = "YYYY-MM-DD";

function Personal(props) {
  const [form] = Form.useForm();
  const data = useSelector((state) => state.FacultyReducer.facultyData);
  const [date, setdate] = useState();
  const token = localStorage.getItem("ERPAM_TOKEN");

  function settingDate(date, dateString) {
    setdate(dateString);
  }

  function changeParentsState() {
    props.forceUpdateHandler();
  }

  useEffect(() => {
    if (data) {
      setdate(
        data.faculty.personalInformation.dob
          ? data.faculty.personalInformation.dob.substring(0, 10)
          : "2000-01-01"
      );
    }
  }, [data]);

  const onFinish = (values) => {
    let data = {};

    data = {
      phone: values.phone,
      fatherName: values.fatherName,
      motherName: values.motherName,
      spouseName: values.spouseName,
      category: values.category,
      dob: date,
      correspondenceAddress: values.correspondenceAddress,
      permanentAddress: values.permanentAddress,
    };

    axios({
      method: "patch",
      url: String(BASE_URL + `/faculty/personal/update/`),
      data: data,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        // console.log(data);
        if (res.status === 200) {
          message.success("Personal information updated");
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
      <p
        className="site-description-item-profile-p"
        style={{
          fontWeight: "bold",
          textDecoration: "underline",
          margin: "20px",
        }}
      >
        Personal Information
      </p>

      <div
        style={{
          padding: "25px",
        }}
      >
        <Form
          layout="vertical"
          form={form}
          onFinish={onFinish}
          initialValues={data.faculty.personalInformation}
        >
          <Form.Item label="Name" name="Name">
            <Input defaultValue={data.faculty.name} />
          </Form.Item>
          <Form.Item label="Phone" name="phone">
            <Input />
          </Form.Item>
          <Form.Item label="Email" name="email" disabled>
            <Input defaultValue={data.user.email} />
          </Form.Item>
          <Form.Item label="Father's Name" name="fatherName">
            <Input />
          </Form.Item>
          <Form.Item label="Mother's Name" name="motherName">
            <Input />
          </Form.Item>
          <Form.Item label="Spouse's Name" name="spouseName">
            <Input />
          </Form.Item>
          <div> Date of Birth</div>
          <DatePicker
              onChange={settingDate}
              defaultValue={moment(
                data.faculty.personalInformation.dob
                  ? data.faculty.personalInformation.dob.substring(0, 10)
                  : "2000-01-01",
                dateFormat
              )}
              format={dateFormat}
              style={{ margin: "10px", marginLeft: "0px" }}
            />
          <Form.Item label="Category" name="category">
            <Radio.Group>
              <Radio.Button value="Gen">Gen</Radio.Button>
              <Radio.Button value="EWS">EWS</Radio.Button>
              <Radio.Button value="OBC">OBC</Radio.Button>
              <Radio.Button value="SC">SC</Radio.Button>
              <Radio.Button value="ST">ST</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="Correspodence Address" name="correspondenceAddress">
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item label="Permanent Address" name="permanentAddress">
            <Input.TextArea rows={4} />
          </Form.Item>
          <Button
            type="primary"
            shape="round"
            htmlType="submit"
            className="upbutton"
            style={{ width: "100%" }}
          >
            Update
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default Personal;
