import React, { useEffect, useState } from "react";
import {
  Drawer,
  Form,
  Input,
  Select,
  Button,
  Typography,
  Checkbox,
  Row,
  message,
  Spin,
} from "antd";
import { BASE_URL } from "../../../../@constant/config";
import axios from "axios";
import { EditOutlined } from "@ant-design/icons";

const { Title } = Typography;

function CommitteeUpdate(props) {
	const [form] = Form.useForm();
  const [form_visible, setform_visible] = useState(false);
  const token = localStorage.getItem("ERPAM_TOKEN");
  const [formData, setformData] = useState(null);
  const [facultyData, setfacultyData] = useState(null);

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

	useEffect(() => {
    getData();
    fetchFormData();
  },);

	const fetchFormData = () => {
    axios
      .get(BASE_URL + `/committee/${props.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        let data = res.data.body;
        setformData(data);
        // console.log(data);
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

  function showDrawer() {
    setform_visible(true);
  }

  function onClose() {
    setform_visible(false);
  }

	const onFinish = (values) => {
    let data = {};
    data = {
      name: values.name,
      purpose: values.purpose,
      chairPerson: values.chairPerson,
      members: values.members,
      description: values.description,
    };
    // console.log(data);
    axios({
      method: "put",
      url: String(BASE_URL + `/committee/${props.id}`),
      data: data,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status === 200) {
          message.success("Committee updated successfully");
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
        onClick={showDrawer}
      ></Button>

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
          Update Committee
        </Title>
        <div>
          {formData === null ? (
            <Spin />
          ) : (
            <Form
              layout="vertical"
              initialValues={formData.committees}
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

							<div>
								{facultyData === null ? (
									<div></div>
								) : (
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
								)}
							</div>

							<div>
								{facultyData === null ? (
									<div></div>
								) : (
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
								)}
							</div>

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
          )}
        </div>
      </Drawer>
    </div>
  );
}

export default CommitteeUpdate;