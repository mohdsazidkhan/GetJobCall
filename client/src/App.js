import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Register, Landing, Error, ProtectedRoute } from './pages'
import {
  AllJobs,
  Profile,
  SharedLayout,
  Stats,
  AddJob,
} from './pages/dashboard'
import AppliedJobs from './pages/dashboard/AppliedJobs';
import JobDetail from './pages/dashboard/JobDetail';
import AddUser from './pages/dashboard/AddUser';
import AddCompany from './pages/dashboard/AddCompany';
import AllCompanies from './pages/dashboard/AllCompanies';
import CompanyDetail from './pages/dashboard/CompanyDetail';
import UserDetail from './pages/dashboard/UserDetail';
import Dashboard from './pages/admindashboard/Dashboard';
import AllUsers from './pages/admindashboard/AllUsers';
import AllRecruiters from './pages/admindashboard/AllRecruiters';
import AllApplicants from './pages/admindashboard/AllApplicants';
function App() {
  window["backend"] = 'http://localhost:5000';
  window["frontend"] = 'http://localhost:3000';
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }
        >
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/all-users' element={<AllUsers />} />
          <Route path='/all-applicants' element={<AllApplicants />} />
          <Route path='/all-recruiters' element={<AllRecruiters />} />
          <Route path='/stats' element={<Stats />} />
          <Route path='all-companies' element={<AllCompanies />} />
          <Route path='all-jobs' element={<AllJobs />} />
          <Route path='applied-jobs' element={<AppliedJobs />} />
          <Route path='/job/detail/:jobId' element={<JobDetail />} />
          <Route path='/user/detail/:userId' element={<UserDetail />} />
          <Route path='/company/detail/:companyId' element={<CompanyDetail />} />
          <Route path='add-job' element={<AddJob />} />
          <Route path='add-user' element={<AddUser />} />
          <Route path='add-company' element={<AddCompany />} />
          <Route path='profile' element={<Profile />} />
        </Route>
        <Route path='/register' element={<Register />} />
        <Route index element={<Landing />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
