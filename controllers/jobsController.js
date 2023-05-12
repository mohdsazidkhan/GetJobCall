import Job from '../models/Job.js'
import { StatusCodes } from 'http-status-codes'
import {
  BadRequestError,
  NotFoundError
} from '../errors/index.js'
import checkPermissions from '../utils/checkPermissions.js'
import mongoose from 'mongoose'
import moment from 'moment'
import AppliedJobs from '../models/AppliedJobs.js'

const createJob = async (req, res) => {

  const { position, company, openings, salary} = req.body

  if (!position || !company || !openings || !salary) {
    throw new BadRequestError('Please provide all values')
  }
  req.body.createdBy = req.user.userId
  const job = await Job.create(req.body)
  res.status(StatusCodes.CREATED).json({ job })
  
}

const applyJob = async (req, res) => {

  let applicant = req.body?.applicant?._id;
  let job = req.body?.jobDetail?._id;
  let recruiter = req.body?.jobDetail?.createdBy;
  let company = req.body?.jobDetail?.company?._id;

  let applyData = {
    applicant,
    job,
    recruiter,
    company
  }

  if (!applicant && !job && !recruiter && !company) {
    throw new BadRequestError('Please provide all values')
  }
  const data = await AppliedJobs.create(applyData)
  res.status(StatusCodes.CREATED).json({ data })
  
}

const getAppliedJobsByUser = async (req, res) => {
  
  const applicantId = req.params.userId;
  
  let result = AppliedJobs.find({applicant: applicantId}).populate('applicant').populate('job').populate('recruiter').populate('company')

  const appliedJobs = await result

  res.status(StatusCodes.OK).json({ appliedJobs })
}

const getAllJobsByUser = async (req, res) => {
  
  const { status, jobType, sort, search } = req.query

  const queryObject = {
    createdBy: req.user.userId,
  }
  // add stuff based on condition

  if (status && status !== 'all') {
    queryObject.status = status
  }
  if (jobType && jobType !== 'all') {
    queryObject.jobType = jobType
  }
  if (search) {
    queryObject.position = { $regex: search, $options: 'i' }
  }
  // NO AWAIT

  let result = Job.find(queryObject).populate('createdBy').populate('company')

  // chain sort conditions

  if (sort === 'latest') {
    result = result.sort('-createdAt')
  }
  if (sort === 'oldest') {
    result = result.sort('createdAt')
  }
  if (sort === 'a-z') {
    result = result.sort('position')
  }
  if (sort === 'z-a') {
    result = result.sort('-position')
  }

  // setup pagination
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 10
  const skip = (page - 1) * limit

  result = result.skip(skip).limit(limit)

  const jobs = await result

  const totalJobs = await Job.countDocuments(queryObject)
  const numOfPages = Math.ceil(totalJobs / limit)

  res.status(StatusCodes.OK).json({ jobs, totalJobs, numOfPages })
}

const getJobDetail = async (req, res) => {
  
  const { jobId } = req.params

  const queryObject = {
    _id: jobId,
  }

  // NO AWAIT
  let applyData = AppliedJobs.find({job: jobId})
  let result =  Job.find(queryObject).populate('createdBy').populate('company')
  
  const jsonData = await applyData;
  const jsonResult = await result;

  let jobdetail = {jsonData, jsonResult}

  res.status(StatusCodes.OK).json({jobdetail})
}

const getAllJobs = async (req, res) => {
  
  const { status, jobType, sort, search } = req.query

  let queryObject = {};
  // add stuff based on condition

  if (status && status !== 'all') {
    queryObject.status = status
  }
  if (jobType && jobType !== 'all') {
    queryObject.jobType = jobType
  }
  if (search) {
    queryObject.position = { $regex: search, $options: 'i' }
  }
  // NO AWAIT

  let result = Job.find(queryObject).populate('createdBy').populate('company')

  // chain sort conditions

  if (sort === 'latest') {
    result = result.sort('-createdAt')
  }
  if (sort === 'oldest') {
    result = result.sort('createdAt')
  }
  if (sort === 'a-z') {
    result = result.sort('position')
  }
  if (sort === 'z-a') {
    result = result.sort('-position')
  }

  // setup pagination
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 10
  const skip = (page - 1) * limit

  result = result.skip(skip).limit(limit)

  const jobs = await result
  const totalJobs = await Job.countDocuments(queryObject)
  const numOfPages = Math.ceil(totalJobs / limit)

  res.status(StatusCodes.OK).json({ jobs, totalJobs, numOfPages })
}

const updateJob = async (req, res) => {
  const { id: jobId } = req.params
  const { company, position } = req.body

  if (!position || !company) {
    throw new BadRequestError('Please provide all values')
  }
  const job = await Job.findOne({ _id: jobId })

  if (!job) {
    throw new NotFoundError(`No job with id :${jobId}`)
  }
  // check permissions

  checkPermissions(req.user, job.createdBy)

  const updatedJob = await Job.findOneAndUpdate({ _id: jobId }, req.body, {
    new: true,
    runValidators: true,
  })

  res.status(StatusCodes.OK).json({ updatedJob })
}
const deleteJob = async (req, res) => {
  const { id: jobId } = req.params

  const job = await Job.findOne({ _id: jobId })

  if (!job) {
    throw new NotFoundError(`No job with id :${jobId}`)
  }

  checkPermissions(req.user, job.createdBy)

  await job.remove()

  res.status(StatusCodes.OK).json({ msg: 'Success! Job removed' })
}
const showStats = async (req, res) => {
  let stats = await Job.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: '$status', count: { $sum: 1 } } },
  ])
  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr
    acc[title] = count
    return acc
  }, {})

  const defaultStats = {
    posted: stats.posted || 0,
    pending: stats.pending || 0,
    interview: stats.interview || 0,
    declined: stats.declined || 0,
  }

  let monthlyApplications = await Job.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    {
      $group: {
        _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } },
        count: { $sum: 1 },
      },
    },
    { $sort: { '_id.year': -1, '_id.month': -1 } },
    { $limit: 6 },
  ])
  monthlyApplications = monthlyApplications
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

  res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications })
}

export { createJob, deleteJob, getAllJobsByUser, getAllJobs, applyJob, updateJob, showStats, getJobDetail, getAppliedJobsByUser }
