import React, { useState, useEffect } from "react";
import { 
  Input, 
  Button, 
  Space, 
  Typography, 
  message, 
  Spin 
} from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import axios from "axios";
import { BASE_URL } from "../../../../@constant/config";
import { useSelector, useDispatch } from "react-redux";
import { Table } from "ant-table-extensions";

function OverviewTable(props) {
  const [tableData, setTableData] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const token = localStorage.getItem("ERPAM_TOKEN");

  const StudentData = useSelector(
    (state) => state.AdminReducer.fetchedStudentData
  );

  const getData = () => {
    axios({
      method: "get",
      url: String(BASE_URL + "/student/all"),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        let data = res.data.body;
        setTableData(data);
        // console.log("called");
      })
      .catch((err) => {
        message.error(
          err.response ? err.response.data.message : "Something went wrong"
        );
      });
  };

  useEffect(() => {
    if (StudentData.length > 0) {
      setTableData(StudentData);
    } else {
      getData();
    }
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
      title: "Roll no",
      dataIndex: "roll_no",
      key: "roll_no",
      ...getColumnSearchProps("roll_no"),
    },

    {
      title: "Email",
      render: (record) => record.user_id.email,
      key: "email",
    },

    {
      title: "Experience",
      render: (record) => record.experience_id.length,
      key: "experience",
      sorter: (a, b) => a.experience_id.length - b.experience_id.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Research",
      render: (record) => record.research_id.length,
      sorter: (a, b) => a.research_id.length - b.research_id.length,
      key: "research",
    },

    {
      title: "Project",
      render: (record) => record.project_id.length,
      key: "project",
      sorter: (a, b) => a.project_id.length - b.project_id.length,
    },

    {
      title: "Achievement",
      render: (record) => record.achievement_id.length,
      key: "achievement",
      sorter: (a, b) => a.achievement_id.length - b.achievement_id.length,
    },

    {
      title: "Certificate",
      render: (record) => record.certification_id.length,
      key: "certificate",
      sorter: (a, b) => a.certification_id.length - b.certification_id.length,
    },
  ];
  return (
    <div>
      <p style={{ fontSize: "22px", marginTop: "20px" }}>
        List of all Students
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
export default OverviewTable;
