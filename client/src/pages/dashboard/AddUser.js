import { useState } from "react";
import { FormRow, Alert, FormRowSelect } from "../../components";
import { useAppContext } from "../../context/appContext";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { Helmet } from "react-helmet";
const EditUser = () => {
  const {
    isEditing,
    setupUser,
    showAlert,
    displayAlert,
    editUser,
    isLoading,
    positions,
    genderOptions,
    locations,
    name,
    email,
    lastName,
    location,
    position,
    gender,
    handleChange
  } = useAppContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !lastName || !location || !position || !gender) {
      displayAlert();
      return;
    }
    if (isEditing) {
      editUser();
      return;
    }
    setupUser({ name, email, lastName, location, position, gender });
  };

  const handleJobInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    handleChange({ name, value });
  };

  return (
    <Wrapper>
      <Helmet>
        <title>Get Job Call | Edit User</title>
      </Helmet>
      <form className="form" onSubmit={handleSubmit}>
        <h3>Edit User</h3>
        {showAlert && <Alert />}
        <div className="form-center">
          <FormRow
            type="text"
            name="name"
            value={name}
            handleChange={handleJobInput}
          />
          <FormRow
            type="text"
            labelText="last name"
            name="lastName"
            value={lastName}
            handleChange={handleJobInput}
          />
          <FormRow
            type="email"
            name="email"
            value={email}
            handleChange={handleJobInput}
          />
          <FormRowSelect
            name="gender"
            value={gender}
            handleChange={handleJobInput}
            list={genderOptions}
          />
          <FormRowSelect
            name="position"
            value={position}
            handleChange={handleJobInput}
            list={positions}
          />
          <FormRowSelect
            name="location"
            value={location}
            handleChange={handleJobInput}
            list={locations}
          />
          <button
            className="btn btn-block profileBtn"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Please Wait..." : "save changes"}
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default EditUser;
