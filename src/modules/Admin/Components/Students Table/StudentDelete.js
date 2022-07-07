import React, { useState, useEffect } from "react";
import { message, Popconfirm, Spin , Button, Input, Space, Table } from "antd";
import Highlighter from "react-highlight-words";
import axios from "axios";
import { BASE_URL } from "../../../../@constant/config";
import { useSelector, useDispatch } from "react-redux";
import { QuestionCircleOutlined, CheckCircleTwoTone, SearchOutlined } from "@ant-design/icons";

function Student_Delete(props) {
  const [tableData, setTableData] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const token = localStorage.getItem("ERPAM_TOKEN");
  const [deleteNow, setDeleteNow] = useState(true);
  const [selectedRowKeys, setselectedRowKeys] = useState([]);

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
        console.log("called");
      })
      .catch((err) => {
        message.error(
          err.response ? err.response.data.message : "Something went wrong"
        );
      });
  };

  function deleting(values) {
    console.log(values);
    if(values.length === 0){
      message.error("Please select atleast one Student");
      return;
    }
    let payload = {
      users: values,
    };
    axios({
      method: "post",
      url: String(BASE_URL + `/user/deactivate`),
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
        setDeleteNow(!deleteNow);
      })
      .catch((err) => {
        message.error(
          err.response ? err.response.data.message : "Something went wrong"
        );
      });
  }

  useEffect(() => {
    if (StudentData.length > 0) {
      setTableData(StudentData);
    } else {
      getData();
    }
  }, [deleteNow]);

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
      title: "Deactivation",
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
              <Button type="primary" shape="round" style={{backgroundColor: "red", border: "red"}}>
                Deactivate
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
            title="Are you sure to delete this user"
            icon={<QuestionCircleOutlined style={{ color: "red" }} />}
            onConfirm={() => deleting(selectedRowKeys)}
          >
            <Button
              type="primary"
              shape="round"
              className="upbutton"
              style={{ width: "100px", marginRight: "20px", backgroundColor: "red", border: "red" }}
            >
              Deactivate
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

export default Student_Delete;