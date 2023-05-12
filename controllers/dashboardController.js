import Job from '../models/Job.js'
import { StatusCodes } from 'http-status-codes'
import mongoose from 'mongoose'
import moment from 'moment'
import Company from '../models/Company.js'
import User from '../models/User.js'

const showDashboardStats = async (req, res) => {

  let totalJobs = await Job.find({}).count()
  let totalCompanies = await Company.find({}).count()
  let totalUsers = await User.find({}).count()

  const dashboardstats = {
    totalJobs: totalJobs || 0,
    totalCompanies: totalCompanies || 0,
    totalUsers: totalUsers || 0,
  }
  
  let monthlyjobsdata = await Job.aggregate([
    {
      $group: {
        _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } },
        count: { $sum: 1 },
      },
    },
    { $sort: { '_id.year': -1, '_id.month': -1 } },
    { $limit: 10 },
  ])
  monthlyjobsdata = monthlyjobsdata
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item
      const date = moment()
        .month(month - 1)
        .year(year)
        .format('MMM Y')
      return { date, count }
    })
    .reverse()
    
    let monthlycompaniesdata = await Company.aggregate([
      {
        $group: {
          _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } },
          count: { $sum: 1 },
        },
      },
      { $sort: { '_id.year': -1, '_id.month': -1 } },
      { $limit: 10 },
    ])
    monthlycompaniesdata = monthlycompaniesdata
      .map((item) => {
        const {
          _id: { year, month },
          count,
        } = item
        const date = moment()
          .month(month - 1)
          .year(year)
          .format('MMM Y')
        return { date, count }
      })
      .reverse()

      let monthlyusersdata = await User.aggregate([
        {
          $group: {
            _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } },
            count: { $sum: 1 },
          },
        },
        { $sort: { '_id.year': -1, '_id.month': -1 } },
        { $limit: 10 },
      ])
      monthlyusersdata = monthlyusersdata
        .map((item) => {
          const {
            _id: { year, month },
            count,
          } = item
          const date = moment()
            .month(month - 1)
            .year(year)
            .format('MMM Y')
          return { date, count }
        })
        .reverse()

  res.status(StatusCodes.OK).json({ dashboardstats, monthlyjobsdata, monthlycompaniesdata, monthlyusersdata })
}

export {  showDashboardStats }
