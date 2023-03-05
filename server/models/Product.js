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
    active: {
      type: Schema.Types.Boolean,
      required: true,
      default: true,
    },
  },
  { timestamps: true }
)

productSchema.statics.getAll = async function (search) {
  const isValidObjectId = mongoose.isValidObjectId(search)

  if (isValidObjectId && search.length !== 0) {
    return this.find({ department: search })
      .sort('name')
      .populate('department location productType')
  }

  return this.find().sort('name').populate('department location productType')
}

productSchema.statics.getAllLightTraps = async function () {
  return this.find({
    productType: mongoose.Types.ObjectId('63db9d8f79412a2690ecb895'),
  })
    .sort('name')
    .populate('department location productType')
}

productSchema.statics.getById = async function (id) {
  const isValidObjectId = mongoose.isValidObjectId(id)

  if (isValidObjectId)
    return this.findOne({ _id: id }).populate('department location productType')
}

productSchema.statics.getByDepartment = async function (id) {
  const isValidObjectId = mongoose.isValidObjectId(id)

  if (isValidObjectId)
    return this.find({ department: id }).populate(
      'department location productType'
    )
}

export const Product = mongoose.model('product', productSchema)
