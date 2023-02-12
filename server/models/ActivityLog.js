import mongoose, { Schema } from 'mongoose'

const activityLogSchema = mongoose.Schema(
  {
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
  },
  { timestamps: true }
)

activityLogSchema.statics.getAll = async function (sort, page, pageSize) {
  return this.find()
    .sort(sort)
    .skip(page * pageSize)
    .limit(pageSize)
    .populate({
      path: 'product',
      populate: { path: 'department' },
    })
}

activityLogSchema.statics.getById = async function (id) {
  const isValidObjectId = mongoose.isValidObjectId(id)

  if (isValidObjectId)
    return this.findOne({ _id: id }).populate({
      path: 'product',
      populate: { path: 'department' },
    })
}

activityLogSchema.statics.getByProducts = async function (productIds) {
  return this.find({ product: { $in: productIds } }).populate({
    path: 'product',
    populate: { path: 'department' },
  })
}

export const ActivityLog = mongoose.model('activitylog', activityLogSchema)
