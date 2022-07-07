import React, { useState, useEffect } from "react";
import { 
  Input, 
  Button, 
  Space, 
  // Typography, 
  message, 
  Spin 
} from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import axios from "axios";
import { BASE_URL } from "../../../../@constant/config";
import { Table } from "ant-table-extensions";

function FaculityOverview(props) {
  const [tableData, setTableData] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const token = localStorage.getItem("ERPAM_TOKEN");

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
        setTableData(data);
        console.log(data);
      })
      .catch((err) => {
        message.error(
          err.response ? err.response.data.message : "Something went wrong"
        );
      });
  };

  useEffect(() => {
    async function getTableData() {
      axios.get(BASE_URL).then((res) => {
        const data = res.data.body.documents;

        // console.log(data);
        setTableData(data);
      });
    }
    getData();
  }, []);

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",

    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const headings = [
    {
      title: "Name",
      render: (record) => record.user_id.name,
    },

    {
      title: "Email",
      render: (record) => record.user_id.email,
      key: "email"
    },

    // {
    //   title: "Total Teaching Experience",
    //   render: (record) => record.experience.teachingExperience.PG_classes + record.experience.teachingExperience.UG_classes,
    //   key: "teachingExperience",
    //   sorter: (a,b) => (a.experience.teachingExperience.PG_classes + a.experience.teachingExperience.UG_classes) - (b.experience.teachingExperience.PG_classes + b.experience.teachingExperience.UG_classes),
    //   sortDirection: ["ascend", "descend"]
    // },

    // {
    //   title: "Total Research Experience",
    //   render: (record) => record.experience.researchExperience.total,
    //   key: "researchExperience",
    //   sorter: (a,b) => (a.experience.researchExperience.total) - b.experience.researchExperience.total,
    //   sortDirection: ["ascend", "descend"]
    // },

    {
      title: "UG College",
      render: (record) => {return record.academicQualifications ?record.academicQualifications.graduateDegree.university :"No data available"},
      key: "undergraduateCollege",
    },

    {
      title: "PG College",
      render: (record) => {return record.academicQualifications ?record.academicQualifications.postGraduateDegree.university :"No data available"},
      key: "postundergraduateCollege",
    },

    {
      title: "PHD College",
      render: (record) => {return record.academicQualifications ?record.academicQualifications.PHD.university :"No data available"},
      key: "phdCollege",
    },

    {
      title: "Publications",
      render: (record) => record.publications.length,
      key: "publications",
      sorter: (a,b) => a.publications.length - b.publications.length,
      sortDirection: ["ascend", "descend"]
    },

    {
      title: "Professional Activities",
      render: (record) => record.professionalActivities.length,
      key: "professionalActivities",
      sorter: (a,b) => a.professionalActivities.length - b.professionalActivities.length,
      sortDirection: ["ascend", "descend"]
    },
  ];

  return (
    <div>
      <p style={{ fontSize: "22px", marginTop: "20px" }}>
        List of all Faculty
      </p>
      <div>
        {tableData === null ? (
          <Spin style={{ margin: "auto" }} />
        ) : (
          <Table
            dataSource={tableData}
            columns={headings}
            exportable
            searchable
          />
        )}
      </div>
    </div>
  );
}

export default FaculityOverview;
