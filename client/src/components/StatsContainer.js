import { useAppContext } from '../context/appContext'
import StatItem from './StatItem'
import { FaSuitcaseRolling, FaCalendarCheck, FaBug, FaPencilRuler, FaBuilding, FaUsers } from 'react-icons/fa'
import AdminWrapper from '../assets/wrappers/AdminStatsContainer'
import Wrapper from '../assets/wrappers/StatsContainer'

const StatsContainer = () => {

  const { stats, dashboardStats, user } = useAppContext()
 
  const adminStats = [
    {
      title: 'Total Companies',
      count: dashboardStats?.totalCompanies,
      icon: <FaBuilding />,
      color: '#4caf50',
      bcg: '#d2ffd4',
    },
    {
      title: 'Total Jobs',
      count: dashboardStats?.totalJobs,
      icon: <FaSuitcaseRolling />,
      color: '#e9b949',
      bcg: '#fcefc7',
    },
    {
      title: 'Total Users',
      count: dashboardStats?.totalUsers,
      icon: <FaUsers />,
      color: '#647acb',
      bcg: '#e0e8f9',
    }
  ]

  const defaultStats = [
    {
      title: 'posted',
      count: stats.posted || 0,
      icon: <FaPencilRuler />,
      color: '#4caf50',
      bcg: '#d2ffd4',
    },
    {
      title: 'pending',
      count: stats.pending || 0,
      icon: <FaSuitcaseRolling />,
      color: '#e9b949',
      bcg: '#fcefc7',
    },
    {
      title: 'interviews',
      count: stats.interview || 0,
      icon: <FaCalendarCheck />,
      color: '#647acb',
      bcg: '#e0e8f9',
    },
    {
      title: 'declined',
      count: stats.declined || 0,
      icon: <FaBug />,
      color: '#d66a6a',
      bcg: '#ffeeee',
    },
  ]

  if(user?.userType === 'admin'){
    return (
      <AdminWrapper>
        {adminStats.map((item, index) => {
          return <StatItem key={index} {...item} />
        })}
      </AdminWrapper>
    )
  }else{
    return (
      <Wrapper>
        {defaultStats.map((item, index) => {
          return <StatItem key={index} {...item} />
        })}
      </Wrapper>
    )
  }
}

export default StatsContainer
