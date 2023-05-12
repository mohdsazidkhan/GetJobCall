import { useAppContext } from '../context/appContext'
import { useEffect } from 'react'
import Loading from './Loading'
import User from './User'
import Wrapper from '../assets/wrappers/JobsContainer'
import PageBtnContainer from './PageBtnContainer'

const UsersContainer = () => {
  const {
    getAllUsers,
    users,
    isLoading,
    page,
    numOfPages,
  } = useAppContext()
  useEffect(() => {
    let user = JSON.parse(localStorage.getItem('user'));
    if(user){
      if(user.userType === 'admin'){
        getAllUsers()
      }
    }
    // eslint-disable-next-line
  }, [page])
  if (isLoading) {
    return <Loading center />
  }

  if (users.length === 0) {
    return (
      <Wrapper>
        <h2>No users to display...</h2>
      </Wrapper>
    )
  }
  return (
    <Wrapper>
      <h5>
        {users?.length === 1 && users?.length+ ' User'}  {users?.length > 1 && users?.length+' Users'} found
      </h5>
      
      <div className='jobs' >
        {users.map((oneuser,index) => {
          return <User key={index} {...oneuser}/>
        })}
      </div>
      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  )
}

export default UsersContainer
