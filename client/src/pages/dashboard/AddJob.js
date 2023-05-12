import { FormRow, FormRowSelect, Alert } from "../../components";
import { useAppContext } from "../../context/appContext";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useEffect } from "react";

const AddJob = () => {
  let {
    isLoading,
    isEditing,
    showAlert,
    displayAlert,
    positions,
    position,
    company,
    jobLocation,
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
    description,
    getCompaniesByUser,
    companies,
  } = useAppContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !position ||
      !company ||
      !openings ||
      !employees ||
      !salary ||
      !jobLocation ||
      !status ||
      !jobType ||
      !description
    ) {
      displayAlert();
      return;
    }
    if (isEditing) {
      editJob();
      return;
    }
    createJob(
      position,
      company,
      openings,
      employees,
      salary,
      jobLocation,
      status,
      jobType,
      description
    );
  };
  const handleJobInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    handleChange({ name, value });
  };

  const handleDescription = (value) => {
    description = value;
  };

  const htmlDecode = (content) => {
    let e = document.createElement('div');
    return e.innerHTML = content;
    //return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
  }

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem('user'));
    if(user){
      if(user.userType === 'recruiter'){
        getCompaniesByUser()
      }
    }
    // eslint-disable-next-line
  }, [])

  return (
    <Wrapper>
      <form className="form">
        <h3>{isEditing ? "edit job" : "add job"}</h3>
        {showAlert && <Alert />}
        <div className="form-center">
          {/* position */}
          <FormRowSelect
            name="position"
            value={position}
            handleChange={handleJobInput}
            list={positions}
          />
          {/* company */}
          <div className='form-row'>
          <label htmlFor={company} className='form-label'>
            company
          </label>
          <select
          className='form-select'
            name="company"
            onChange={handleJobInput}
          >
            <option value=''>Select Company</option>
            {companies?.length> 0 && companies?.map((item)=>
              <option key={item?._id} value={item?._id}>{item?.companyname}</option>
            )}
          </select>
          </div>
          {/* openings */}
          <FormRow
            type="text"
            name="openings"
            value={openings}
            handleChange={handleJobInput}
          />
          {/* employees */}
          <FormRow
            type="text"
            name="employees"
            value={employees}
            handleChange={handleJobInput}
          />
          {/* salary */}
          <FormRow
            type="text"
            name="salary"
            labelText="Salary (per month)"
            value={salary}
            handleChange={handleJobInput}
          />
          {/* location */}
          <FormRowSelect
            name="jobLocation"
            value={jobLocation}
            labelText="Job Location"
            handleChange={handleJobInput}
            list={locations}
          />
          {/* job status */}
          <FormRowSelect
            name="status"
            value={status}
            handleChange={handleJobInput}
            list={statusOptions}
          />
          {/* job type */}
          <FormRowSelect
            name="jobType"
            labelText="job type"
            value={jobType}
            handleChange={handleJobInput}
            list={jobTypeOptions}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            margin: "15px 0 60px 0",
          }}
        >
          <ReactQuill
            style={{ height: "200px" }}
            theme="snow"
            value={htmlDecode(description)}
            onChange={handleDescription}
          />
        </div>
        {/* btn container */}
        <div className="btn-container addJobBtn">
          <button
            type="submit"
            className="btn btn-block submit-btn"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            submit
          </button>
          <button
            className="btn btn-block clear-btn"
            onClick={(e) => {
              e.preventDefault();
              clearValues();
            }}
          >
            clear
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default AddJob;
