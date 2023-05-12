import moment from "moment";
import {
  FaLocationArrow,
  FaBriefcase,
  FaCalendarAlt,
  FaUser,
  FaRupeeSign,
  FaUsers,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import Wrapper from "../assets/wrappers/Job";
import OWrapper from "../assets/wrappers/OpeningInfo";
import JobInfo from "./JobInfo";
import { useEffect, useState } from "react";

const User = ({
  _id,
  name,
  lastName,
  email,
  location,
  phone,
  gender,
  position,
  createdAt,
  userType
}) => {
  const { setEditUser, deleteUser } = useAppContext();
  const [user, setUser] = useState({});

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUser(user);
    }
    // eslint-disable-next-line
  }, []);
  return (
    <Wrapper>
      <header>
          <div
            className="main-icon"
            
          >{name?.charAt(0)}</div>
        <div className="info">
          <Link to={`/user/detail/${_id}`}>
            <h5>{name+' '+lastName}</h5>
          </Link>
          <p className="companyDetail">
            <span style={{ color: "#7e7e7e" }}>
              {position+ " - " + moment(createdAt).fromNow()}
            </span>
          </p>
        </div>
      </header>

      <div className="content userContent">
        <div className="content-center">
          <JobInfo icon={<FaLocationArrow />} text={location} />
          <JobInfo
            icon={<FaCalendarAlt />}
            text={moment(createdAt).format('DD MMM YYYY')}
          />
          <JobInfo icon={<FaBriefcase />} text={userType} />
          <OWrapper>
            <span className="icon">{<FaPhone />}</span>
            <span className="text">{phone}</span>
          </OWrapper>
          <OWrapper>
            <span className="icon">{<FaEnvelope/>}</span>
            <span className="text" style={{textTransform:'none'}}>{email}</span>
          </OWrapper>
          <OWrapper>
            <span className="icon">{<FaUser />}</span>
            <span className="text">{gender}</span>
          </OWrapper>
        </div>
        <footer style={{ display: "flex", flexDirection: "column" }}>
            <div className="actions recuiter">
              <Link
                to="/add-user"
                className="btn edit-btn"
                onClick={() => setEditUser(_id)}
              >
                Edit
              </Link>
              <button
                type="button"
                className="btn delete-btn"
                onClick={() => deleteUser(_id)}
              >
                Delete
              </button>
              <div className="actions">
                <Link to={`/user/detail/${_id}`}>
                  <button type="button" className="btn">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
        </footer>
      </div>
    </Wrapper>
  );
};

export default User;
