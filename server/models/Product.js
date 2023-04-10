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
    isActive: {
      type: Schema.Types.Boolean,
      required: true,
      default: true,
    },
  },
  { timestamps: true }
)

productSchema.statics.getAll = async function (search) {
  const isValidObjectId = mongoose.isValidObjectId(search)

  let matchStage = {
    $match: {
      isActive: true,
    },
  }

  const lookupStage = {
    $lookup: {
      from: 'departments',
      localField: 'department',
      foreignField: '_id',
      as: 'department',
    },
  }

  const projectStage = {
    $project: {
      name: { $toInt: '$name' },
      placement: 1,
      'department.name': 1,
    },
  }

  const sortStage = {
    $sort: {
      name: 1,
    },
  }

  if (isValidObjectId && search.length !== 0) {
    matchStage = {
      $match: {
        department: mongoose.Types.ObjectId(search),
        isActive: true,
      },
    }

    return this.aggregate([matchStage, lookupStage, projectStage, sortStage])
  }

  return this.aggregate([matchStage, lookupStage, projectStage, sortStage])
}

productSchema.statics.getAllLightTraps = async function (search) {
  const isValidObjectId = mongoose.isValidObjectId(search)

  if (isValidObjectId && search.length !== 0) {
    return this.find({
      department: search,
      productType: mongoose.Types.ObjectId('63db9d8f79412a2690ecb895'),
    })
      .sort('name')
      .populate('department location productType')
  }

  return this.find({
    productType: mongoose.Types.ObjectId('63db9d8f79412a2690ecb895'),
  })
    .sort('name')
    .populate('department location productType')
}

productSchema.statics.getAllLightTrapsInDepartment = async function (id) {
  return this.find({
    department: id,
    isActive: true,
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
    return this.find({ department: id, isActive: true }).populate(
      'department location productType'
    )
}

export const Product = mongoose.model('product', productSchema)
