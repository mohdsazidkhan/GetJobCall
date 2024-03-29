import { useState, useEffect } from 'react'
import { Logo, FormRow, Alert, FormRowSelect } from '../components'
import Wrapper from '../assets/wrappers/RegisterPage'
import { useAppContext } from '../context/appContext'
import { useNavigate } from 'react-router-dom'

const initialState = {
  userType: '',
  name: '',
  email: '',
  password: '',
  isMember: true,
}

const Register = () => {

  const navigate = useNavigate()
  const [values, setValues] = useState(initialState)
  const { user, isLoading, showAlert, displayAlert, setupUser, userTypeOptions } = useAppContext()

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember })
  }

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }
  const onSubmit = (e) => {
   
    e.preventDefault()
    const { userType, name, email, phone, password, isMember } = values
    if (!values) {
      displayAlert()
      return
    }
    const currentUser = { userType, name, email, phone, password }

    if (isMember) {
      setupUser({
        currentUser,
        endPoint: 'login',
        alertText: 'Login Successful! Redirecting...',
      })
    } else {
      setupUser({
        currentUser,
        endPoint: 'register',
        alertText: 'User Created! Redirecting...',
      })
    }
  }

  useEffect(() => {
    if(user){
      setTimeout(() => {
        if(user.userType === 'admin'){
          navigate('/dashboard')
        }
        if(user.userType === 'recruiter'){
          navigate('/stats')
        }
        if(user.userType === 'applicant'){
          navigate('/all-jobs')
        }
      }, 3000)
    }
  }, [user, navigate])

  return (
    <Wrapper className='full-page'>
      <form className='form' onSubmit={onSubmit}>
        <Logo />
        <h3>{values.isMember ? 'Login' : 'Register'}</h3>
        {showAlert && <Alert />}
        {/* user type */}
        {!values.isMember && (
        <FormRowSelect
            name='userType'
            value={values.userType}
            handleChange={handleChange}
            list={userTypeOptions}
          />
        )}
        {/* name input */}
        {!values.isMember && (
          <FormRow
            type='text'
            name='name'
            value={values.name}
            handleChange={handleChange}
          />
        )}

        {!values.isMember && (
          <FormRow
            type='text'
            name='phone'
            value={values.phone}
            handleChange={handleChange}
          />
        )}

        {/* email input */}
        <FormRow
          type='email'
          name='email'
          value={values.email}
          handleChange={handleChange}
        />
        {/* password input */}
        <FormRow
          type='password'
          name='password'
          value={values.password}
          handleChange={handleChange}
        />
        <button type='submit' className='btn btn-block' disabled={isLoading}>
          submit
        </button>
        <p>
          {values.isMember ? 'Not a member yet?' : 'Already a member?'}
          <button type='button' onClick={toggleMember} className='member-btn'>
            {values.isMember ? 'Register' : 'Login'}
          </button>
        </p>
      </form>
    </Wrapper>
  )
}
export default Register
