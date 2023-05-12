import SearchContainer  from '../../components/SearchContainer'
import {Helmet} from "react-helmet";
import CompaniesContainer from '../../components/CompaniesContainer'

const AllCompanies = () => {
  return (
    <>
      <Helmet>
        <title>Get Job Call | All Companies</title>
      </Helmet>
      <CompaniesContainer />
    </>
  )
}

export default AllCompanies
