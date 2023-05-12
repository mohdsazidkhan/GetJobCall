import {applicantlinks,recruiterlinks,adminlinks} from '../utils/links'
import { NavLink } from 'react-router-dom'
import { useEffect, useState } from 'react'

const NavLinks = ({ toggleSidebar }) => {
  const [userType, setUserType] = useState('')
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem('user'));
    const userType = user?.userType;
    if(userType){
      setUserType(userType)
    }
  },[userType])
  if(userType === "admin"){
    return (
      <div className='nav-links'>
        {adminlinks.map((link) => {
          const { text, path, id, icon } = link
          return (
            <NavLink
              to={path}
              key={id}
              onClick={toggleSidebar}
              className={({ isActive }) =>
                isActive ? 'nav-link active' : 'nav-link'
              }
            >
              <span className='icon'>{icon}</span>
              {text}
            </NavLink>
          )
        })}
      </div>
    )
  }else if(userType === "recruiter"){
  return (
    <div className='nav-links'>
      {recruiterlinks.map((link) => {
        const { text, path, id, icon } = link
        return (
          <NavLink
            to={path}
            key={id}
            onClick={toggleSidebar}
            className={({ isActive }) =>
              isActive ? 'nav-link active' : 'nav-link'
            }
          >
            <span className='icon'>{icon}</span>
            {text}
          </NavLink>
        )
      })}
    </div>
  )
  }else{
  return (
    <div className='nav-links'>
      {applicantlinks.map((link) => {
        const { text, path, id, icon } = link
        return (
          <NavLink
            to={path}
            key={id}
            onClick={toggleSidebar}
            className={({ isActive }) =>
              isActive ? 'nav-link active' : 'nav-link'
            }
          >
            <span className='icon'>{icon}</span>
            {text}
          </NavLink>
        )
      })}
    </div>
  )
  }
}

export default NavLinks
