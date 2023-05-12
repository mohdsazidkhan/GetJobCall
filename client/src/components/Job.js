import moment from "moment";
import {
  FaLocationArrow,
  FaBriefcase,
  FaCalendarAlt,
  FaUser,
  FaRupeeSign,
  FaUsers,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import Wrapper from "../assets/wrappers/Job";
import OWrapper from "../assets/wrappers/OpeningInfo";
import JobInfo from "./JobInfo";
import { useEffect, useState } from "react";

const Job = ({
  _id,
  position,
  company,
  createdBy,
  jobLocation,
  jobType,
  createdAt,
  status,
  openings,
  salary,
  employees,
}) => {
  const { setEditJob, deleteJob } = useAppContext();
  const [userType, setUserType] = useState();
  const [user, setUser] = useState({});

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUser(user);
      setUserType(user.userType);
    }
    // eslint-disable-next-line
  }, [userType]);
  return (
    <Wrapper>
      <header>
          <div
            className="uploadedImg"
            style={{ backgroundImage: "url(" + company?.companyimage + ")" }}
          ></div>
        <div className="info">
          <Link to={`/job/detail/${_id}`}>
            <h5>{position}</h5>
          </Link>
          <p className="companyDetail">
            <Link to={`/company/detail/${company?._id}`}>{company?.companyname}</Link>{" "}
            <span style={{ color: "#7e7e7e" }}>
              {" - " + moment(createdAt).fromNow()}
            </span>
          </p>
        </div>
      </header>

      <div className="content">
        <div className="content-center">
          <JobInfo icon={<FaLocationArrow />} text={jobLocation} />
          <JobInfo
            icon={<FaCalendarAlt />}
            text={moment(createdAt).fromNow()}
          />
          <JobInfo icon={<FaBriefcase />} text={jobType} />
          <OWrapper>
            <span className="icon">{<FaRupeeSign />}</span>
            <span className="text">{salary + "/month"}</span>
          </OWrapper>
          <OWrapper>
            <span className="icon">{<FaUser />}</span>
            <span className="text">{openings + " openings"}</span>
          </OWrapper>
          <OWrapper>
            <span className="icon">{<FaUsers />}</span>
            <span className="text">{employees + " employees"}</span>
          </OWrapper>
        </div>
        <footer style={{ display: "flex", flexDirection: "column" }}>
          {userType === "recruiter" || userType === "admin" ? (
            <div className="actions recuiter">
              <Link
                to="/add-job"
                className="btn edit-btn"
                onClick={() => setEditJob(_id)}
              >
                Edit
              </Link>
              <button
                type="button"
                className="btn delete-btn"
                onClick={() => deleteJob(_id)}
              >
                Delete
              </button>
              <div className={`status ${status}`}>{status}</div>
            </div>
          ) : (
            <div className="actions">
              <Link to={`/job/detail/${_id}`}>
                <button type="button" className="btn">
                  View Details
                </button>
              </Link>
            </div>
          )}
        </footer>
      </div>

      {/* {userType === "applicant" && (
        <header className="bottom">
          <div className="main-icon">{user?.name?.charAt(0)}</div>
          <div className="info">
            <h5>{user.name + " " + user.lastName}</h5>
            <p>{user.email}</p>
          </div>
        </header>
      )} */}
    </Wrapper>
  );
};

export default Job;
