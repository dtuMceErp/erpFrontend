// import React, { useState, useEffect } from "react";
import { Line, Bar, Pie } from "@ant-design/charts";
import { 
  // Typography,
  // message,
  // Spin,
  Row } from "antd";
import OverviewCard from "./Components/cards";

function AdminDashboard(props) {
  // const [data_comp, setData] = useState([]);
  // useEffect(() => {
  //   asyncFetch();
  // }, []);
  // const asyncFetch = () => {
  //   fetch(
  //     "https://gw.alipayobjects.com/os/bmw-prod/e00d52f4-2fa6-47ee-a0d7-105dd95bde20.json"
  //   )
  //     .then((response) => response.json())
  //     .then((json) => setData(json))
  //     .catch((error) => {
  //       console.log("fetch data failed", error);
  //     });
  // };

  let data_comp = [
    {
      inYear: "3rd year",
      batch: "2017",
      noOfInternship: "59",
    },
    {
      inYear: "3rd year",
      batch: "2018",
      noOfInternship: "67",
    },
    {
      inYear: "3rd year",
      batch: "2019",
      noOfInternship: "86",
    },

    {
      inYear: "3rd year",
      batch: "2020",
      noOfInternship: "87",
    },
    {
      inYear: "3rd year",
      batch: "2021",
      noOfInternship: "67",
    },

    {
      inYear: "4th year",
      batch: "2017",
      noOfInternship: "104",
    },

    {
      inYear: "4th year",
      batch: "2018",
      noOfInternship: "106",
    },

    {
      inYear: "4th year",
      batch: "2019",
      noOfInternship: "109",
    },

    {
      inYear: "4th year",
      batch: "2020",
      noOfInternship: "110",
    },

    {
      inYear: "4th year",
      batch: "2021",
      noOfInternship: "104",
    },
  ];

  var config_comp = {
    data: data_comp,
    xField: "batch",
    yField: "noOfInternship",
    seriesField: "inYear",

    smooth: true,
    animation: {
      appear: {
        animation: "path-in",
        duration: 5000,
      },
    },
  };

  var data_gender = [
    {
      sex: "Male",
      sold: 0.45,
    },
    {
      sex: "Female",
      sold: 0.55,
    },
  ];
  var config_gender = {
    appendPadding: 10,
    data: data_gender,
    angleField: "sold",
    colorField: "sex",
    radius: 0.8,
    legend: false,
    label: {
      type: "inner",
      offset: "-50%",
      style: {
        fill: "#fff",
        fontSize: 18,
        textAlign: "center",
      },
    },
    pieStyle: function pieStyle(_ref) {
      var sex = _ref.sex;
      if (sex === "Male") {
        return {
          fill: "p(a)https://gw.alipayobjects.com/zos/rmsportal/nASTPWDPJDMgkDRlAUmw.jpeg",
        };
      }
      return {
        fill: "p(a)https://gw.alipayobjects.com/zos/rmsportal/ziMWHpHSTlTzURSzCarw.jpeg",
      };
    },
  };

  var data_pie = [
    {
      type: "Admin",
      value: 13,
    },
    {
      type: "Faculity",
      value: 46,
    },
    {
      type: "Student",
      value: 180,
    },
    {
      type: "Staff",
      value: 40,
    },

    {
      type: "other",
      value: 70,
    },
  ];
  var config_pie = {
    appendPadding: 10,
    data: data_pie,
    angleField: "value",
    colorField: "type",
    radius: 1,
    innerRadius: 0.6,
    label: {
      type: "inner",
      offset: "-50%",
      content: "{value}",
      style: {
        textAlign: "center",
        fontSize: 14,
      },
    },
    interactions: [{ type: "element-selected" }, { type: "element-active" }],
    statistic: {
      title: false,
      content: {
        style: {
          whiteSpace: "pre-wrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        },
        formatter: function formatter() {
          return "Applied Mathematics\nDepartment";
        },
      },
    },
  };

  var data_Bar = [
    {
      year: "2017",
      value: 38,
    },
    {
      year: "2018",
      value: 52,
    },
    {
      year: "2019",
      value: 61,
    },
    {
      year: "2020",
      value: 145,
    },
    {
      year: "2021",
      value: 48,
    },
  ];
  var config_Bar = {
    data: data_Bar,
    xField: "value",
    yField: "year",
    seriesField: "year",
    legend: { position: "top-left" },
  };

  const data = [
    { year: "2011", value: 8 },
    { year: "2012", value: 7 },
    { year: "2013", value: 7 },
    { year: "2014", value: 4 },
    { year: "2015", value: 9 },
    { year: "2016", value: 12 },
    { year: "2017", value: 8 },
    { year: "2018", value: 9 },
    { year: "2019", value: 13 },
  ];

  const config = {
    data,
    height: 400,
    xField: "year",
    yField: "value",
    point: {
      size: 5,
      shape: "diamond",
    },
  };

  return (
    <div>
      <Row>
        <div>
          <OverviewCard title="Admin" img="./assets/admin.png" count="13" />
        </div>
        <div>
          <OverviewCard
            title="Students"
            img="./assets/student.png"
            count="180"
          />
        </div>

        <div>
          <OverviewCard
            title="Faculity"
            img="./assets/teacher.png"
            count="46"
          />
        </div>

        <div>
          <OverviewCard
            title="Staff"
            img="./assets/networking.png"
            count="40"
          />
        </div>
      </Row>
      <Row>
        <Pie
          {...config_pie}
          style={{
            width: "45%",
            background: "white",
            margin: "20px",
            borderRadius: "20px",
            padding: "20px",
          }}
        />

        <div
          style={{
            width: "45%",
            background: "white",
            margin: "20px",
            borderRadius: "20px",
            padding: "20px",
          }}
        >
          <div style={{ textAlign: "center" }}>
            Gender Ratio of our Department
          </div>

          <Pie {...config_gender} />
        </div>
      </Row>
      <Row>
        <div
          style={{
            width: "45%",
            background: "white",
            margin: "20px",
            borderRadius: "20px",
            padding: "20px",
          }}
        >
          <div style={{ textAlign: "center" }}>
            Internship Obtained in Respective Year.
          </div>
          <br />
          <Bar {...config_Bar} />
        </div>

        <div
          style={{
            width: "45%",
            background: "white",
            margin: "20px",
            borderRadius: "20px",
            padding: "20px",
          }}
        >
          <div style={{ textAlign: "center" }}>
            PPO Conversion in Respective Year.
          </div>
          <br />
          <Line {...config} />
        </div>
      </Row>

      <div
        style={{
          width: "93%",
          background: "white",
          margin: "20px",
          borderRadius: "20px",
          padding: "20px",
        }}
      >
        <div style={{ textAlign: "center" }}>
          Internships obtained in 3rd and 4th year compaired with previous
          batch.
        </div>

        <Line {...config_comp} />
      </div>
    </div>
  );
}

export default AdminDashboard;
