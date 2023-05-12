import User from '../models/User.js'
import { StatusCodes } from 'http-status-codes'

const getUserDetail = async (req, res) => {
  
  const { userId } = req.params

  const queryObject = {
    _id: userId,
  }

  let result = User.find(queryObject)
  
  let userdetail = await result
  res.status(StatusCodes.OK).json({ userdetail })
}

const getAllUsers = async (req, res) => {
  
  
  let result = User.find().sort({ createdAt: -1 })

  const users = await result

  res.status(StatusCodes.OK).json({ users })
}

const editUser = async (req, res) => {
  const { email, name, lastName, location, position, gender} = req.body
  if (!email || !name || !lastName || !location || !position || !gender) {
    throw new BadRequestError('Please provide all values')
  }
  const user = await User.findOne({ _id: req.params.userId })

  user.email = email
  user.name = name
  user.lastName = lastName
  user.location = location
  user.position = position
  user.gender = gender

  await user.save()

  res.status(StatusCodes.OK).json({ user })
}

export { getAllUsers, getUserDetail, editUser }
