import { useAppContext } from '../context/appContext'
import { useEffect } from 'react'
import Loading from './Loading'
import AppliedJob from './AppliedJob'
import Wrapper from '../assets/wrappers/JobsContainer'

const AppliedJobsContainer = () => {
  const {
    getAppliesJobsByUser,
    isLoading,
    appliedJobs
  } = useAppContext()
  useEffect(() => {
    let user = JSON.parse(localStorage.getItem('user'));
    if(user){
      if(user.userType === 'applicant'){
        getAppliesJobsByUser(user?._id)
      }
    }
    // eslint-disable-next-line
  }, [])
  if (isLoading) {
    return <Loading center />
  }

  if (appliedJobs?.length === 0) {
    return (
      <Wrapper>
        <h2>No jobs to display...</h2>
      </Wrapper>
    )
  }
  return (
    <Wrapper>
      <h5>
      {appliedJobs?.length === 1 && appliedJobs?.length+ ' Job'}  {appliedJobs?.length > 1 && appliedJobs?.length+' Jobs'} found
      </h5>
      <div className='jobs' >
        {appliedJobs?.map((job,index) => {
          return <AppliedJob key={index} company={job.company} job={job.job} />
        })}
      </div>
    </Wrapper>
  )
}

export default AppliedJobsContainer
