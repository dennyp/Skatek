import mongoose, { Schema } from 'mongoose'
const organizationSchema = mongoose.Schema({
  _id: Schema.Types.ObjectId,
  name: Schema.Types.String,
})

organizationSchema.statics.getAll = async function () {
  return this.find()
}

export const Organization = mongoose.model('organization', organizationSchema)
