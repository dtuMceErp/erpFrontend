import React, { useState, useEffect } from "react";
import { 
  Table, 
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
import CommitteeUpdate from "./Update";

// const { Text } = Typography;

function Committee_Overview(props) {
  // const [totalcount, settotalcount] = useState();
  const [tableData, setTableData] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const token = localStorage.getItem("ERPAM_TOKEN");
  const [upurposew, setupurposew] = useState(false);

  function forceUpdateHandler() {
    setupurposew(!upurposew);
  }

  const getData = () => {
    axios({
      method: "get",
      url: String(BASE_URL + "/committee/all"),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        let data = res.data.body;
        console.log(data);
        setTableData(data.committees);
      })
      .catch((err) => {
        message.error(
          err.response ? err.response.data.message : "Something went wrong"
        );
      });
  };

  useEffect(() => {
    getData();
  },); //[upurposew]

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
      render: (record) => record.name,
    },

    {
      title: "Chair Person",
      render: (record) => record.chairPerson.name,
    },

    {
      title: "purpose",
      dataIndex: "purpose",
      key: "purpose",
      ...getColumnSearchProps("purpose"),
    },

    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      ...getColumnSearchProps("description"),
    },

    {
      title: "No. Of Members",
      render: (record) => record.members.length,
    },

    {
      title: "Update",
      key: "activation",
      render: (record) => (
        <div>
          {record === "" ? (
            <div>No File</div>
          ) : (
            <CommitteeUpdate
              id={record._id}
              forceUpdateHandler={forceUpdateHandler}
            />
          )}
        </div>
      ),
    },
  ];

  return (
    <div>
      <p style={{ float: "left", fontSize: "22px", marginTop: "20px" }}>
        Committee Overview
      </p>
      <div>
        {tableData === null ? (
          <Spin />
        ) : (
          <Table dataSource={tableData} columns={headings} />
        )}
      </div>
    </div>
  );
}
export default Committee_Overview;
