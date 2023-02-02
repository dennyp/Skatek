import mongoose, { Schema } from 'mongoose'

const productSchema = mongoose.Schema(
  {
    name: {
      type: Schema.Types.String,
      required: true,
    },
    placement: Schema.Types.String,
    department: {
      type: Schema.Types.ObjectId,
      ref: 'department',
    },
    location: {
      type: Schema.Types.ObjectId,
      ref: 'location',
      required: true,
    },
    productType: {
      type: Schema.Types.ObjectId,
      ref: 'producttype',
      required: true,
    },
  },
  { timestamps: true }
)

productSchema.statics.getAll = async function (
  reqPageSize,
  reqStartIndex,
  filter = {}
) {
  const pageSize = Math.abs(reqPageSize) || 100
  const startIndex = (Math.abs(reqStartIndex) || 1) - 1

  return this.find(filter)
    .skip(startIndex)
    .limit(pageSize)
    .populate('department location productType')
}

productSchema.statics.getById = async function (id) {
  const isValidObjectId = mongoose.isValidObjectId(id)

  if (isValidObjectId)
    return this.findOne({ _id: id }).populate('department location productType')
}

export const Product = mongoose.model('product', productSchema)
