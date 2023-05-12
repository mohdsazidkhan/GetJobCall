import { useAppContext } from '../context/appContext'
import { useEffect } from 'react'
import Loading from './Loading'
import Job from './Job'
import Wrapper from '../assets/wrappers/JobsContainer'
import PageBtnContainer from './PageBtnContainer'

const JobsContainer = () => {
  const {
    getAllJobs,
    getJobsByUser,
    jobs,
    isLoading,
    page,
    totalJobs,
    search,
    searchStatus,
    searchType,
    sort,
    numOfPages,
  } = useAppContext()
  useEffect(() => {
    let user = JSON.parse(localStorage.getItem('user'));
    if(user){
      if(user.userType === 'recruiter'){
        getJobsByUser()
      }
      if(user.userType === 'applicant'){
        getAllJobs()
      }
      if(user.userType === 'admin'){
        getAllJobs()
      }
    }
    
    // eslint-disable-next-line
  }, [page, search, searchStatus, searchType, sort])
  if (isLoading) {
    return <Loading center />
  }

  if (jobs.length === 0) {
    return (
      <Wrapper>
        <h2>No jobs to display...</h2>
      </Wrapper>
    )
  }
  return (
    <Wrapper>
      <h5>
      {totalJobs === 1 && totalJobs+ ' Job'}  {totalJobs > 1 && totalJobs+' Jobs'} found
      </h5>
      <div className='jobs' >
        {jobs.map((job) => {
          return <Job key={job._id} company={job.company} createdBy={job.createdBy} {...job}/>
        })}
      </div>
      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  )
}

export default JobsContainer
