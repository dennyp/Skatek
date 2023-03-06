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
export const LightTrapLog = mongoose.model('lighttraplog', lightTrapLogSchema)
