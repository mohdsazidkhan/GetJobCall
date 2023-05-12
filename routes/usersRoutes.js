import express from 'express'
const router = express.Router()

import {
  getAllUsers,
  getUserDetail,
  editUser
} from '../controllers/usersController.js'

router.route('/all').get(getAllUsers)
router.route('/detail/:userId').get(getUserDetail)
router.route('/:userId').patch(editUser)

export default router
