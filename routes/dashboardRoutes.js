import express from 'express'
const router = express.Router()

import {
  showDashboardStats
} from '../controllers/dashboardController.js'

router.route('/all/stats').get(showDashboardStats)

export default router
