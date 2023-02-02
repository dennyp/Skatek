import mongoose, { Schema } from 'mongoose'

const locationSchema = mongoose.Schema(
  {
    name: {
      type: Schema.Types.String,
      required: true,
    },
  },
  { timestamps: true }
)

locationSchema.statics.getAll = async function () {
  return this.find()
}

export const Location = mongoose.model('location', locationSchema)
