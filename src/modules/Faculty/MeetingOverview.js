import React, {useState, useEffect} from "react";
import { 
  // Spin,
  // Calendar,
  // Typography,
  message, Tabs, Table, Input, Space, Button } from "antd";
import axios from "axios";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import { BASE_URL } from "../../@constant/config";
// import { UI_COLORS } from "../../@constant/constant";
// import { render } from "@testing-library/react";

// const {Title} = Typography;
const { TabPane } = Tabs;

function Meeting_Overview_Admin(props) {
  const [pastMeetingData, setPastMeetingData] = useState(null);
  const [upcomingMeetingData, setUpcomingMeetingData] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const token = localStorage.getItem("ERPAM_TOKEN")

  function callback(key) {
    console.log(key);
  }

  const getData = () => {
    axios({
      method: "get",
      url: String(BASE_URL + "/meeting/all"),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {;
        let data = res.data.body;
        console.log(data);
        let past = data.pastParticipantMeetings.concat(data.pastOrganizerMeetings);
        setPastMeetingData(past);
        let upcoming = data.upcomingParticipantMeetings.concat(data.upcomingOrganizerMeetings)
        setUpcomingMeetingData(upcoming);
      })
      .catch((err) => {
        message.error(
          err.response ? err.response.data.message : "Something went wrong"
        );
      });
  }

  useEffect(() => getData(),);

  // eslint-disable-next-line no-unused-vars
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

  const upcomingMeetingsHeadings = [
    {
      title: "Title",
      render: (record) => record.title,
    },

    {
      title: "Date",
      render: (record) => record.date.substring(0, 10),
      key: "date",
    },

    {
      title: "Venue",
      render: (record) => record.venue,
      key: "venue",
    },

    {
      title: "Organizer",
      render: (record) => record.organizer.name,
      key: "organizer",
    },

    {
      title: "Purpose",
      render: (record) => record.purposeOfConduct,
      key: "purpose",
    },

    {
      title: "Participants",
      render: (record) => record.participants.length,
      key: "participants",
    }
  ];

  const pastMeetingsHeadings = [
    {
      title: "Title",
      render: (record) => record.title,
    },

    {
      title: "Date",
      render: (record) => record.date.substring(0, 10),
      key: "date",
    },

    {
      title: "Venue",
      render: (record) => record.venue,
      key: "venue",
    },

    {
      title: "Organizer",
      render: (record) => record.organizer.name,
      key: "organizer",
    },

    {
      title: "Purpose",
      render: (record) => record.purposeOfConduct,
      key: "purpose",
    },

    {
      title: "Participants",
      render: (record) => record.participants.length,
      key: "participants",
    }
  ];

  return (
    <div>
      <p
        className="site-description-item-profile-p"
        style={{
          fontWeight: "bold",
          fontSize: "22px",
          textDecoration: "underline",
          margin: "20px",
          marginBottom: "5px",
        }}
      >
        Meetings Overview
      </p>
      <br />
      <Tabs defaultActiveKey="1" onChange={callback} centered>
        <TabPane tab="Upcoming Meetings" key="1">
          <div>
            <Table dataSource={upcomingMeetingData} columns={upcomingMeetingsHeadings} />
          </div>
        </TabPane>
        <TabPane tab="Past Meetings" key="2">
          <div>
            <Table dataSource={pastMeetingData} columns={pastMeetingsHeadings} />
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
}

export default Meeting_Overview_Admin;
