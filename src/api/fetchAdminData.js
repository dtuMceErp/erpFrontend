import axios from "axios";
import { BASE_URL } from "../@constant/config";
import { useSelector, useDispatch } from "react-redux";
import { message } from "antd";
import store from "../reducer/store";

const token = localStorage.getItem("ERPAM_TOKEN");
// const token = useSelector((state) => state.token);
// const data = useSelector((state) => state.fetchedStudentData);
// const dispatch = useDispatch();
const data = store.getState;

const fetch_from_server = () => {
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
      //   setTableData(data);
      //   console.log(data);
      store.dispatch({
        type: "SET_STUDENT_DATA",
        fetchedStudentData: data,
      });
    })
    .catch((err) => {
      message.error(
        err.response ? err.response.data.message : "Something went wrong"
      );
    });
};

const reducer_check = () => {
  console.log(store.getState);
};

const check_data = () => {
  fetch_from_server();
  const data1 = store.getState;
  return data1;
};

export { reducer_check, check_data };
