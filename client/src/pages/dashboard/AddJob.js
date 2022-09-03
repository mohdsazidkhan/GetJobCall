import { FormRow, FormRowSelect, Alert } from '../../components'
import { useAppContext } from '../../context/appContext'
import Wrapper from '../../assets/wrappers/DashboardFormPage'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useState } from 'react';
const AddJob = () => {
  const {
    isLoading,
    isEditing,
    showAlert,
    displayAlert,
    positions,
    company,
    locations,
    jobType,
    jobTypeOptions,
    status,
    statusOptions,
    handleChange,
    clearValues,
    createJob,
    editJob,
    openings,
    salary,
    employees,
  } = useAppContext();

  const [description, setDecription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!positions || !company || !locations || !openings || !salary) {
      displayAlert()
      return
    }
    if (isEditing) {
      editJob()
      return
    }
    createJob(description)
  }
  const handleJobInput = (e) => {
    const name = e.target.name
    const value = e.target.value
    handleChange({ name, value })
  }

  const handleDescription = (value) => {
    setDecription(value)
  }

  return (
    <Wrapper>
      <form className='form'>
        <h3>{isEditing ? 'edit job' : 'add job'}</h3>
        {showAlert && <Alert />}
        <div className='form-center'>
          {/* position */}
          <FormRowSelect
            name='position'
            value={positions}
            handleChange={handleJobInput}
            list={positions}
          />
          {/* company */}
          <FormRow
            type='text'
            name='company'
            value={company}
            handleChange={handleJobInput}
          />
          {/* openings */}
          <FormRow
            type='text'
            name='openings'
            value={openings}
            handleChange={handleJobInput}
          />
          {/* employees */}
          <FormRow
            type='text'
            name='employees'
            value={employees}
            handleChange={handleJobInput}
          />
          {/* salary */}
          <FormRow
            type='text'
            name='salary'
            value={salary}
            handleChange={handleJobInput}
          />
          {/* location */}
          <FormRowSelect
            name='location'
            value={locations}
            handleChange={handleJobInput}
            list={locations}
          />
          {/* job status */}
          <FormRowSelect
            name='status'
            value={status}
            handleChange={handleJobInput}
            list={statusOptions}
          />
          {/* job type */}
          <FormRowSelect
            name='jobType'
            labelText='job type'
            value={jobType}
            handleChange={handleJobInput}
            list={jobTypeOptions}
          />
        </div>
        <div style={{display: 'flex', flexDirection: 'column', margin: '15px 0 60px 0'}}>
          <ReactQuill 
            style={{height: '200px'}}
            theme="snow" 
            value={description} 
            onChange={handleDescription} 
          />
          </div>
          {/* btn container */}
          <div className='btn-container'>
            <button
              type='submit'
              className='btn btn-block submit-btn'
              onClick={handleSubmit}
              disabled={isLoading}
            >
              submit
            </button>
            <button
              className='btn btn-block clear-btn'
              onClick={(e) => {
                e.preventDefault()
                clearValues()
              }}
            >
              clear
            </button>
          </div>
      </form>
    </Wrapper>
  )
}

export default AddJob
