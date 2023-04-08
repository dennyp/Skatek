import mongoose, { Schema } from 'mongoose'

const lightTrapLogSchema = mongoose.Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: 'product',
      required: true,
    },
    flyActivity: {
      type: Schema.Types.Number,
      required: true,
    },
    bananaflyActivity: {
      type: Schema.Types.Number,
      required: true,
    },
    waspActivity: {
      type: Schema.Types.Number,
      required: true,
    },
    neuropteranActivity: {
      type: Schema.Types.Number,
      required: true,
    },
    daddylonglegsActivity: {
      type: Schema.Types.Number,
      required: true,
    },
    miscActivity: {
      type: Schema.Types.Number,
      required: true,
    },
    dateLogged: {
      type: Schema.Types.Date,
      required: true,
      default: Date.now(),
    },
    comment: Schema.Types.String,
  },
  { timestamps: true }
)

lightTrapLogSchema.statics.getAll = async function (sort, page, pageSize) {
  return this.find()
    .sort(sort)
    .skip(page * pageSize)
    .limit(pageSize)
    .populate({
      path: 'product',
      populate: { path: 'department' },
    })
}

lightTrapLogSchema.statics.getByProduct = async function (
  trap,
  dateStart,
  dateEnd
) {
  const isValidObjectId = mongoose.isValidObjectId(trap)

  if (!isValidObjectId) return

  const matchStage = {
    $match: {
      product: mongoose.Types.ObjectId(trap),
      $and: [
        {
          $expr: {
            $gte: ['$dateLogged', { $toDate: dateStart }],
          },
        },
        {
          $expr: {
            $lte: ['$dateLogged', { $toDate: dateEnd }],
          },
        },
      ],
    },
  }

  const projectStage = {
    $project: {
      product: 1,
      department: 1,
      dateLogged: 1,
      total: {
        $add: [
          '$flyActivity',
          '$bananaflyActivity',
          '$waspActivity',
          '$neuropteranActivity',
          '$daddylonglegsActivity',
          '$miscActivity',
        ],
      },
    },
  }

  return this.aggregate([matchStage, projectStage])
}

lightTrapLogSchema.statics.getByProducts = async function (
  productIds,
  dateStart,
  dateEnd
) {
  return this.find({
    product: { $in: productIds },
    dateLogged: { $gte: dateStart, $lte: dateEnd },
  }).populate({
    path: 'product',
    populate: { path: 'department' },
  })
}

export const LightTrapLog = mongoose.model('lighttraplog', lightTrapLogSchema)
