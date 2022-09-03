import express from 'express'
const router = express.Router()

import {
  createJob,
  deleteJob,
  getAllJobsByUser,
  getAllJobs,
  updateJob,
  showStats,
} from '../controllers/jobsController.js'

router.route('/').post(createJob).get(getAllJobsByUser)
router.route('/all').get(getAllJobs)
// remember about :id
router.route('/stats').get(showStats)
router.route('/:id').delete(deleteJob).patch(updateJob)

export default router
