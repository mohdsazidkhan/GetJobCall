import React, { useReducer, useContext } from "react";

import reducer from "./reducer";
import axios from "axios";
import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  TOGGLE_SIDEBAR,
  LOGOUT_USER,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  HANDLE_CHANGE,
  CLEAR_VALUES,
  CREATE_JOB_BEGIN,
  CREATE_JOB_SUCCESS,
  CREATE_JOB_ERROR,
  CREATE_COMPANY_BEGIN,
  CREATE_COMPANY_SUCCESS,
  CREATE_COMPANY_ERROR,
  GET_JOBS_BEGIN,
  GET_JOBS_SUCCESS,
  GET_USERS_BEGIN,
  GET_USERS_SUCCESS,
  GET_JOB_DETAIL_BEGIN,
  GET_JOB_DETAIL_SUCCESS,
  GET_COMPANIES_BEGIN,
  GET_COMPANIES_SUCCESS,
  GET_COMPANY_DETAIL_BEGIN,
  GET_COMPANY_DETAIL_SUCCESS,
  GET_USER_DETAIL_BEGIN,
  GET_USER_DETAIL_SUCCESS,
  SET_EDIT_JOB,
  SET_EDIT_COMPANY,
  SET_EDIT_USER,
  DELETE_JOB_BEGIN,
  DELETE_USER_BEGIN,
  EDIT_JOB_BEGIN,
  EDIT_JOB_SUCCESS,
  EDIT_JOB_ERROR,
  EDIT_USER_BEGIN,
  EDIT_USER_SUCCESS,
  EDIT_USER_ERROR,
  EDIT_COMPANY_BEGIN,
  EDIT_COMPANY_SUCCESS,
  EDIT_COMPANY_ERROR,
  SHOW_STATS_BEGIN,
  SHOW_DASHBOARD_STATS_BEGIN,
  SHOW_DASHBOARD_STATS_SUCCESS,
  SHOW_STATS_SUCCESS,
  CLEAR_FILTERS,
  CHANGE_PAGE,
  APPLY_JOB_BEGIN,
  APPLY_JOB_SUCCESS,
  APPLY_JOB_ERROR,
  GET_APPLIED_JOBS_BEGIN,
  GET_APPLIED_JOBS_SUCCESS
} from "./actions";

const token = localStorage.getItem("token");
const user = localStorage.getItem("user");
const userLocation = localStorage.getItem("location");
const userPhone = localStorage.getItem("phone");

