import mongoose, { Schema } from 'mongoose'

const activityLogSchema = mongoose.Schema({
  activity: {
    type: Schema.Types.Number,
    required: true,
  },
  comment: Schema.Types.String,
  dateLogged: {
    type: Schema.Types.Date,
    required: true,
    default: Date.now(),
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: 'product',
    required: true,
  },
})

activityLogSchema.statics.getAll = async function () {
  console.log('test')
  return this.find().populate('product')
}

activityLogSchema.statics.getById = async function (id) {
  const isValidObjectId = mongoose.isValidObjectId(id)

  if (isValidObjectId) return this.findOne({ _id: id }).populate('product')
}

export const ActivityLog = mongoose.model('activitylog', activityLogSchema)
