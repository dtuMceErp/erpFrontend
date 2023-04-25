import React, { useState, useEffect } from "react";
import {
  Table,
  // Tag,
  // Switch,
  // Checkbox,
  // Typography,
  Input,
  Button,
  Space,
  message,
  Spin,
} from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import axios from "axios";
import { BASE_URL } from "../../../../@constant/config";
import { Popconfirm } from "antd";
import { QuestionCircleOutlined,
  //  CheckCircleTwoTone 
  } from "@ant-design/icons";

// const { Text } = Typography;

function StudentVerify() {
  // const [totalcount, settotalcount] = useState();
  const [tableData, setTableData] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const token = localStorage.getItem("ERPAM_TOKEN");
  const [updateNow, setupdateNow] = useState(false);
  const [deleteNow, setdeleteNow] = useState(true);
  const [selectedRowKeys, setselectedRowKeys] = useState([]);

  const getData = () => {
    axios({
      method: "get",
      url: String(BASE_URL + "/user/student/verify/all"),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        let data = res.data.body;
        setTableData(data);
        // console.log(data);
      })
      .catch((err) => {
        message.error(
          err.response ? err.response.data.message : "Something went wrong"
        );
      });
  };

  function verifying(values) {
    // console.log(values);
    if(values.length === 0){
      message.error("Please select atleast one Student");
      return;
    }
    let payload = {
      users: values,
    };
    axios({
      method: "post",
      url: String(BASE_URL + `/user/verify`),
      data: payload,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        // console.log(res);
        if (res.status === 200) {
          message.success("User Verified successfully");
        }
        setupdateNow(!updateNow);
      })
      .catch((err) => {
        message.error(
          err.response ? err.response.data.message : "Something went wrong"
        );
      });
  }

  function deleting(values) {
    // console.log(values);
    if(values.length === 0){
      message.error("Please select atleast one Student");
      return;
    }
    let payload = {
      users: values,
    };
    axios({
      method: "delete",
      url: String(BASE_URL + `/user/student/verify/delete`),
      data: payload,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          message.success("User Deleted successfully");
        }
        setdeleteNow(!deleteNow);
      })
      .catch((err) => {
        message.error(
          err.response ? err.response.data.message : "Something went wrong"
        );
      });
  }

  useEffect(() => {
    getData();
  }, 
  [updateNow, deleteNow]
  );

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

  const onSelectChange = (selectedRowKeys) => {
    console.log("selectedRowKeys changed: ", selectedRowKeys);
    setselectedRowKeys(selectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
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
      title: "Verification",
      key: "activation",
      render: (record) => (
        <div>
          {record === "" ? (
            <div>No File</div>
          ) : (
            <Popconfirm
              title="Are you sure to verify this user"
              icon={<QuestionCircleOutlined style={{ color: "red" }} />}
              onConfirm={() => verifying([record.user_id._id])}
            >
              <Button type="primary" shape="round">
                Verify
              </Button>
            </Popconfirm>
          )}
        </div>
      ),
    },

    {
      title: "Deny Verification",
      key: "deletion",
      render: (record) => (
        <div>
          {record === "" ? (
            <div>No File</div>
          ) : (
            <Popconfirm
              title="Are you sure to delete this user"
              icon={<QuestionCircleOutlined style={{ color: "red" }} />}
              onConfirm={() => deleting([record.user_id._id])}
            >
              <Button type="primary" shape="round" style={{width:"150px", backgroundColor: "red", border: "red" }}>
                Deny Verification
              </Button>
            </Popconfirm>
          )}
        </div>
      ),
    },
  ];

  return (
    <div>
      <div style={{ margin: "16px 0", display: "flex" }}>
        <p style={{ float: "left", fontSize: "22px", marginTop: "20px" }}>
          List of non-verified students
        </p>
        <div
          className="switch"
          style={{
            margin: "26px 0",
            position: "absolute",
            right: "0",
          }}
        >
          <Popconfirm
            title="Are you sure to verify this user"
            icon={<QuestionCircleOutlined style={{ color: "red" }} />}
            onConfirm={() => verifying(selectedRowKeys)}
          >
            <Button
              type="primary"
              shape="round"
              className="upbutton"
              style={{ width: "100px", marginRight: "20px", marginLeft: "20px" }}
            >
              Verify
            </Button>
          </Popconfirm>
          <Popconfirm
            title="Are you sure to delete this user"
            icon={<QuestionCircleOutlined style={{ color: "red" }} />}
            onConfirm={() => deleting(selectedRowKeys)}
          >
            <Button
              type="primary"
              shape="round"
              className="upbutton"
              style={{ width: "150px", marginRight: "20px", backgroundColor: "red", border: "red" }}
            >
              Deny Verification
            </Button>
          </Popconfirm>
        </div>
      </div>
      <div>
        {tableData === null ? (
          <Spin />
        ) : (
          <Table
            rowSelection={rowSelection}
            rowKey={(data) => data.user_id}
            dataSource={tableData}
            columns={headings}
          />
        )}
      </div>
    </div>
  );
}
export default StudentVerify;
