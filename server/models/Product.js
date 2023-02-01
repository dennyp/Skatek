import mongoose, { Schema } from 'mongoose'

const productSchema = mongoose.Schema({
  _id: Schema.Types.ObjectId,
  name: Schema.Types.String,
  placement: Schema.Types.String,
})

productSchema.statics.getAll = async function (
  reqPageSize,
  reqStartIndex,
  filter = {}
) {
  const pageSize = Math.abs(reqPageSize) || 10
  const startIndex = (Math.abs(reqStartIndex) || 1) - 1

  return this.find(filter).skip(startIndex).limit(pageSize)
}

productSchema.statics.getById = async function (id) {
  const isValidObjectId = mongoose.isValidObjectId(id)

  if (isValidObjectId) return this.findOne({ id })
}

export const Product = mongoose.model('product', productSchema)
