const INITIAL_STATE = {
  fetchedStudentData: [],
  projectData: [],
  achievementData: [],
  certificationData: [],
  researchData: [],
  experienceData: [],
};

const AdminReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_STUDENT_DATA":
      const fetchedStudentData = action.fetchedStudentData;
      return { ...state, fetchedStudentData };

    case "SET_PROJECT_DATA":
      const projectData = action.projectData;
      return { ...state, projectData };

    case "SET_ACHIEVEMENT_DATA":
      const achievementData = action.achievementData;
      return { ...state, achievementData };

    case "SET_CERTIFICATION_DATA":
      const certificationData = action.certificationData;
      return { ...state, certificationData };

    case "SET_RESEARCH_DATA":
      const researchData = action.researchData;
      return { ...state, researchData };

    case "SET_EXPERIENCE_DATA":
      const experienceData = action.experienceData;
      return { ...state, experienceData };

    default:
      return state;
  }
};

export default AdminReducer;
