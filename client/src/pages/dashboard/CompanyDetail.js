import moment from "moment";
import {
  FaLocationArrow,
  FaBriefcase,
  FaCalendarAlt,
  FaUser,
  FaRupeeSign,
  FaUsers,
  FaPhone,
  FaLink,
  FaIndustry,
} from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { useAppContext } from "../../context/appContext";
import Wrapper from "../../assets/wrappers/CompanyDetail";
import OWrapper from "../../assets/wrappers/OpeningInfo";
import JobInfo from "../../components/JobInfo";
import { useEffect, useState } from "react";
import {Helmet} from "react-helmet";

const CompanyDetail = () => {

  const { getCompanyDetail, companyDetail } = useAppContext();
  const [userType, setUserType] = useState('')
  const [user, setUser] = useState({});
  let params = useParams()
  let companyId = params?.companyId;
  useEffect(() => {
    let user = JSON.parse(localStorage.getItem('user'));
    if(user){
      setUser(user);
      setUserType(user.userType);
    }
    getCompanyDetail(companyId)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const htmlDecode = (content) => {
    let e = document.createElement('div');
    return e.innerHTML = content;
    //return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
  }

  return (
    <Wrapper>
      <Helmet>
        <title>{`${companyDetail?.companyname} | ${companyDetail?.companycountry} || Get Job Call`}</title>
      </Helmet>
      <header className="headerTop">
      <div
            className="uploadedImg"
            style={{ backgroundImage: "url(" + companyDetail?.companyimage + ")" }}
          ></div>
        <div className="info">
          <h5>{companyDetail?.companyname}</h5>
          <p className="companyDetail">@{companyDetail?.companyurl} <span style={{color: '#7e7e7e'}}>{' : '+companyDetail?.companycountry+' - '+moment(companyDetail?.createdAt).fromNow()}</span></p>
        </div>
      </header>

      <div className="content companyContent">
        <p style={{color: '#7e7e7e'}}>{companyDetail?.companytagline}</p>
        <div className="content-center">
          <JobInfo icon={<FaLocationArrow />} text={companyDetail?.companycity+', '+companyDetail?.companystate+', '+companyDetail?.companycountry} />
          <JobInfo icon={<FaCalendarAlt />} text={moment(companyDetail?.createdAt).format('DD MMM YYYY')} />
          <OWrapper>
            <span className="icon">{<FaIndustry />}</span>
            <span className="text">{companyDetail?.companyindustry}</span>
          </OWrapper>
          <OWrapper>
            <span className="icon">{<FaLink />}</span>
            <a className="text" href={`${companyDetail?.companywebsite}`} target='_blank' style={{textTransform: 'none'}}>{companyDetail?.companywebsite}</a>
          </OWrapper>
          <OWrapper>
            <span className="icon">{<FaPhone />}</span>
            <span className="text">{companyDetail?.companyphone}</span>
          </OWrapper>
          <OWrapper>
            <span className="icon">{<FaUser />}</span>
            <span className="text">{companyDetail?.companytype}</span>
          </OWrapper>
          <OWrapper>
            <span className="icon">{<FaUsers />}</span>
            <span className="text">{companyDetail?.companysize}</span>
          </OWrapper>
        </div>
        <div className="descHeading">Description:</div>
        <div className="jobDescription" dangerouslySetInnerHTML={{__html: htmlDecode(companyDetail?.companydescription)}}></div>
        {userType === "applicant" && (
        <footer style={{ display: "flex", flexDirection: "column" }}>
            <div className="actions applyBtn">
              <button type="button" className="btn">
                Follow
              </button>
            </div>
        </footer>
        )}
      </div>

      {userType === "applicant" && (
        <div className="postedBy">
        <h4>Created By</h4>
        <header className="bottom">
          <div className="main-icon">{companyDetail?.createdBy?.name?.charAt(0)}</div>
          <div className="info">
            <h5><Link to={`/user/detail/${companyDetail?.createdBy?._id}`}>{companyDetail?.createdBy?.name + " " + companyDetail?.createdBy?.lastName}</Link></h5>
            <p>{companyDetail?.createdBy?.position}</p>
          </div>
        </header>
        </div>
      )}
    </Wrapper>
  );
};

export default CompanyDetail;
