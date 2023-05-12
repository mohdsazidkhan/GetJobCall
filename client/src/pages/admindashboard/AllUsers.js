import UsersContainer from '../../components/UsersContainer'
import {Helmet} from "react-helmet";

const AllJobs = () => {
  return (
    <>
      <Helmet>
        <title>Get Job Call | All Users</title>
      </Helmet>
      <UsersContainer />
    </>
  )
}

export default AllJobs
