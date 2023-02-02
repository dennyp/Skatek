import mongoose, { Schema } from 'mongoose'
const organizationSchema = mongoose.Schema(
  {
    name: Schema.Types.String,
  },
  { timestamps: true }
)

organizationSchema.statics.getAll = async function () {
  return this.find()
}

export const Organization = mongoose.model('organization', organizationSchema)
