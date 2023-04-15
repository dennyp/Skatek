import mongoose, { Schema } from 'mongoose'
import { Product } from './Product.js'

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

activityLogSchema.statics.getAll = async function (
  sort,
  page,
  pageSize,
  filter
) {
  let query = {}
  if (filter) {
    const product = await Product.findOne({ name: filter })

    product ? (query = { product: product._id }) : (query = {})
  }

  return this.find(query)
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

activityLogSchema.statics.getByProducts = async function (
  productIds,
  dateStart,
  dateEnd
) {
  return this.find({
    product: { $in: productIds },
    dateLogged: { $gt: dateStart, $lt: dateEnd },
  }).populate({
    path: 'product',
    populate: { path: 'department' },
  })
}

activityLogSchema.index({ product: 1 })

export const ActivityLog = mongoose.model('activitylog', activityLogSchema)