const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  user: user ? JSON.parse(user) : null,
  token: token,
  userLocation: userLocation || "",
  showSidebar: false,
  isEditing: false,
  editJobId: "",
  editUserId: "",
  editCompanyId: "",
  userId: "",
  users: [],
  position: "",
  company: "",
  jobLocation: userLocation || "",
  userDetail: {},
  jobTypeOptions: [
    "Select Job Type",
    "full-time",
    "part-time",
    "remote",
    "internship",
    "contract",
  ],
  positions: [
    "Select Position",
    "Web Designer",
    "Web Developer",
    "Front End Developer",
    "Full Stack Developer",
    "PHP Developer",
    "JAVA Developer",
    "Dot Net Developer",
    "Python Developer",
    "C++ Developer",
    "Android Developer",
    "IOS Developer",
    "React Native Developer",
    "Flutter Developer",
    "Angular Developer",
    "ReactJS Developer",
    "VueJS Developer",
    "DevOps Engineer",
    "Graphic Designer",
    "Marketing Manager",
    "Project Manager",
    "Finance Manager",
    "Human Resources",
    "Marketing Specialist",
    "Business Analyst",
    "Accountant",
    "Sales Representative",
    "Video Editor",
    "Content Writer",
    "Teacher",
    "Fashion Designer",
    "Electrician",
    "Painter",
    "Carpenter",
    "Waiter",
    "Driver",
    "Delivery",
  ],
  jobType: "Select Job Type",
  statusOptions: [
    "Select Status",
    "posted",
    "interview",
    "declined",
    "pending",
    "rejected",
  ],
  userTypeOptions: ["Select Type", "applicant", "recruiter"],
  genderOptions: ["Select Gender", "Male", "Female", "Other"],
  locations: [
    "Select Location",
    "Delhi",
    "Gurgaon",
    "Noida",
    "Faridabad",
    "Ghaziabad",
    "Bangalore",
    "Pune",
    "Hydrabad",
    "Indore",
    "Jaipur",
    "Lucknow",
    "Chandigarh",
    "Mohali",
    "Kanpur",
    "Nagpur",
    "Bhopal",
    "Ahamdabad",
    "Surat",
    "Coimbtore",
  ],
  jobs: [],
  companies: [],
  totalJobs: "",
  totalUsers: "",
  totalCompanies: "",
  openings: "",
  numOfPages: "",
  page: 1,
  stats: {},
  dashboardStats: {},
  salary: "",
  monthlyApplications: [],
  monthlyjobsdata: [],
  monthlycompaniesdata: [],
  monthlyusersdata: [],
  search: "",
  searchStatus: "all",
  searchType: "all",
  sort: "latest",
  sortOptions: ["latest", "oldest", "a-z", "z-a"],
  employees: "",
  description: "",
  jobDetail: {},
  companyDetail: {},
  industries: [
    "Select Industry",
    "Agriculture",
    "Arts",
    "Construction",
    "Consumer Goods",
    "Corporate Services",
    "Design",
    "Education",
    "Energy & Mining",
    "Entertainment",
    "Finance",
    "Hardware & Networking",
    "Health Care",
    "Legal",
    "Manufacturing",
    "Media & Communications",
    "Nonprofit",
    "Public Administration",
    "Public Safety",
  ],
  companysizes: [
    "Select Size",
    "0-5 employees",
    "5-10 employees",
    "10-20 employees",
    "20-30 employees",
    "30-50 employees",
    "40-50 employees",
    "50-100 employees",
    "60-70 employees",
    "70-80 employees",
    "80-90 employees",
    "90-100 employees",
    "100-200 employees",
    "200-300 employees",
    "300-400 employees",
    "500-500 employees",
    "500-600 employees",
    "600-700 employees",
    "700-800 employees",
    "800-900 employees",
    "900-1000 employees",
    "1000-5000 employees",
    "5000-10000 employees",
    "10000+ employees",
  ],
  companytypes: [
    "Select Type",
    "Public Company",
    "Self-Employed",
    "Government Agency",
    "Non-Profit",
    "Sole Proprietorship",
    "Privately Held",
    "Partnership",
    "Other",
  ],
  companyimage: null,
  companydescription: "",
  companyphone: userPhone ? userPhone : "",
  companycity: "",
  companystate: "",
  companycountry: "",
  countriesList: [
    "Afghanistan",
    "Albania",
    "Algeria",
    "American Samoa",
    "Andorra",
    "Angola",
    "Anguilla",
    "Antarctica",
    "Antigua and Barbuda",
    "Argentina",
    "Armenia",
    "Aruba",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas (the)",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bermuda",
    "Bhutan",
    "Bolivia (Plurinational State of)",
    "Bonaire, Sint Eustatius and Saba",
    "Bosnia and Herzegovina",
    "Botswana",
    "Bouvet Island",
    "Brazil",
    "British Indian Ocean Territory (the)",
    "Brunei Darussalam",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Cabo Verde",
    "Cambodia",
    "Cameroon",
    "Canada",
    "Cayman Islands (the)",
    "Central African Republic (the)",
    "Chad",
    "Chile",
    "China",
    "Christmas Island",
    "Cocos (Keeling) Islands (the)",
    "Colombia",
    "Comoros (the)",
    "Congo (the Democratic Republic of the)",
    "Congo (the)",
    "Cook Islands (the)",
    "Costa Rica",
    "Croatia",
    "Cuba",
    "Curaçao",
    "Cyprus",
    "Czechia",
    "Côte d'Ivoire",
    "Denmark",
    "Djibouti",
    "Dominica",
    "Dominican Republic (the)",
    "Ecuador",
    "Egypt",
    "El Salvador",
    "Equatorial Guinea",
    "Eritrea",
    "Estonia",
    "Eswatini",
    "Ethiopia",
    "Falkland Islands (the) [Malvinas]",
    "Faroe Islands (the)",
    "Fiji",
    "Finland",
    "France",
    "French Guiana",
    "French Polynesia",
    "French Southern Territories (the)",
    "Gabon",
    "Gambia (the)",
    "Georgia",
    "Germany",
    "Ghana",
    "Gibraltar",
    "Greece",
    "Greenland",
    "Grenada",
    "Guadeloupe",
    "Guam",
    "Guatemala",
    "Guernsey",
    "Guinea",
    "Guinea-Bissau",
    "Guyana",
    "Haiti",
    "Heard Island and McDonald Islands",
    "Holy See (the)",
    "Honduras",
    "Hong Kong",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Iran (Islamic Republic of)",
    "Iraq",
    "Ireland",
    "Isle of Man",
    "Israel",
    "Italy",
    "Jamaica",
    "Japan",
    "Jersey",
    "Jordan",
    "Kazakhstan",
    "Kenya",
    "Kiribati",
    "Korea (the Democratic People's Republic of)",
    "Korea (the Republic of)",
    "Kuwait",
    "Kyrgyzstan",
    "Lao People's Democratic Republic (the)",
    "Latvia",
    "Lebanon",
    "Lesotho",
    "Liberia",
    "Libya",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Macao",
    "Madagascar",
    "Malawi",
    "Malaysia",
    "Maldives",
    "Mali",
    "Malta",
    "Marshall Islands (the)",
    "Martinique",
    "Mauritania",
    "Mauritius",
    "Mayotte",
    "Mexico",
    "Micronesia (Federated States of)",
    "Moldova (the Republic of)",
    "Monaco",
    "Mongolia",
    "Montenegro",
    "Montserrat",
    "Morocco",
    "Mozambique",
    "Myanmar",
    "Namibia",
    "Nauru",
    "Nepal",
    "Netherlands (the)",
    "New Caledonia",
    "New Zealand",
    "Nicaragua",
    "Niger (the)",
    "Nigeria",
    "Niue",
    "Norfolk Island",
    "Northern Mariana Islands (the)",
    "Norway",
    "Oman",
    "Pakistan",
    "Palau",
    "Palestine, State of",
    "Panama",
    "Papua New Guinea",
    "Paraguay",
    "Peru",
    "Philippines (the)",
    "Pitcairn",
    "Poland",
    "Portugal",
    "Puerto Rico",
    "Qatar",
    "Republic of North Macedonia",
    "Romania",
    "Russian Federation (the)",
    "Rwanda",
    "Réunion",
    "Saint Barthélemy",
    "Saint Helena, Ascension and Tristan da Cunha",
    "Saint Kitts and Nevis",
    "Saint Lucia",
    "Saint Martin (French part)",
    "Saint Pierre and Miquelon",
    "Saint Vincent and the Grenadines",
    "Samoa",
    "San Marino",
    "Sao Tome and Principe",
    "Saudi Arabia",
    "Senegal",
    "Serbia",
    "Seychelles",
    "Sierra Leone",
    "Singapore",
    "Sint Maarten (Dutch part)",
    "Slovakia",
    "Slovenia",
    "Solomon Islands",
    "Somalia",
    "South Africa",
    "South Georgia and the South Sandwich Islands",
    "South Sudan",
    "Spain",
    "Sri Lanka",
    "Sudan (the)",
    "Suriname",
    "Svalbard and Jan Mayen",
    "Sweden",
    "Switzerland",
    "Syrian Arab Republic",
    "Taiwan",
    "Tajikistan",
    "Tanzania, United Republic of",
    "Thailand",
    "Timor-Leste",
    "Togo",
    "Tokelau",
    "Tonga",
    "Trinidad and Tobago",
    "Tunisia",
    "Turkey",
    "Turkmenistan",
    "Turks and Caicos Islands (the)",
    "Tuvalu",
    "Uganda",
    "Ukraine",
    "United Arab Emirates (the)",
    "United Kingdom of Great Britain and Northern Ireland (the)",
    "United States Minor Outlying Islands (the)",
    "United States of America (the)",
    "Uruguay",
    "Uzbekistan",
    "Vanuatu",
    "Venezuela (Bolivarian Republic of)",
    "Viet Nam",
    "Virgin Islands (British)",
    "Virgin Islands (U.S.)",
    "Wallis and Futuna",
    "Western Sahara",
    "Yemen",
    "Zambia",
    "Zimbabwe",
    "Åland Islands",
  ],
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // axios
  const authFetch = axios.create({
    baseURL: "/api/v1",
  });
  // request

  authFetch.interceptors.request.use(
    (config) => {
      config.headers.common["Authorization"] = `Bearer ${state.token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  // response

  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      // console.log(error.response)
      if (error.response.status === 401) {
        logoutUser();
      }
      return Promise.reject(error);
    }
  );

  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
    clearAlert();
  };

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 3000);
  };

  const addUserToLocalStorage = ({ user, token, location }) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    localStorage.setItem("location", location);
  };

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("location");
  };

  const applyJob = async (jobData) => {
    dispatch({ type: APPLY_JOB_BEGIN });
    try {
      const data = await authFetch.post(`/jobs/applyJob`,
        jobData
      );
      dispatch({
        type: APPLY_JOB_SUCCESS,
        payload: data,
      });

    } catch (error) {
      console.log(error, " error");
      dispatch({
        type: APPLY_JOB_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const setupUser = async ({ currentUser, endPoint, alertText }) => {
    dispatch({ type: SETUP_USER_BEGIN });
    try {
      const { data } = await axios.post(
        `/api/v1/auth/${endPoint}`,
        currentUser
      );
      const { user, token, location, userType } = data;

      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: { user, token, location, alertText, userType },
      });
      addUserToLocalStorage({ user, token, location, userType });
    } catch (error) {
      console.log(error, " error");
      dispatch({
        type: SETUP_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };
  const toggleSidebar = () => {
    dispatch({ type: TOGGLE_SIDEBAR });
  };

  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER });
    removeUserFromLocalStorage();
  };
  const updateUser = async (currentUser) => {
    dispatch({ type: UPDATE_USER_BEGIN });
    try {
      const { data } = await authFetch.patch("/auth/updateUser", currentUser);

      const { user, location, token } = data;

      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: { user, location, token },
      });
      addUserToLocalStorage({ user, location, token });
    } catch (error) {
      if (error.response.status !== 401) {
        dispatch({
          type: UPDATE_USER_ERROR,
          payload: { msg: error.response.data.msg },
        });
      }
    }
    clearAlert();
  };

  const handleChange = ({ name, value }) => {
    dispatch({ type: HANDLE_CHANGE, payload: { name, value } });
  };
  const clearValues = () => {
    dispatch({ type: CLEAR_VALUES });
  };
  const createJob = async (
    position,
    company,
    openings,
    employees,
    salary,
    jobLocation,
    status,
    jobType,
    description
  ) => {
    dispatch({ type: CREATE_JOB_BEGIN });
    try {
      await authFetch
        .post("/jobs", {
          position,
          company,
          openings,
          employees,
          salary,
          jobLocation,
          status,
          jobType,
          description,
        })
        .then((response) => {
          if (response.status === 201) {
            window.location.replace("/all-jobs");
          }
        });
      dispatch({ type: CREATE_JOB_SUCCESS });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: CREATE_JOB_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const createCompany = async (
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
  ) => {
    dispatch({ type: CREATE_COMPANY_BEGIN });
    const formData = new FormData();
    formData.append("companyname", companyname);
    formData.append("companyurl", companyurl);
    formData.append("companywebsite", companywebsite);
    formData.append("companytagline", companytagline);
    formData.append("companyindustry", companyindustry);
    formData.append("companysize", companysize);
    formData.append("companytype", companytype);
    formData.append("companyimage", companyimage);
    formData.append("companydescription", companydescription);
    formData.append("companyphone", companyphone);
    formData.append("companycountry", companycountry);
    formData.append("companycity", companycity);
    formData.append("companystate", companystate);
    try {
      await authFetch.post("/companies/new", formData).then((response) => {
        if (response.status === 201) {
          window.location.replace("/all-companies");
        }
      });
      dispatch({ type: CREATE_COMPANY_SUCCESS });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: CREATE_COMPANY_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const getAllJobs = async () => {
    const { page, search, searchStatus, searchType, sort } = state;

    let url = `/jobs/all?page=${page}&status=${searchStatus}&jobType=${searchType}&sort=${sort}`;

    if (search) {
      url = url + `&search=${search}`;
    }

    dispatch({ type: GET_JOBS_BEGIN });

    try {
      const { data } = await authFetch(url);
      const { jobs, totalJobs, numOfPages } = data;
      dispatch({
        type: GET_JOBS_SUCCESS,
        payload: {
          jobs,
          totalJobs,
          numOfPages,
        },
      });
    } catch (error) {
      logoutUser();
    }
    clearAlert();
  };

  const getAppliesJobsByUser = async (userId) => {

    let url = `/jobs/all/applied/${userId}`;
    
    dispatch({ type: GET_APPLIED_JOBS_BEGIN });

    try {
      const { data } = await authFetch(url);
      const { appliedJobs } = data;
      dispatch({
        type: GET_APPLIED_JOBS_SUCCESS,
        payload: {
          appliedJobs
        },
      });
    } catch (error) {
      logoutUser();
    }
    clearAlert();
  };

  const getAllUsers = async () => {
    const { page } = state;

    let url = `/users/all?page=${page}`;

    dispatch({ type: GET_USERS_BEGIN });

    try {
      const { data } = await authFetch(url);
      const { users, totalUsers, numOfPages } = data;
      dispatch({
        type: GET_USERS_SUCCESS,
        payload: {
          users,
          totalUsers,
          numOfPages,
        },
      });
    } catch (error) {
      logoutUser();
    }
    clearAlert();
  };

  const getAllCompanies = async () => {
    const { page, search } = state;

    let url = `/companies/all?page=${page}`;

    if (search) {
      url = url + `&search=${search}`;
    }

    dispatch({ type: GET_COMPANIES_BEGIN });

    try {
      const { data } = await authFetch(url);
      const { companies, totalCompanies, numOfPages } = data;
      dispatch({
        type: GET_COMPANIES_SUCCESS,
        payload: {
          companies,
          totalCompanies,
          numOfPages,
        },
      });
    } catch (error) {
      logoutUser();
    }
    clearAlert();
  };

  const getJobsByUser = async () => {
    const { page, search, searchStatus, searchType, sort } = state;

    let url = `/jobs/?page=${page}&status=${searchStatus}&jobType=${searchType}&sort=${sort}`;
    if (search) {
      url = url + `&search=${search}`;
    }
    dispatch({ type: GET_JOBS_BEGIN });
    try {
      const { data } = await authFetch(url);

      const { jobs, totalJobs, numOfPages } = data;

      dispatch({
        type: GET_JOBS_SUCCESS,
        payload: {
          jobs,
          totalJobs,
          numOfPages,
        },
      });
    } catch (error) {
      logoutUser();
    }
    clearAlert();
  };

  const getCompaniesByUser = async () => {
    const { page, search } = state;

    let url = `/companies/?page=${page}`;
    if (search) {
      url = url + `&search=${search}`;
    }
    dispatch({ type: GET_COMPANIES_BEGIN });
    try {
      const { data } = await authFetch(url);
      const { companies, totalCompanies, numOfPages } = data;
      dispatch({
        type: GET_COMPANIES_SUCCESS,
        payload: {
          companies,
          totalCompanies,
          numOfPages,
        },
      });
    } catch (error) {
      logoutUser();
    }
    clearAlert();
  };

  const getJobDetail = async (jobId) => {
    let url = `/jobs/detail/${jobId}`;
    dispatch({ type: GET_JOB_DETAIL_BEGIN });
    try {
      const response = await authFetch(url);
      let jobDetail = Object.assign({}, ...response.data.jobdetail.jsonResult);
      let applyData = Object.assign({}, ...response.data.jobdetail.jsonData);
      dispatch({
        type: GET_JOB_DETAIL_SUCCESS,
        payload: {
          jobDetail,
          applyData
        },
      });
    } catch (error) {
      logoutUser();
    }
    clearAlert();
  };

  const getCompanyDetail = async (companyId) => {
    let url = `/companies/detail/${companyId}`;
    dispatch({ type: GET_COMPANY_DETAIL_BEGIN });
    try {
      const response = await authFetch(url);
      let companyDetail = Object.assign({}, ...response.data.companydetail);

      dispatch({
        type: GET_COMPANY_DETAIL_SUCCESS,
        payload: {
          companyDetail,
        },
      });
    } catch (error) {
      logoutUser();
    }
    clearAlert();
  };

  const getUserDetail = async (userId) => {
    let url = `/users/detail/${userId}`;
    dispatch({ type: GET_USER_DETAIL_BEGIN });
    try {
      const response = await authFetch(url);
      let userDetail = Object.assign({}, ...response.data.userdetail);

      dispatch({
        type: GET_USER_DETAIL_SUCCESS,
        payload: {
          userDetail,
        },
      });
    } catch (error) {
      logoutUser();
    }
    clearAlert();
  };

  const setEditJob = (id) => {
    dispatch({ type: SET_EDIT_JOB, payload: { id } });
  };
  const setEditCompany = (id) => {
    dispatch({ type: SET_EDIT_COMPANY, payload: { id } });
  };
  const setEditUser = (id) => {
    dispatch({ type: SET_EDIT_USER, payload: { id } });
  };
  const editJob = async () => {
    dispatch({ type: EDIT_JOB_BEGIN });

    try {
      const {
        position,
        company,
        openings,
        employees,
        salary,
        jobLocation,
        status,
        jobType,
        description,
      } = state;
      await authFetch.patch(`/jobs/${state.editJobId}`, {
        position,
        company,
        openings,
        employees,
        salary,
        jobLocation,
        status,
        jobType,
        description,
      });
      dispatch({ type: EDIT_JOB_SUCCESS });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: EDIT_JOB_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };
  const editUser = async () => {
    dispatch({ type: EDIT_USER_BEGIN });

    try {
      const { name, email, lastName, location, position, gender } = state;
      await authFetch.patch(`/users/${state.editUserId}`, {
        name,
        email,
        lastName,
        location,
        position,
        gender,
      });
      dispatch({ type: EDIT_USER_SUCCESS });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: EDIT_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };
  const editCompany = async () => {
    dispatch({ type: EDIT_COMPANY_BEGIN });

    try {
      const {
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
        companystate,
      } = state;
      await authFetch.patch(`/companies/${state.editCompanyId}`, {
        companyname,
        companyurl,
        companywebsite,
        companytagline,
        companyindustry,
        companysize,
        companytype,
        companyimage,
        companydescription,
        companycity,
        companystate,
        companycountry,
        companyphone,
      });
      dispatch({ type: EDIT_COMPANY_SUCCESS });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: EDIT_COMPANY_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };
  const deleteJob = async (jobId) => {
    dispatch({ type: DELETE_JOB_BEGIN });
    try {
      await authFetch.delete(`/jobs/${jobId}`);
      getJobsByUser();
    } catch (error) {
      logoutUser();
    }
  };
  const deleteUser = async (userId) => {
    dispatch({ type: DELETE_USER_BEGIN });
    try {
      await authFetch.delete(`/users/${userId}`);
      getAllUsers();
    } catch (error) {
      logoutUser();
    }
  };
  const deleteCompany = async (companyId) => {
    dispatch({ type: DELETE_JOB_BEGIN });
    try {
      await authFetch.delete(`/companies/${companyId}`);
      getCompaniesByUser();
    } catch (error) {
      logoutUser();
    }
  };
  const showStats = async () => {
    dispatch({ type: SHOW_STATS_BEGIN });
    try {
      const { data } = await authFetch("/jobs/stats");
      dispatch({
        type: SHOW_STATS_SUCCESS,
        payload: {
          stats: data.defaultStats,
          monthlyApplications: data.monthlyApplications,
        },
      });
    } catch (error) {
      logoutUser();
    }
    clearAlert();
  };
  const showDashboardStats = async () => {
    dispatch({ type: SHOW_DASHBOARD_STATS_BEGIN });
    try {
      const { data } = await authFetch("/dashboard/all/stats");
      dispatch({
        type: SHOW_DASHBOARD_STATS_SUCCESS,
        payload: {
          dashboardStats: data.dashboardstats,
          monthlyJobsData: data.monthlyjobsdata,
          monthlyCompaniesData: data.monthlycompaniesdata,
          monthlyUsersData: data.monthlyusersdata,
        },
      });
    } catch (error) {
      logoutUser();
    }
    clearAlert();
  };
  const clearFilters = () => {
    dispatch({ type: CLEAR_FILTERS });
  };
  const changePage = (page) => {
    dispatch({ type: CHANGE_PAGE, payload: { page } });
  };
  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        applyJob,
        setupUser,
        toggleSidebar,
        logoutUser,
        updateUser,
        handleChange,
        clearValues,
        createJob,
        createCompany,
        editCompany,
        getAllJobs,
        getAllCompanies,
        getAllUsers,
        getJobDetail,
        getCompanyDetail,
        getJobsByUser,
        getCompaniesByUser,
        setEditJob,
        setEditCompany,
        setEditUser,
        deleteJob,
        editJob,
        deleteCompany,
        editCompany,
        showStats,
        showDashboardStats,
        clearFilters,
        changePage,
        getUserDetail,
        editUser,
        getAppliesJobsByUser
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };
