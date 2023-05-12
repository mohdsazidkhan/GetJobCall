import { FormRow, FormRowSelect, Alert } from "../../components";
import { useAppContext } from "../../context/appContext";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";
import ReactQuill from "react-quill";

const AddCompany = () => {
  let {
    isLoading,
    isEditing,
    showAlert,
    displayAlert,
    companyname,
    companyurl,
    companywebsite,
    companytagline,
    companyindustry,
    companysize,
    companytype,
    handleChange,
    clearValues,
    createCompany,
    editCompany,
    industries,
    companysizes,
    companytypes,
    companyimage,
    companydescription,
    companyphone,
    companycountry,
    companycity,
    companystate,
    countriesList
  } = useAppContext();

  const [image, setImage] = useState(null);
  const [imageBase64, setBase64IMG] = useState(null);
  if(image !== null){
    companyimage = image
    
  }else{ 
    companyimage = companyimage
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !companyname ||
      !companyurl ||
      !companywebsite ||
      !companytagline ||
      !companyindustry ||
      !companysize ||
      !companytype ||
      !companyimage ||
      !companydescription ||
      !companyphone ||
      !companycountry ||
      !companycity ||
      !companystate
    ) {
      displayAlert();
      return;
    }
    if (isEditing) {
      editCompany();
      return;
    }
    createCompany(
      companyname,
      companyurl,
      companywebsite,
      companytagline,
      companyindustry,
      companysize,
      companytype,
      companyimage,
      companydescription,
      companyphone,
      companycountry,
      companycity,
      companystate
    );
  };
  const handleCompanyInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    handleChange({ name, value });
  };
  const handleImageChange = (e) => {
    convertToBase64(e.target.files[0]);
    setImage(e.target.files[0]);
  };

  const convertToBase64 = (selectedFile) => {
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onload = () => {
      setBase64IMG(reader.result);
    };
  };
  const handleDescription = (value) => {
    companydescription = value;
  };

  const htmlDecode = (content) => {
    let e = document.createElement('div');
    return e.innerHTML = content;
    //return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
  }

  let imgUrl = ''
  {
    imageBase64
      ? (imgUrl = imageBase64)
      : companyimage
      ? (imgUrl = companyimage)
      : (imgUrl = "/company.png")
  }
  return (
    <Wrapper>
      <form className="form">
        <h3>{isEditing ? "Edit Company" : "Add Company"}</h3>
        {showAlert && <Alert />}
        <div className="form-center">
          {/* company image*/}
          
          <div
            className="uploadedImg"
            style={{ backgroundImage: "url(" + imgUrl + ")" }}
          >
            <label className="cLogo">Logo</label>
            <input
              className="uploadCompany"
              name="image"
              type="file"
              onChange={handleImageChange}
            />
          </div>
          {/* company name */}
          <FormRow
            type="text"
            labelText="Name"
            name="companyname"
            value={companyname}
            handleChange={handleCompanyInput}
            placeholderText="Name"
          />
          {/* company url */}
          <FormRow
            type="text"
            labelText="URL"
            placeholderText="@example"
            name="companyurl"
            value={companyurl}
            handleChange={handleCompanyInput}
          />
          {/* company website */}
          <FormRow
            type="text"
            name="companywebsite"
            labelText="Website"
            placeholderText="www.example.com"
            value={companywebsite}
            handleChange={handleCompanyInput}
          />
          {/* company tagline */}
          <FormRow
            type="text"
            name="companytagline"
            labelText="Tagline"
            placeholderText="Enter tagline"
            value={companytagline}
            handleChange={handleCompanyInput}
          />
          {/* company industry */}
          <FormRowSelect
            name="companyindustry"
            value={companyindustry}
            labelText="Industry"
            handleChange={handleCompanyInput}
            list={industries}
          />
          {/* company size */}
          <FormRowSelect
            name="companysize"
            labelText="Size"
            value={companysize}
            handleChange={handleCompanyInput}
            list={companysizes}
          />
          {/* company type */}
          <FormRowSelect
            name="companytype"
            labelText="Type"
            value={companytype}
            handleChange={handleCompanyInput}
            list={companytypes}
          />
          {/* company type */}
          <FormRow
              type='text'
              name='companyphone'
              labelText="Phone No."
              placeholderText="1234567890"
              value={companyphone}
              handleChange={handleCompanyInput}
            />
            {/* company type */}
            <FormRowSelect
              name="companycountry"
              labelText="Country"
              value={companycountry}
              handleChange={handleCompanyInput}
              list={countriesList}
            />
            {/* company city */}
            <FormRow
              type='text'
              name='companycity'
              value={companycity}
              placeholderText="Delhi"
              labelText="City"
              handleChange={handleCompanyInput}
            />
            {/* company state */}
            <FormRow
              type='text'
              name='companystate'
              value={companystate}
              labelText="State"
              placeholderText="Delhi"
              handleChange={handleCompanyInput}
            />
        </div>
        
        {/* company description */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            margin: "15px 0 60px 0",
          }}
        >
          <label>Company Description</label>
          <ReactQuill
            style={{ height: "200px" }}
            theme="snow"
            value={htmlDecode(companydescription)}
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

export default AddCompany;
