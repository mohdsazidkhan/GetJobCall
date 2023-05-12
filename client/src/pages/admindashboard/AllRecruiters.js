import RecruitersContainer from '../../components/RecruitersContainer'
import {Helmet} from "react-helmet";

const AllRecruiters = () => {
  return (
    <>
      <Helmet>
        <title>Get Job Call | All Recruiters</title>
      </Helmet>
      <RecruitersContainer />
    </>
  )
}

export default AllRecruiters
