import moment from "moment";
import {
  FaLocationArrow,
  FaBriefcase,
  FaCalendarAlt,
  FaUser,
  FaRupeeSign,
  FaUsers,
} from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { useAppContext } from "../../context/appContext";
import Wrapper from "../../assets/wrappers/JobDetail";
import OWrapper from "../../assets/wrappers/OpeningInfo";
import JobInfo from "../../components/JobInfo";
import { useEffect, useState } from "react";
import {Helmet} from "react-helmet";

const JobDetail = () => {

  const { getJobDetail, jobDetail, applyJob, applyData} = useAppContext();
  const [userType, setUserType] = useState('')
  const [user, setUser] = useState({});
  const [alert, setAlert] = useState(true);
  const [message, setMessage] = useState("");
  let params = useParams()
  let jobId = params?.jobId;
  useEffect(() => {
    let user = JSON.parse(localStorage.getItem('user'));
    if(user){
      setUser(user);
      setUserType(user.userType);
    }
    getJobDetail(jobId)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const htmlDecode = (content) => {
    let e = document.createElement('div');
    e.innerHTML = content;
    return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
  }

  const userProfile = window.location.origin+`/user/detail/${user?._id}`

  const handleApplyJob = () => {
    let jobData = {
      applicant: user,
      jobDetail: jobDetail

    }
    applyJob(jobData)
    if(applyData){
      setMessage('Job Applied Successfully!')
      setAlert(true)
      // let url = `https://web.whatsapp.com/send?phone=${jobDetail?.createdBy?.phone}`;
      // url += `&text=${encodeURI('Name: '+'*'+user?.name+' '+user?.lastName+'*'+'\n'+'Location: '+'*'+user?.location+'*'+'\n'+'Email: '+'*'+user?.email+'*'+'\n'+'Phone: '+'*'+user?.phone+'*'+'\n'+'Profile: '+userProfile+'\n'+`applied position as a ${'*'+jobDetail?.position+'*'}`+'\n'+`that you posted ${window.location.href}`)}&app_absent=0`;
      // window.open(url);
      setTimeout(() => {
        setAlert(false);
      }, 3000);
    }
  }

  return (
    <Wrapper>
      {alert && <div className={`topAlert`}>{message}</div>}
      <Helmet>
        <title>{`${jobDetail?.position} | ${jobDetail?.company?.companyname} | ${jobDetail?.jobLocation} || Get Job Call`}</title>
      </Helmet>
      <header className="headerTop">
      <div
            className="uploadedImg"
            style={{ backgroundImage: "url(" + jobDetail?.company?.companyimage + ")" }}
          ></div>
        <div className="info">
          <h5>{jobDetail?.position}</h5>
          <p className="companyDetail"><Link to={`/company/detail/${jobDetail?.company?._id}`}>{jobDetail?.company?.companyname}</Link> <span style={{color: '#7e7e7e'}}>{' : '+jobDetail?.jobLocation+' - '+moment(jobDetail?.createdAt).fromNow()}</span></p>
        </div>
      </header>

      <div className="content">
        <div className="content-center">
          <JobInfo icon={<FaLocationArrow />} text={jobDetail?.jobLocation} />
          <JobInfo icon={<FaCalendarAlt />} text={moment(jobDetail?.createdAt).format('DD MMM YYYY')} />
          <JobInfo icon={<FaBriefcase />} text={jobDetail?.jobType} />
          <OWrapper>
            <span className="icon">{<FaRupeeSign />}</span>
            <span className="text">{jobDetail?.salary + "/month"}</span>
          </OWrapper>
          <OWrapper>
            <span className="icon">{<FaUser />}</span>
            <span className="text">{jobDetail?.openings + " openings"}</span>
          </OWrapper>
          <OWrapper>
            <span className="icon">{<FaUsers />}</span>
            <span className="text">{jobDetail?.employees + " employees"}</span>
          </OWrapper>
        </div>
        <div className="descHeading">Description:</div>
        <div className="jobDescription" dangerouslySetInnerHTML={{__html: htmlDecode(jobDetail?.description)}}></div>
        {userType === "applicant" && (
        <footer style={{ display: "flex", flexDirection: "column" }}>
            <div className="actions applyBtn">
              {applyData?.applicant === user?._id || applyData?.data?.applicant === user?._id
              ?
              <button type="button" className="btn applied" style={{cursor:'default'}}>
              Applied
              </button>
              :
              <button type="button" className="btn" onClick={handleApplyJob}>
                Apply Now
              </button>
              }
              <a className="actions callBtn" href={`tel:${jobDetail?.createdBy?.phone}`}>
                Call Now
              </a>
            </div>
        </footer>
        )}
      </div>

      {userType === "applicant" && (
        <div className="postedBy">
        <h4>Posted By</h4>
        <header className="bottom">
          <div className="main-icon">{jobDetail?.createdBy?.name?.charAt(0)}</div>
          <div className="info">
            <h5><Link to={`/user/detail/${jobDetail?.createdBy?._id}`}>{jobDetail?.createdBy?.name + " " + jobDetail?.createdBy?.lastName}</Link></h5>
            <p>{jobDetail?.createdBy?.position}</p>
          </div>
        </header>
        </div>
      )}
    </Wrapper>
  );
};

export default JobDetail;
