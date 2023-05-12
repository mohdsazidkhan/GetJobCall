import ApplicantsContainer from '../../components/ApplicantsContainer'
import {Helmet} from "react-helmet";

const AllApplicants = () => {
  return (
    <>
      <Helmet>
        <title>Get Job Call | All Applicants</title>
      </Helmet>
      <ApplicantsContainer />
    </>
  )
}

export default AllApplicants
