import React, { useEffect, useState } from "react";
import { Form, Input, Button, Divider, Row, message } from "antd";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../../@constant/config";

function Academics(props) {
  const data = useSelector((state) => state.FacultyReducer.facultyData);
  const [isOngoingPG, setisOngoingPG] = useState();
  const [isOngoingPHD, setisOngoingPHD] = useState();

  const token = localStorage.getItem("ERPAM_TOKEN");

  useEffect(() => {
    if (data) {
      setisOngoingPG(
        data?.faculty?.academicQualifications?.postGraduateDegree?.isOngoing ||
          " "
      );
      setisOngoingPHD(
        data?.faculty?.academicQualifications?.PHD?.isOngoing || " "
      );
    }
  }, [data],);

  function changeParentsState() {
    props.forceUpdateHandler();
  }

  // function iog(checked) {
  //   setisOngoingPG(checked);
  // }

  // function iogPHD(checked) {
  //   setisOngoingPHD(checked);
  // }

  const onFinishGD = (values) => {
    let data = {};

    data = {
      university: values.university,
      passingYear: values.passingYear,
      degree: values.degree,
      specialization: values.specialization,
    };

    axios({
      method: "patch",
      url: String(BASE_URL + `/faculty/academics/graduate/update/`),
      data: data,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status === 200) {
          message.success("Graduation Degree updated");
        }
        changeParentsState();
      })
      .catch((err) => {
        message.error(
          err.response ? err.response.data.message : "Something went wrong"
        );
      });
  };

  const onFinishPGD = (values) => {
    let data = {};
    data = {
      university: values.university,
      passingYear: values.passingYear,
      isOngoing: isOngoingPG,
      degree: values.degree,
      specialization: values.specialization,
    };
    axios({
      method: "patch",
      url: String(BASE_URL + `/faculty/academics/postgraduate/update/`),
      data: data,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        // console.log(data);
        if (res.status === 200) {
          message.success("Post Graduation Degree updated");
        }
        changeParentsState();
      })
      .catch((err) => {
        message.error(
          err.response ? err.response.data.message : "Something went wrong"
        );
      });
  };

  const onFinishPHD = (values) => {
    let data = {};

    data = {
      university: values.university,
      passingYear: values.passingYear,
      isOngoing: isOngoingPHD,
      degree: values.degree,
      specialization: values.specialization,
    };
    axios({
      method: "patch",
      url: String(BASE_URL + `/faculty/academics/phd/update/`),
      data: data,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        // console.log(data);
        if (res.status === 200) {
          message.success("PHD updated");
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
      <div>
        {isOngoingPG} {isOngoingPHD}
      </div>
      <div
        style={{
          background: "white",
          padding: "20px",
          margin: "20px",
          borderRadius: "20px",
        }}
      >
        <h3>Graduate Degree</h3>
        <Form
          onFinish={onFinishGD}
          layout="vertical"
          initialValues={
            data?.faculty?.academicQualifications?.graduateDegree || " "
          }
        >
          <Form.Item label="University Name" name="university" required={true}>
            <Input required />
          </Form.Item>
          <Row>
            <Form.Item
              label="Completion Year"
              name="passingYear"
              required={true}
            >
              <Input required />
            </Form.Item>
          </Row>
          <Form.Item label="Degree" name="degree" required={true}>
            <Input required />
          </Form.Item>

          <Form.Item
            label="Specialization"
            name="specialization"
            required={true}
          >
            <Input required />
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
      <Divider />
      <div
        style={{
          background: "white",
          padding: "20px",
          margin: "20px",
          borderRadius: "20px",
        }}
      >
        <h3>Post Graduate Degree</h3>

        <Form
          onFinish={onFinishPGD}
          initialValues={
            data?.faculty?.academicQualifications?.postGraduateDegree || " "
          }
          layout="vertical"
        >
          <Form.Item label="University Name" name="university" required={true}>
            <Input required />
          </Form.Item>
          <Row>
            <Form.Item
              label="Completion Year"
              name="passingYear"
              required={true}
            >
              <Input required />
            </Form.Item>
          </Row>
          <Form.Item label="Degree" name="degree" required={true}>
            <Input required />
          </Form.Item>

          <Form.Item
            label="Specialization"
            name="specialization"
            required={true}
          >
            <Input required />
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
      <Divider />
      <div
        style={{
          background: "white",
          padding: "20px",
          margin: "20px",
          borderRadius: "20px",
        }}
      >
        <h3>Doctor of Philosophy</h3>
        <Form
          initialValues={data?.faculty?.academicQualifications?.PHD || " "}
          onFinish={onFinishPHD}
          layout="vertical"
        >
          <Form.Item label="University Name" name="university" required={true}>
            <Input required />
          </Form.Item>
          <Row>
            <Form.Item
              label="Completion Year"
              name="passingYear"
              required={true}
            >
              <Input required />
            </Form.Item>
          </Row>

          <Form.Item
            label="Specialization"
            name="specialization"
            required={true}
          >
            <Input required />
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

export default Academics;
