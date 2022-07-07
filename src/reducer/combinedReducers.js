import { combineReducers } from "redux";

import AdminReducer from "../reducer/adminReducer";
import FacultyReducer from "../reducer/facultyReducer";

export default combineReducers({
  AdminReducer,
  FacultyReducer,
});
