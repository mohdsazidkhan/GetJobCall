import mongoose from 'mongoose'

const JobSchema = new mongoose.Schema(
  {
    company: {
      type: mongoose.Types.ObjectId,
      ref: 'Company',
      required: [true, 'Please provide company'],
    },
    position: {
      type: String,
      required: [true, 'Please provide position'],
      maxlength: 100,
    },
    status: {
      type: String,
      enum: ['posted', 'interview', 'declined', 'pending', 'rejected'],
      default: 'pending',
    },
    jobType: {
      type: String,
      enum: ['full-time', 'part-time', 'remote', 'internship', 'contract'],
      default: 'full-time',
    },
    jobLocation: {
      type: String,
      default: 'my city',
      required: true,
    },
    openings: {
      type: String,
      required: [true, 'Please enter opening'],
    },
    salary: {
      type: String,
      required: [true, 'Please enter salary'],
    },
    employees: {
      type: String,
    },
    description: {
      type: String,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide user'],
    },
  },
  { timestamps: true }
)

export default mongoose.model('Job', JobSchema)
