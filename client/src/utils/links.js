import { IoBarChartSharp } from 'react-icons/io5'
import { MdQueryStats, MdBusinessCenter} from 'react-icons/md'
import { FaBuilding, FaCity, FaUsers, FaWpforms } from 'react-icons/fa'
import { ImProfile } from 'react-icons/im'

export const applicantlinks = [
  { id: 1, text: 'All Jobs', path: 'all-jobs', icon: <MdQueryStats /> },
  { id: 2, text: 'Applied Jobs', path: 'applied-jobs', icon: <MdBusinessCenter /> },
  { id: 3, text: 'Profile', path: 'profile', icon: <ImProfile /> },
]

export const recruiterlinks = [
  { id: 1, text: 'Stats', path: '/stats', icon: <IoBarChartSharp /> },
  { id: 2, text: 'All Companies', path: 'all-companies', icon: <FaBuilding /> },
  { id: 3, text: 'Add Company', path: 'add-company', icon: <FaCity /> },
  { id: 4, text: 'All Jobs', path: 'all-jobs', icon: <MdBusinessCenter /> },
  { id: 5, text: 'Add Job', path: 'add-job', icon: <FaWpforms /> },
  { id: 6, text: 'Profile', path: 'profile', icon: <ImProfile /> },
]

export const adminlinks = [
  { id: 1, text: 'Dashboard', path: '/dashboard', icon: <IoBarChartSharp /> },
  { id: 2, text: 'All Companies', path: 'all-companies', icon: <FaBuilding /> },
  { id: 3, text: 'All Jobs', path: 'all-jobs', icon: <MdBusinessCenter /> },
  { id: 4, text: 'All Users', path: 'all-users', icon: <FaUsers /> },
  { id: 5, text: 'All Recruiters', path: 'all-recruiters', icon: <FaUsers /> },
  { id: 6, text: 'All Applicants', path: 'all-applicants', icon: <FaUsers /> },
  { id: 7, text: 'Profile', path: 'profile', icon: <ImProfile /> },
]

