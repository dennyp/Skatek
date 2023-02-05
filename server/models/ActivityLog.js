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

activityLogSchema.statics.getAll = async function (
  reqPageSize,
  reqStartIndex,
  filter = {}
) {
  const pageSize = Math.abs(reqPageSize) || 1000
  const startIndex = (Math.abs(reqStartIndex) || 1) - 1

  return this.find(filter).skip(startIndex).limit(pageSize).populate('product')
}

activityLogSchema.statics.getById = async function (id) {
  const isValidObjectId = mongoose.isValidObjectId(id)

  if (isValidObjectId) return this.findOne({ _id: id }).populate('product')
}

activityLogSchema.statics.getByProducts = async function (productIds) {
  return this.find({ product: { $in: productIds } }).populate({
    path: 'product',
    populate: { path: 'department' },
  })
}

export const ActivityLog = mongoose.model('activitylog', activityLogSchema)
