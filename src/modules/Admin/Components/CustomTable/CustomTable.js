import React, { useState, useEffect } from "react";
import { Table, Tag, Input, Button, Space, Typography, message } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import axios from "axios";
import { BASE_URL } from "../../../../@constant/config";

const { Text } = Typography;

function CustomTable() {
  const [totalcount, settotalcount] = useState();
  const [tableData, setTableData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

  useEffect(() => {
    async function getTableData() {
      axios.get(BASE_URL + "/notice/all").then((res) => {
        const data = res.data.body.documents;
        const count = res.data.body.count;
        setTableData(data.map(element => {return {
          key:element._id, //key prop was missing previously
          title:element.title,
          description:element.description,
          url:element.url,
          tags:element.tags,
          category:element.category,
        }}));
        settotalcount(count);
      });
    }
    getTableData();
  }, []);

  const copyUrl=(url) =>{

    navigator.clipboard.writeText(url);
    message.success("URL Copied Successfully.");
  }

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
      title: "Title",
      dataIndex: "title",
      key: "title",
      ...getColumnSearchProps("title"),
      sorter: (a, b) => a.title.localeCompare(b.title),
      sortDirections: ["descend", "ascend"],
    },

    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      ...getColumnSearchProps("description"),
    },

    {
      title: "Tags",
      dataIndex: "tags",
      key: "tags",
      ...getColumnSearchProps("tags"),
      render: (tags) => (
        <div>
          {tags === null || tags.length === 0 ? (
            <div>
              {" "}
              <Text type="secondary">No Tags Available</Text>{" "}
            </div>
          ) : (
            tags.map((tag) => {
              let color = "blue";
              let selected_co = "red";

              return (
                <Tag
                  key={tag}
                  color={
                    searchText === ""
                      ? color
                      : tag.includes(searchText)
                      ? selected_co
                      : color
                  }
                  
                >
                  {tag.toUpperCase()}
                </Tag>
              );
            })
          )}
        </div>
      ),
    },

    {
      title: "Link",
      dataIndex: "url",
      key: "url",
      render: (url) => (
        <div>
          {url === "" ? <div>No File</div> : <div onClick={()=>copyUrl(url)}>Copy URL</div>}
        </div>
      ),
    },
  ];
  return (
    <div>
      <p style={{ float: "left", fontSize: "22px" }}>List of Notices</p>
      <p style={{ float: "right", fontSize: "18px" }}>Total : {totalcount}</p>
      <Table rowkey= {tableData._id} dataSource={tableData} columns={headings} />
    </div>
  );
}
export default CustomTable;
