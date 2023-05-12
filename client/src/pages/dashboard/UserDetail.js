import moment from "moment";
import {
  FaLocationArrow,
  FaBriefcase,
  FaCalendarAlt,
  FaUser,
  FaRupeeSign,
  FaUsers,
  FaPhoneAlt,
} from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { useAppContext } from "../../context/appContext";
import Wrapper from "../../assets/wrappers/UserDetail";
import OWrapper from "../../assets/wrappers/OpeningInfo";
import JobInfo from "../../components/JobInfo";
import { useEffect, useState } from "react";
import {Helmet} from "react-helmet";

const UserDetail = () => {

  const { getUserDetail, userDetail } = useAppContext();
  const [userType, setUserType] = useState('')
  const [user, setUser] = useState({});
  let params = useParams()
  let userId = params?.userId;
  //console.log(userDetail, ' userDetail')
  useEffect(() => {
    let user = JSON.parse(localStorage.getItem('user'));
    if(user){
      setUser(user);
      setUserType(user.userType);
    }
    getUserDetail(userId)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const htmlDecode = (content) => {
    let e = document.createElement('div');
    e.innerHTML = content;
    return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
  }

  return (
    <Wrapper>
      <Helmet>
        <title>{`${userDetail?.name} | ${userDetail?.position} | ${userDetail?.location} || Get Job Call`}</title>
      </Helmet>
      <header className="headerTop">
          <div
            className="main-icon"
          >{userDetail?.name?.charAt(0)}</div>
        <div className="info">
          <h5>{userDetail?.name+" "+userDetail?.lastName}</h5>
          <p className="companyDetail">{userDetail?.position} <span style={{color: '#7e7e7e'}}>{' : '+userDetail?.location+' - '+moment(userDetail?.createdAt).fromNow()}</span></p>
        </div>
      </header>

      <div className="content userContent">
        <div className="content-center">
          <JobInfo icon={<FaLocationArrow />} text={userDetail?.location} />
          <JobInfo icon={<FaCalendarAlt />} text={moment(userDetail?.createdAt).format('DD MMM YYYY')} />
          <OWrapper>
            <span className="icon">{<FaUser />}</span>
            <span className="text" style={{textTransform:'none'}}>{userDetail?.email}</span>
          </OWrapper>
          <OWrapper>
            <span className="icon">{<FaPhoneAlt />}</span>
            <span className="text">{userDetail?.phone}</span>
          </OWrapper>
        </div>
      </div>
      {userType === "applicant" && (
        <footer style={{ display: "flex", flexDirection: "column" }}>
            <div className="actions applyBtn">
              <button type="button" className="btn">
                Follow
              </button>
            </div>
        </footer>
        )}
    </Wrapper>
  );
};

export default UserDetail;
