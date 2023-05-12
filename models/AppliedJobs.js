import mongoose from 'mongoose'

const AppliedJobsSchema = new mongoose.Schema(
  {
    applicant: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide Applicant'],
    },
    job: {
      type: mongoose.Types.ObjectId,
      ref: 'Job',
      required: [true, 'Please provide Job'],
    },
    recruiter: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide Recruiter'],
    },
    company: {
      type: mongoose.Types.ObjectId,
      ref: 'Company',
      required: [true, 'Please provide company'],
    },
  },
  { timestamps: true }
)

export default mongoose.model('AppliedJobs', AppliedJobsSchema)
