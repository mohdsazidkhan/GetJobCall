import { JobsContainer, SearchContainer } from '../../components'
import {Helmet} from "react-helmet";

const AllJobs = () => {
  return (
    <>
      <Helmet>
        <title>Get Job Call | All Jobs</title>
      </Helmet>
      <SearchContainer />
      <JobsContainer />
    </>
  )
}

export default AllJobs
