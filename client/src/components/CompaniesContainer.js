import { useAppContext } from '../context/appContext'
import { useEffect } from 'react'
import Loading from './Loading'
import Company from './Company'
import Wrapper from '../assets/wrappers/JobsContainer'
import PageBtnContainer from './PageBtnContainer'

const CompaniesContainer = () => {
  const {
    getAllCompanies,
    getCompaniesByUser,
    companies,
    isLoading,
    page,
    search,
    searchStatus,
    searchType,
    sort,
    numOfPages,
    totalCompanies
  } = useAppContext()
  useEffect(() => {
    let user = JSON.parse(localStorage.getItem('user'));
    if(user){
      if(user.userType === 'recruiter'){
        getCompaniesByUser()
      }
      if(user.userType === 'applicant'){
        getAllCompanies()
      }
      if(user.userType === 'admin'){
        getAllCompanies()
      }
    }
    
    // eslint-disable-next-line
  }, [page, search, searchStatus, searchType, sort])
  if (isLoading) {
    return <Loading center />
  }
  
  if (companies.length === 0) {
    return (
      <Wrapper>
        <h2>No Company to display...</h2>
      </Wrapper>
    )
  }

  return (
    <Wrapper>
      <h5>
        {totalCompanies === 1 && totalCompanies+ ' Company'}  {totalCompanies > 1 && totalCompanies+' Companies'} found
      </h5>
      <div className='jobs' >
        {companies.map((company) => {
          return <Company key={company._id} {...company}/>
        })}
      </div>
      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  )
}

export default CompaniesContainer
