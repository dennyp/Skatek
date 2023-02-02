import mongoose, { Schema } from 'mongoose'

const departmentSchema = mongoose.Schema(
  {
    activityThreshold: { type: Schema.Types.Number, default: 100 },
    name: { type: Schema.Types.String, required: true },
    organization: {
      type: Schema.Types.ObjectId,
      ref: 'organization',
    },
  },
  { timestamps: true }
)

departmentSchema.statics.getAll = async function (
  reqPageSize,
  reqStartIndex,
  filter = {}
) {
  const pageSize = Math.abs(reqPageSize) || 20
  const startIndex = (Math.abs(reqStartIndex) || 1) - 1
  return this.find(filter).skip(startIndex).limit(pageSize)
}

departmentSchema.statics.getById = async function (id) {
  const isValidObjectId = mongoose.isValidObjectId(id)

  if (isValidObjectId) return this.findOne({ id })
}

export const Department = mongoose.model('department', departmentSchema)
