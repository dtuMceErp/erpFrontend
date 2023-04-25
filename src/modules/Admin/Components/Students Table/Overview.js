import React, { useState, useEffect } from "react";
import { Typography, message, Spin, Row } from "antd";

import axios from "axios";
import { BASE_URL } from "../../../../@constant/config";
import { useSelector, useDispatch } from "react-redux";

import OverviewCard from "./componrnts/overviewCard";
import OverviewTable from "./OvervierTable";
import ProjectTable from "./ProjectTable";
import AchievementTable from "./AchievementTable";
import CertificationTable from "./CertificationTable";
import ExperienceTable from "./ExperienceTable";
import ResearchTable from "./ResearchTable";

const { Text } = Typography;

function Overview() {
  const token = localStorage.getItem("ERPAM_TOKEN");
  const [PageView, setPageView] = useState(1);
  const [StudentData, setStudentData] = useState([]);
  const StudentDatafromstore = useSelector(
    (state) => state.AdminReducer.fetchedStudentData
  );
  const [loading, setloading] = useState(true);
  const projectData = useSelector((state) => state.AdminReducer.projectData);
  const achievementData = useSelector(
    (state) => state.AdminReducer.achievementData
  );
  const certificationData = useSelector(
    (state) => state.AdminReducer.certificationData
  );
  const researchData = useSelector((state) => state.AdminReducer.researchData);
  const experienceData = useSelector(
    (state) => state.AdminReducer.experienceData
  );

  const dispatch = useDispatch();

  function adminTableController(x) {
    if (x === 1) {
      return <OverviewTable Data={StudentData} />;
    } else if (x === 2) {
      return <ProjectTable />;
    } else if (x === 3) {
      return <AchievementTable />;
    } else if (x === 4) {
      return <CertificationTable />;
    } else if (x === 5) {
      return <ExperienceTable />;
    } else if (x === 6) {
      return <ResearchTable />;
    }

    return <OverviewTable />;
  }

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
        console.log(data);
        setStudentData(data);
        dispatch({
          type: "SET_STUDENT_DATA",
          fetchedStudentData: data,
        });
        setloading(false);
      })
      .catch((err) => {
        message.error(
          err.response ? err.response.data.message : "Something went wrong"
        );
      });
  };

  function setprojectData() {
    let projectData = [];
    StudentData.forEach(function(details) {
      details.project_id.forEach(function(x) {
        projectData.push({
          student_name: details.user_id.name,
          student_roll: details.roll_no,
          student_email: details.user_id.email,
          title: x.title,
          description: x.description,
          support_url: x.SupportURL,
          projectType: x.projectType,
        });
      });
    });
  
    dispatch({
      type: "SET_PROJECT_DATA",
      projectData: projectData,
    });
  }
  

  function setachievementData() {
    let achievementData = [];
    StudentData.forEach(function(details) {
      details.achievement_id.forEach(function(x) {
        achievementData.push({
          student_name: details.user_id.name,
          student_roll: details.roll_no,
          student_email: details.user_id.email,
          title: x.title,
          description: x.description,
          type: x.achievementType,
          support_url: x.SupportURL,
        });
      });
    });
  
    dispatch({
      type: "SET_ACHIEVEMENT_DATA",
      achievementData: achievementData,
    });
  }
  

  function setcertificationData() {
    let certificationData = [];
    StudentData.forEach(function(details) {
      details.certification_id.forEach(function(x) {
        certificationData.push({
          student_name: details.user_id.name,
          student_roll: details.roll_no,
          student_email: details.user_id.email,
          title: x.title,
          issuingOrganision: x.issuingOrganisation,
          support_url: x.SupportURL,
          issuedOn: x.issueDate.substring(0, 10),
        });
      });
    });
  
    dispatch({
      type: "SET_CERTIFICATION_DATA",
      certificationData: certificationData,
    });
  }
  

  function setresearchData() {
    let researchData = [];
    StudentData.forEach(function(details) {
      details.research_id.forEach(function(x) {
        researchData.push({
          student_name: details.user_id.name,
          student_roll: details.roll_no,
          student_email: details.user_id.email,
          title: x.title,
          description: x.description,
          support_url: x.SupportURL,
          ongoing: x.isOngoing,
          publisher: x.publisher,
          faculty: x.faculty || "",
          publicationDate: x.publicationDate === null
            ? "Ongoing"
            : x.publicationDate.substring(0, 10),
        });
      });
    });
  
    dispatch({
      type: "SET_RESEARCH_DATA",
      researchData: researchData,
    });
  }
  

  function setexperienceData() {
    const experienceData = [];
    
    StudentData.forEach((details) => {
      details.experience_id.forEach((x) => {
        experienceData.push({
          student_name: details.user_id.name,
          student_roll: details.roll_no,
          student_email: details.user_id.email,
          title: x.title,
          description: x.description,
          support_url: x.SupportURL,
          company: x.company,
          type: x.employmentType,
          startDate: x.startDate.slice(0, 10),
          ongoing: x.isOngoing,
          endDate: x.endDate ? x.endDate.slice(0, 10) : "",
        });
      });
    });

    dispatch({
      type: "SET_EXPERIENCE_DATA",
      experienceData: experienceData,
    });
  }

  useEffect(() => {
    async function setAllData() {
      getData();
      if (loading === false) {
        setprojectData();
        setachievementData();
        setcertificationData();
        setresearchData();
        setexperienceData();
      }
    }
    setAllData();
  }, [loading]);

  function pageController(x) {
    setPageView(x);
  }

  if (StudentData === null) {
    <div></div>;
  }

  return (
    <div>
      <div>
        <Row>
          <div onClick={() => pageController(1)}>
            <OverviewCard
              title="Students"
              img="./assets/student.png"
              count={StudentDatafromstore.length}
            />
          </div>
          <div onClick={() => pageController(2)}>
            <OverviewCard
              title="Projects"
              img="./assets/new-proj.png"
              count={projectData.length}
            />
          </div>
          <div onClick={() => pageController(3)}>
            <OverviewCard
              title="Achievement"
              img="./assets/Achievement.png"
              count={achievementData.length}
            />
          </div>

          <div onClick={() => pageController(4)}>
            <OverviewCard
              title="Cetrtifications"
              img="./assets/certificate.png"
              count={certificationData.length}
            />
          </div>

          <div onClick={() => pageController(5)}>
            <OverviewCard
              title="Experiences"
              img="./assets/exp.png"
              count={experienceData.length}
            />
          </div>

          <div onClick={() => pageController(6)}>
            <OverviewCard
              title="Researches"
              img="./assets/research.png"
              count={researchData.length}
            />
          </div>
        </Row>
      </div>

      <div>
        {StudentDatafromstore.lenght >= 1 ? (
          <Spin />
        ) : (
          adminTableController(PageView)
        )}
      </div>
    </div>
  );
}
export default Overview;
