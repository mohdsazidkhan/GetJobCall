import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  APPLY_JOB_BEGIN,
  APPLY_JOB_SUCCESS,
  APPLY_JOB_ERROR,
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
  SET_EDIT_USER,
  SET_EDIT_COMPANY,
  DELETE_JOB_BEGIN,
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
  SHOW_STATS_SUCCESS,
  SHOW_DASHBOARD_STATS_BEGIN,
  SHOW_DASHBOARD_STATS_SUCCESS,
  CLEAR_FILTERS,
  CHANGE_PAGE,
  GET_APPLIED_JOBS_BEGIN,
  GET_APPLIED_JOBS_SUCCESS,
} from "./actions";

import { initialState } from "./appContext";

const reducer = (state, action) => {
  if (action.type === DISPLAY_ALERT) {
    return {
      ...state,
      showAlert: true,
      alertType: "danger",
      alertText: "Please provide all values!",
    };
  }
  if (action.type === CLEAR_ALERT) {
    return {
      ...state,
      showAlert: false,
      alertType: "",
      alertText: "",
    };
  }

  if (action.type === SETUP_USER_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === SETUP_USER_SUCCESS) {
    return {
      ...state,
      isLoading: true,
      token: action.payload.token,
      user: action.payload.user,
      userLocation: action.payload.location,
      jobLocation: action.payload.location,
      showAlert: true,
      alertType: "success",
      alertText: action.payload.alertText,
    };
  }
  if (action.type === SETUP_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  if (action.type === APPLY_JOB_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === APPLY_JOB_SUCCESS) {
    return {
      ...state,
      isLoading: true,
      applyData: action.payload.data,
      showAlert: true,
      alertType: "success",
      alertText: action.payload.alertText,
    };
  }
  if (action.type === APPLY_JOB_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  if (action.type === TOGGLE_SIDEBAR) {
    return {
      ...state,
      showSidebar: !state.showSidebar,
    };
  }
  if (action.type === LOGOUT_USER) {
    return {
      ...initialState,
      user: null,
      token: null,
      jobLocation: "",
      userLocation: "",
    };
  }
  if (action.type === UPDATE_USER_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === UPDATE_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      token: action.payload.token,
      user: action.payload.user,
      userLocation: action.payload.location,
      jobLocation: action.payload.location,
      showAlert: true,
      alertType: "success",
      alertText: "User Profile Updated!",
    };
  }
  if (action.type === UPDATE_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  if (action.type === HANDLE_CHANGE) {
    return {
      ...state,
      page: 1,
      [action.payload.name]: action.payload.value,
    };
  }
  if (action.type === CLEAR_VALUES) {
    const initialState = {
      isEditing: false,
      editJobId: "",
      position: "",
      company: "",
      jobLocation: state.userLocation,
      jobType: "full-time",
      status: "pending",
      companyname: "",
      companyurl: "",
      companywebsite: "",
      companytagline: "",
      companyindustry: "Select Industry",
      companysize: "Select Size",
      companytype: "Select Type",
    };

    return {
      ...state,
      ...initialState,
    };
  }
  if (action.type === CREATE_JOB_BEGIN) {
    return { ...state, isLoading: true };
  }

  if (action.type === CREATE_COMPANY_BEGIN) {
    return { ...state, isLoading: true };
  }

  if (action.type === CREATE_JOB_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "New Job Created!",
    };
  }
  if (action.type === CREATE_COMPANY_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "New Company Created!",
    };
  }
  if (action.type === CREATE_JOB_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  if (action.type === CREATE_COMPANY_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }

  if (action.type === GET_APPLIED_JOBS_BEGIN) {
    return { ...state, isLoading: true, showAlert: false };
  }
  if (action.type === GET_APPLIED_JOBS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      appliedJobs: action.payload.appliedJobs,
    };
  }
  
  if (action.type === GET_JOBS_BEGIN) {
    return { ...state, isLoading: true, showAlert: false };
  }
  if (action.type === GET_JOBS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      jobs: action.payload.jobs,
      totalJobs: action.payload.totalJobs,
      numOfPages: action.payload.numOfPages
      
    };
  }
  
  if (action.type === GET_JOB_DETAIL_BEGIN) {
    return { ...state, isLoading: true, showAlert: false };
  }
  if (action.type === GET_JOB_DETAIL_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      jobDetail: action.payload.jobDetail,
      applyData: action.payload.applyData
    };
  }
  if (action.type === GET_USERS_BEGIN) {
    return { ...state, isLoading: true, showAlert: false };
  }
  if (action.type === GET_USERS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      users: action.payload.users,
      totalUsers: action.payload.totalUsers,
      numOfPages: action.payload.numOfPages,
    };
  }

  if (action.type === GET_COMPANIES_BEGIN) {
    return { ...state, isLoading: true, showAlert: false };
  }
  if (action.type === GET_COMPANIES_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      companies: action.payload.companies,
      totalCompanies: action.payload.totalCompanies,
      numOfPages: action.payload.numOfPages,
    };
  }
  if (action.type === GET_COMPANY_DETAIL_BEGIN) {
    return { ...state, isLoading: true, showAlert: false };
  }
  if (action.type === GET_COMPANY_DETAIL_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      companyDetail: action.payload.companyDetail,
    };
  }
  if (action.type === GET_USER_DETAIL_BEGIN) {
    return { ...state, isLoading: true, showAlert: false };
  }
  if (action.type === GET_USER_DETAIL_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      userDetail: action.payload.userDetail,
    };
  }
  if (action.type === SET_EDIT_JOB) {
    const job = state.jobs.find((job) => job._id === action.payload.id);
    const {
      _id,
      position,
      company,
      openings,
      employees,
      salary,
      jobLocation,
      status,
      jobType,
      description,
    } = job;
    return {
      ...state,
      isEditing: true,
      editJobId: _id,
      position,
      company,
      openings,
      employees,
      salary,
      jobLocation,
      status,
      jobType,
      description,
    };
  }
  if (action.type === SET_EDIT_USER) {
    const user = state.users.find((user) => user._id === action.payload.id);
    const { _id, name, email, lastName, location, position, gender } = user;
    return {
      ...state,
      isEditing: true,
      editUserId: _id,
      name,
      email,
      lastName,
      location,
      position,
      gender,
    };
  }
  if (action.type === SET_EDIT_COMPANY) {
    const companyOne = state.companies.find(
      (comp) => comp._id === action.payload.id
    );
    const {
      _id,
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
    } = companyOne;
    return {
      ...state,
      isEditing: true,
      editCompanyId: _id,
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
    };
  }
  if (action.type === DELETE_JOB_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === EDIT_JOB_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === EDIT_JOB_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "Job Updated!",
    };
  }
  if (action.type === EDIT_JOB_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }

  if (action.type === EDIT_USER_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === EDIT_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "User Updated!",
    };
  }
  if (action.type === EDIT_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }

  if (action.type === EDIT_COMPANY_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === EDIT_COMPANY_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "Company Updated!",
    };
  }
  if (action.type === EDIT_COMPANY_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }

  if (action.type === SHOW_STATS_BEGIN) {
    return {
      ...state,
      isLoading: true,
      showAlert: false,
    };
  }
  if (action.type === SHOW_STATS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      stats: action.payload.stats,
      monthlyApplications: action.payload.monthlyApplications,
    };
  }
  if (action.type === SHOW_DASHBOARD_STATS_BEGIN) {
    return {
      ...state,
      isLoading: true,
      showAlert: false,
    };
  }
  if (action.type === SHOW_DASHBOARD_STATS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      dashboardStats: action.payload.dashboardStats,
      monthlyJobsData: action.payload.monthlyJobsData,
      monthlyCompaniesData: action.payload.monthlyCompaniesData,
      monthlyUsersData: action.payload.monthlyUsersData,
    };
  }
  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      search: "",
      searchStatus: "all",
      searchType: "all",
      sort: "latest",
    };
  }
  if (action.type === CHANGE_PAGE) {
    return { ...state, page: action.payload.page };
  }
  throw new Error(`no such action : ${action.type}`);
};

export default reducer;
