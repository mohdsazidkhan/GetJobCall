
import AppliedJobsContainer from '../../components/AppliedJobsContainer'
import {Helmet} from "react-helmet";

const AllJobs = () => {
  return (
    <>
      <Helmet>
        <title>Get Job Call | Applied Jobs</title>
      </Helmet>
      <AppliedJobsContainer />
    </>
  )
}

export default AllJobs
