const INITIAL_STATE = {
  facultyData: null,
};

const FacultyReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_FACULTY_DATA":
      const facultyData = action.facultyData;
      return { ...state, facultyData };

    default:
      return state;
  }
};

export default FacultyReducer;
