import express from 'express'
const router = express.Router()

import {
  createJob,
  deleteJob,
  getAllJobsByUser,
  getAllJobs,
  updateJob,
  showStats,
  getJobDetail,
  applyJob,
  getAppliedJobsByUser
} from '../controllers/jobsController.js'

router.route('/').post(createJob).get(getAllJobsByUser)
router.route('/applyJob').post(applyJob)
router.route('/all').get(getAllJobs)
router.route('/all/applied/:userId').get(getAppliedJobsByUser)
router.route('/detail/:jobId').get(getJobDetail)
// remember about :id
router.route('/stats').get(showStats)
router.route('/:id').delete(deleteJob).patch(updateJob)

export default router
