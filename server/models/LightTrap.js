import mongoose, { Schema } from 'mongoose'

const lightTrapSchema = mongoose.Schema(
  {
    name: { type: Schema.Types.String, required: true },
    placement: Schema.Types.String,
    department: {
      type: Schema.Types.ObjectId,
      ref: 'department',
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

lightTrapSchema.statics.getAll = async function () {
  return this.find().sort('name').populate('department productType')
}

export const LightTrap = mongoose.model('lighttrap', lightTrapSchema)
