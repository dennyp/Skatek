import mongoose, { Schema } from 'mongoose'

const deviationSchema = mongoose.Schema(
  {
    department: {
      type: Schema.Types.ObjectId,
      ref: 'department',
      required: true,
    },
    date: {
      type: Schema.Types.Date,
      required: true,
      default: Date.now(),
    },
    comment: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

export const Deviation = mongoose.model('deviation', deviationSchema)
