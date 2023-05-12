import Company from '../models/Company.js'
import { StatusCodes } from 'http-status-codes'
import {
  BadRequestError,
  NotFoundError,
} from '../errors/index.js'
import checkPermissions from '../utils/checkPermissions.js'
import cloudinary from 'cloudinary';

cloudinary.config({
  cloud_name: 'tryonlinefree',
  api_key: '382451823486165',
  api_secret: 'JuGQPhNzifF8oSwPiDvl7K-AWaY'
});

const createCompany = async (req, res) => {
  const { 
    companyname,
    companyurl,
    companywebsite,
    companytagline,
    companyindustry,
    companysize,
    companytype,
    companydescription,
    companyphone,
    companycountry,
    companycity,
    companystate
  } = req.body

    let image = req?.file?.path ? req?.file?.path : null;
    const upload = await cloudinary.v2.uploader.upload(image);
    let companyimage = upload.secure_url;
  if (!companyname ||
    !companyurl ||
    !companywebsite ||
    !companytagline ||
    !companyindustry ||
    !companysize ||
    !companytype ||
    !companyimage ||
    !companydescription ||
    !companyphone ||
    !companycity ||
    !companystate ||
    !companycountry) {
    throw new BadRequestError('Please provide all values')
  }
  req.body.createdBy = req.user.userId
  req.body.companyimage = companyimage
  const company = await Company.create(req.body)
  res.status(StatusCodes.CREATED).json({ company })
  
}
const getAllCompaniesByUser = async (req, res) => {
  
  const { search } = req.query

  const queryObject = {
    createdBy: req.user.userId,
  }
  // add stuff based on condition

  if (search) {
    queryObject.position = { $regex: search, $options: 'i' }
  }
  // NO AWAIT

  let result = Company.find(queryObject)

  // setup pagination
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 10
  const skip = (page - 1) * limit

  result = result.skip(skip).limit(limit)

  const companies = await result
  const totalCompanies = await Company.countDocuments(queryObject)
  const numOfPages = Math.ceil(totalCompanies / limit)

  res.status(StatusCodes.OK).json({ companies, totalCompanies, numOfPages })
}

const getCompanyDetail = async (req, res) => {
  
  const { companyId } = req.params

  const queryObject = {
    _id: companyId,
  }

  // NO AWAIT

  let result = Company.find(queryObject).populate('createdBy')
  
  let companydetail = await result
  res.status(StatusCodes.OK).json({ companydetail })
}

const getAllCompanies = async (req, res) => {
  
  const { search } = req.query

  let queryObject = {};
  // add stuff based on condition

  if (search) {
    queryObject.position = { $regex: search, $options: 'i' }
  }
  // NO AWAIT

  let result = Company.find(queryObject)

  // setup pagination
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 10
  const skip = (page - 1) * limit

  result = result.skip(skip).limit(limit)

  const companies = await result
  const totalCompanies = await Company.countDocuments(queryObject)
  const numOfPages = Math.ceil(totalCompanies / limit)

  res.status(StatusCodes.OK).json({ companies, totalCompanies, numOfPages })
}

const updateCompany = async (req, res) => {
  const { id: companyId } = req.params
  let image = req?.file?.path ? req?.file?.path : null;
  let companyimage = '';
  if(image){
    const upload = await cloudinary.v2.uploader.upload(image);
    companyimage = upload.secure_url;
  }else{
    companyimage = req.body.companyimage
  }
  const company = await Company.findOne({ _id: companyId })

  if (!company) {
    throw new NotFoundError(`No company with id :${companyId}`)
  }
  // check permissions

  checkPermissions(req.user, company.createdBy)
  req.body.companyimage = companyimage
  const updatedCompany = await Company.findOneAndUpdate({ _id: companyId }, req.body, {
    new: true,
    runValidators: true,
  })

  res.status(StatusCodes.OK).json({ updatedCompany })
}
const deleteCompany= async (req, res) => {
  const { id: companyId } = req.params

  const company = await Company.findOne({ _id: companyId })

  if (!company) {
    throw new NotFoundError(`No company with id :${companyId}`)
  }

  checkPermissions(req.user, company.createdBy)

  await company.remove()

  res.status(StatusCodes.OK).json({ msg: 'Success! Company removed' })
}


export { createCompany, deleteCompany, getAllCompaniesByUser, getAllCompanies, updateCompany, getCompanyDetail }
