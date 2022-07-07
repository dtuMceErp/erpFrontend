import React, {useState } from "react";
import {
  Drawer,
  Form,
  Input,
  Select,
  Button,
  Typography,
  Switch,
  message,
  // Row,
  // Spin,
  // Space,
  InputNumber,
} from "antd";
import { BASE_URL } from "../../@constant/config";
import axios from "axios";
import { DatePicker } from "antd";
import moment from "moment";
import { EditOutlined } from "@ant-design/icons";

const { Title } = Typography;
const dateFormat = "YYYY-MM-DD";

function Publications_Update(props) {
  const [form] = Form.useForm();
  const [form_visible, setform_visible] = useState(false);
  const [date, setdate] = useState(props.data.publishedDate);
  const [isOngoing, setisOngoing] = useState(props.data.isOngoing);
  const [isPatent, setisPatent] = useState(props.data.isPatent);
  const [isPeerReviewed, setisPeerReviewed] = useState(
    props.data.isPeerReviewed
  );
  const [isInternational, setisInternational] = useState(
    props.data.isInternational
  );
  const token = localStorage.getItem("ERPAM_TOKEN");

  function settingDate(date, dateString) {
    setdate(dateString);
  }

  // var updatedData = { ...props.data };

  // updatedData = {
  //   publishedDate: moment(props.data.publishedDate).format("YYYY-MM-DD"),
  // };

  function showDrawer() {
    setform_visible(true);
    console.log(form_visible);
    console.log(props.data);
    console.log(props.data.publishedDate);
    console.log(typeof props.data.publishedDate);
  }

  function onClose() {
    setform_visible(false);
    console.log(form_visible);
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

  function changePState() {
    // console.log("called form update");
    props.changeParentState();
  }

  const onFinish = (values) => {
    // console.log(values);
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
      method: "patch",
      url: String(BASE_URL + `/faculty/publication/update/${props.data._id}`),
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
          message.success("Publication Updated");
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
          Update your Publication
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
            <Form.Item
              label="Impact Factor"
              name="impactFactor"
              required={true}
            >
              <Input required />
            </Form.Item>
            <Form.Item
              label="Peer Reviewed"
              name="isPeerReviewed"
              valuePropName="checked"
              required={true}
            >
              <Switch defaultChecked={isPeerReviewed} onChange={ipr} required />
            </Form.Item>
            <Form.Item
              label="Co Author Count"
              name="coAuthorCount"
              required={true}
            >
              <InputNumber required />
            </Form.Item>
            <Form.Item
              label="Is Ongoing"
              name="isOngoing"
              valuePropName="checked"
              required={true}
            >
              <Switch defaultChecked={isOngoing} onChange={iog} />
            </Form.Item>
            {isOngoing === false ? (
              <div>
                <div>Published Date</div>
                <DatePicker
                  onChange={settingDate}
                  defaultValue={moment(
                    props.data.publishedDate
                      ? props.data.publishedDate.substring(0, 10)
                      : "2000-01-01",
                    dateFormat
                  )}
                  format={dateFormat}
                />
              </div>
            ) : (
              <div></div>
            )}
            <Form.Item label="Role" name="role" required={true}>
              <Select>
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
              valuePropName="checked"
              required={true}
            >
              <Switch
                defaultChecked={isInternational}
                onChange={iit}
                required
              />
            </Form.Item>
            <Form.Item label="Page Number" name="pageNo" required={true}>
              <InputNumber defaultValue={props.data.pageNo} required />
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
              <Switch defaultChecked={isPatent} onChange={ipt} required />
            </Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form>
        </div>
      </Drawer>
    </div>
  );
}

export default Publications_Update;
