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

const AppliedJob = ({
  company,
  job
}) => {
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
          <Link to={`/job/detail/${job?._id}`}>
            <h5>{job?.position}</h5>
          </Link>
          <p className="companyDetail">
            <Link to={`/company/detail/${company?._id}`}>{company?.companyname}</Link>{" "}
            <span style={{ color: "#7e7e7e" }}>
              {" - " + moment(job?.createdAt).fromNow()}
            </span>
          </p>
        </div>
      </header>

      <div className="content">
        <div className="content-center">
          <JobInfo icon={<FaLocationArrow />} text={job?.jobLocation} />
          <JobInfo
            icon={<FaCalendarAlt />}
            text={moment(job?.createdAt).fromNow()}
          />
          <JobInfo icon={<FaBriefcase />} text={job?.jobType} />
          <OWrapper>
            <span className="icon">{<FaRupeeSign />}</span>
            <span className="text">{job?.salary + "/month"}</span>
          </OWrapper>
          <OWrapper>
            <span className="icon">{<FaUser />}</span>
            <span className="text">{job?.openings + " openings"}</span>
          </OWrapper>
          <OWrapper>
            <span className="icon">{<FaUsers />}</span>
            <span className="text">{job?.employees + " employees"}</span>
          </OWrapper>
        </div>
        <footer style={{ display: "flex", flexDirection: "column" }}>
            <div className="actions">
              <Link to={`/job/detail/${job?._id}`}>
                <button type="button" className="btn">
                  View Details
                </button>
              </Link>
            </div>
        </footer>
      </div>
    </Wrapper>
  );
};

export default AppliedJob;
