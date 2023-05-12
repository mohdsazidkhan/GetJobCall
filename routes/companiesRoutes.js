import express from 'express'
const router = express.Router()
import {
  createCompany,
  deleteCompany,
  getAllCompaniesByUser,
  getAllCompanies,
  updateCompany,
  getCompanyDetail
} from '../controllers/compniessController.js'
import multer from 'multer';

const upload = multer({
  storage: multer.diskStorage({}),
  limits: { fileSize: 500000 }
});

router.route('/new').post(upload.single("companyimage"), createCompany)
router.route('/').get(getAllCompaniesByUser)
router.route('/all').get(getAllCompanies)
router.route('/detail/:companyId').get(getCompanyDetail)
router.route('/:id').delete(deleteCompany).patch(upload.single("companyimage"), updateCompany)

export default router
