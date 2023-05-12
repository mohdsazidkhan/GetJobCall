import { useEffect } from 'react'
import { useAppContext } from '../../context/appContext'
import { StatsContainer, Loading } from '../../components'
import AdminChartsContainer from '../../components/AdminChartsContainer'

const Dashboard = () => {
  const { showDashboardStats, isLoading, monthlyJobsData, monthlyCompaniesData, monthlyUsersData } = useAppContext()

  useEffect(() => {
    showDashboardStats()
    // eslint-disable-next-line
  }, [])
  if (isLoading) {
    return <Loading center />
  }
  return (
    <>
      <StatsContainer />
      {monthlyJobsData?.length > 0 && <AdminChartsContainer />}
    </>
  )
}

export default Dashboard
