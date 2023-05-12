import mongoose from 'mongoose'

const CompanySchema = new mongoose.Schema(
  {
    companyname: {
      type: String,
      required: [true, 'Please provide company name'],
    },
    companyurl: {
      type: String,
      required: [true, 'Please enter url'],
    },
    companywebsite: {
      type: String,
      default: 'www.example.com',
    },
    companytagline: {
      type: String,
      default: 'please edit company tagline',
    },
    companyindustry: {
      type: String,
      required: [true, 'Please select industry'],
    },
    companysize: {
      type: String,
      required: [true, 'Please select size'],
    },
    companytype: {
      type: String,
      required: [true, 'Please select type'],
    },
    companyphone: {
      type: String,
      required: [true, 'Please enter phone'],
    },
    companycity: {
      type: String,
      required: [true, 'Please enter city'],
    },
    companystate: {
      type: String,
      required: [true, 'Please enter state'],
    },
    companycountry: {
      type: String,
      required: [true, 'Please select country'],
    },
    companydescription: {
      type: String,
      required: [true, 'Please enter description'],
    },
    companyimage: {
      required: true,
      type: String
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide user'],
    },
  },
  { timestamps: true }
)

export default mongoose.model('Company', CompanySchema)
