import moment from "moment";
import {
  FaLocationArrow,
  FaBriefcase,
  FaCalendarAlt,
  FaUser,
  FaRupeeSign,
  FaUsers,
  FaCircleNotch,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import Wrapper from "../assets/wrappers/Company";
import JobInfo from "./JobInfo";
import { useEffect, useState } from "react";

const Company = ({
  _id,
  companyname,
  companyurl,
  companywebsite,
  companytagline,
  companysize,
  companytype,
  companyimage,
  companycity,
  companystate,
  companycountry,
}) => {

  const { setEditCompany, deleteCompany } = useAppContext();
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
        <Link to={`/company/detail/${_id}`}>
          <div
            className="uploadedImg"
            style={{ backgroundImage: "url(" + companyimage + ")" }}
          >
          </div>
          </Link>
        <div className="info" style={{marginLeft:'10px'}}>
          <Link to={`/company/detail/${_id}`}><h5>{companyname}</h5></Link>
          <p className="companyDetail"><a href={companywebsite} target="_blank">{companywebsite}</a></p>
          <p className="companyDetail"><span style={{color: '#7e7e7e'}}>@{companyurl}</span></p>
        </div>
      </header>

      <div className="content companyContent">
      {userType !== "admin" &&
        <p>{companytagline}</p>
      }
        <div className="content-center">
          <JobInfo icon={<FaLocationArrow />} text={companycity+', '+companystate+', '+companycountry} />
          <JobInfo icon={<FaCircleNotch />} text={companysize} />
          <JobInfo icon={<FaBriefcase />} text={companytype} />
        </div>
        <footer style={{ display: "flex", flexDirection: "column" }}>
          {userType === "recruiter" || userType === "admin" ? (
            <div className="actions recuiter">
              <Link
                to="/add-company"
                className="btn edit-btn"
                onClick={() => setEditCompany(_id)}
              >
                Edit
              </Link>
              <button
                type="button"
                className="btn delete-btn"
                onClick={() => deleteCompany(_id)}
              >
                Delete
              </button>
            </div>
          ) : (
            <div className="actions">
              <Link to={`/company/detail/${_id}`}>
                <button type="button" className="btn">
                  View Details
                </button>
              </Link>
            </div>
          )}
        </footer>
      </div>
    </Wrapper>
  );
};

export default Company;
