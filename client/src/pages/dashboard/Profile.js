import { useState } from 'react'
import { FormRow, Alert, FormRowSelect } from '../../components'
import { useAppContext } from '../../context/appContext'
import Wrapper from '../../assets/wrappers/DashboardFormPage'
import {Helmet} from "react-helmet";
const Profile = () => {

  const { user, showAlert, displayAlert, updateUser, isLoading, positions, genderOptions, locations } = useAppContext()

  const [name, setName] = useState(user?.name)
  const [email, setEmail] = useState(user?.email)
  const [lastName, setLastName] = useState(user?.lastName)
  const [location, setLocation] = useState(user?.location)
  const [position, setPosition] = useState(user?.position)
  const [gender, setGender] = useState(user?.gender)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name || !email || !lastName || !location || !position || !gender) {
      displayAlert()
      return
    }
    updateUser({ name, email, lastName, location, position, gender })
  }

  return (
    <Wrapper>
      <Helmet>
        <title>Get Job Call | Profile</title>
      </Helmet>
      <form className='form' onSubmit={handleSubmit}>
        <h3>My Profile</h3>
        {showAlert && <Alert />}
        <div className='form-center'>
          <FormRow
            type='text'
            name='name'
            value={name}
            handleChange={(e) => setName(e.target.value)}
          />
          <FormRow
            type='text'
            labelText='last name'
            name='lastName'
            value={lastName}
            handleChange={(e) => setLastName(e.target.value)}
          />
          <FormRow
            type='email'
            name='email'
            value={email}
            handleChange={(e) => setEmail(e.target.value)}
          />
          <FormRowSelect
            name='gender'
            value={gender}
            handleChange={(e) => setGender(e.target.value)}
            list={genderOptions}
          />
          <FormRowSelect
            name='position'
            value={position}
            handleChange={(e) => setPosition(e.target.value)}
            list={positions}
          />
          <FormRowSelect
            name='location'
            value={location}
            handleChange={(e) => setLocation(e.target.value)}
            list={locations}
          />
          <button className='btn btn-block profileBtn' type='submit' disabled={isLoading}>
            {isLoading ? 'Please Wait...' : 'save changes'}
          </button>
        </div>
      </form>
    </Wrapper>
  )
}

export default Profile
