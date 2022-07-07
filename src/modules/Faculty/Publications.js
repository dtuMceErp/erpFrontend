import React, { useState } from "react";
import {
  // Spin,
  // Space,
  Typography,
  Button,
  Form,
  Drawer,
  Input,
  Select,
  Switch,
  DatePicker,
  message,
  Popconfirm,
  Col,
  Row,
  Divider,
  InputNumber,
} from "antd";
// import { UI_COLORS } from "../../@constant/constant";
// import moment from "moment";
import {
  // MinusCircleOutlined,
  // PlusOutlined,
  QuestionCircleOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../../@constant/config";
import PublicationUpdate from "./PublicationsUpdate";

const { Title } = Typography;
// const dateFormat = "DD/MM/YYYY";

const DescriptionItem = ({ title, content }) => (
  <div className="site-description-item-profile-wrapper">
    <p className="site-description-item-profile-p-label">{title}:</p>
    {content}
  </div>
);

function Publications(props) {
  const [form] = Form.useForm();
  const [form_visible, setform_visible] = useState(false);
  const [date, setdate] = useState();
  const [isOngoing, setisOngoing] = useState(false);
  const [isPatent, setisPatent] = useState(false);
  const [isPeerReviewed, setisPeerReviewed] = useState(false);
  const [isInternational, setisInternational] = useState(false);
  const token = localStorage.getItem("ERPAM_TOKEN");

  function settingDate(date, dateString) {
    setdate(dateString);
  }

  function iog(checked) {
    setisOngoing(checked);
  }

  function ipt(checked) {
    setisPatent(checked);
  }

  function ipr(checked) {
    setisPeerReviewed(checked);
  }

  function iit(checked) {
    setisInternational(checked);
  }

  function changeParentsState() {
    props.forceUpdateHandler();
  }

  function deleting(id) {
    axios({
      method: "delete",
      url: String(BASE_URL + `/faculty/publication/delete/${id}`),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status === 201) {
          message.success("Publication deleted successfully");
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
    console.log(form_visible);
  }

  function onClose() {
    setform_visible(false);
    console.log(form_visible);
  }
  const data = useSelector((state) => state.FacultyReducer.facultyData);

  const onFinish = (values) => {
    console.log(values);
    let data = {};
    if (isOngoing) {
      data = {
        title: values.title,
        description: values.description,
        publisherName: values.publisherName,
        publishedIn: values.publishedIn,
        organizedBy: values.organizedBy,
        ISSN_or_ISBN_number: values.ISSN_or_ISBN_number,
        apiScore: values.apiScore,
        impactFactor: values.impactFactor,
        isPeerReviewed: isPeerReviewed,
        coAuthorCount: values.coAuthorCount,
        role: values.role,
        isInternational: isInternational,
        pageNo: values.pageNo,
        isOngoing: isOngoing,
        remarks: values.remarks,
        grant: values.grant,
        isPatent: isPatent,
      };
    } else {
      data = {
        title: values.title,
        description: values.description,
        publisherName: values.publisherName,
        publishedIn: values.publishedIn,
        organizedBy: values.organizedBy,
        ISSN_or_ISBN_number: values.ISSN_or_ISBN_number,
        apiScore: values.apiScore,
        impactFactor: values.impactFactor,
        isPeerReviewed: isPeerReviewed,
        coAuthorCount: values.coAuthorCount,
        publishedDate: date,
        role: values.role,
        isInternational: isInternational,
        pageNo: values.pageNo,
        isOngoing: isOngoing,
        remarks: values.remarks,
        grant: values.grant,
        isPatent: isPatent,
      };
    }

    console.log(data);
    axios({
      method: "post",
      url: String(BASE_URL + "/faculty/publication/create/"),
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
          message.success("Publication added");
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
          Publications
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
          {data.faculty.publications
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

                  <PublicationUpdate
                    data={details}
                    changeParentState={props.forceUpdateHandler}
                  />
                  <Row>
                    <Col span={12}>
                      <DescriptionItem title="Title" content={details.title} />
                    </Col>
                    <Col span={12}>
                      <DescriptionItem
                        title="ISSN or ISBN number"
                        content={details.ISSN_or_ISBN_number}
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
                        title="Publisher Name"
                        content={details.publisherName}
                      />
                    </Col>
                    <Col span={12}>
                      <DescriptionItem
                        title="Published In"
                        content={details.publishedIn}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24}>
                      <DescriptionItem
                        title="Orgainzed By"
                        content={details.organizedBy}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col span={6}>
                      <DescriptionItem
                        title="API Score"
                        content={details.apiScore}
                      />
                    </Col>
                    <Col span={6}>
                      <DescriptionItem
                        title="Impact Factor"
                        content={details.impactFactor}
                      />
                    </Col>
                    <Col span={6}>
                      <DescriptionItem
                        title="Co Author Count"
                        content={details.coAuthorCount}
                      />
                    </Col>
                    <Col span={6}>
                      <DescriptionItem title="Pages" content={details.pageNo} />
                    </Col>
                  </Row>
                  <Row>
                    <Col span={6}>
                      <DescriptionItem
                        title="Is Peer Reviewed"
                        content={details.isPeerReviewed ? "Yes" : "No"}
                      />
                    </Col>
                    <Col span={6}>
                      <DescriptionItem
                        title="Is International"
                        content={details.isInternational ? "Yes" : "No"}
                      />
                    </Col>
                    <Col span={6}>
                      <DescriptionItem
                        title="Is Ongoing"
                        content={details.isOngoing ? "Yes" : "No"}
                      />
                    </Col>
                    <Col span={6}>
                      <DescriptionItem
                        title="Is Patent"
                        content={details.isPatent ? "Yes" : "No"}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col span={8}>
                      <DescriptionItem
                        title="Published Date"
                        content={
                          details.publishedDate
                            ? details.publishedDate.substring(0, 10)
                            : " "
                        }
                      />
                    </Col>
                    <Col span={8}>
                      <DescriptionItem title="Grant" content={details.grant} />
                    </Col>
                    <Col span={8}>
                      <DescriptionItem title="Role" content={details.role} />
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24}>
                      <DescriptionItem
                        title="Remarks"
                        content={details.remarks}
                      />
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
          Add New Publication
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
          <Form.Item
            label="Publisher Name"
            name="publisherName"
            required={true}
          >
            <Input required />
          </Form.Item>
          <Form.Item label="Published In" name="publishedIn" required={true}>
            <Select required>
              <Select.Option value="Conference">Conference</Select.Option>
              <Select.Option value="Journal">Journal</Select.Option>
              <Select.Option value="Book">Book</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Organized By" name="organizedBy" required={true}>
            <Input required />
          </Form.Item>
          <Form.Item
            label="ISSN or ISBN number"
            name="ISSN_or_ISBN_number"
            required={true}
          >
            <Input required />
          </Form.Item>
          <Form.Item label="API Score" name="apiScore" required={true}>
            <Input required />
          </Form.Item>
          <Form.Item label="Impact Factor" name="impactFactor" required={true}>
            <Input required />
          </Form.Item>
          <Form.Item
            label="Peer Reviewed"
            name="isPeerReviewed"
            valuePropName="checked"
            required={true}
          >
            <Switch defaultChecked={false} onChange={ipr} required />
          </Form.Item>
          <Form.Item
            label="Co Author Count"
            name="coAuthorCount"
            required={true}
          >
            <InputNumber min={0} required />
          </Form.Item>
          <Form.Item
            label="Is Ongoing"
            name="isOngoing"
            valuePropName="checked"
          >
            <Switch defaultChecked={false} onChange={iog} required />
          </Form.Item>
          {isOngoing === false ? (
            <Form.Item
              label="Published Date"
              name="publishedDate"
              required={true}
            >
              <DatePicker onChange={settingDate} format="MM-DD-YYYY" />
            </Form.Item>
          ) : (
            <div></div>
          )}
          <Form.Item label="Role" name="role" required={true}>
            <Select required>
              <Select.Option value="Primary-Author">
                Primary Author
              </Select.Option>
              <Select.Option value="Co-Author">Co-Author</Select.Option>
              <Select.Option value="Secondary-Author">
                Secondary Author
              </Select.Option>
              <Select.Option value="Mentor">Mentor</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Is International"
            name="isInternational"
            required={true}
            valuePropName="checked"
          >
            <Switch defaultChecked={false} onChange={iit} required />
          </Form.Item>
          <Form.Item label="Page Number" name="pageNo" required={true}>
            <InputNumber min={0} required />
          </Form.Item>
          <Form.Item label="Remarks" name="remarks" required={true}>
            <Input.TextArea rows={4} showCount maxLength={200} required />
          </Form.Item>
          <Form.Item label="Grant" name="grant" required={true}>
            <Input required />
          </Form.Item>
          <Form.Item
            label="Is Patent"
            name="isPatent"
            required={true}
            valuePropName="checked"
          >
            <Switch defaultChecked={false} onChange={ipt} required />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form>
      </Drawer>
    </div>
  );
}
export default Publications;
