import mongoose, { Schema } from 'mongoose'

const documentSchema = mongoose.Schema(
  {
    name: {
      type: Schema.Types.String,
    },
    contentType: {
      type: Schema.Types.String,
    },
    size: {
      type: Schema.Types.Number,
    },
    path: {
      type: Schema.Types.String,
    },
  },
  { timestamps: true }
)

export const Document = mongoose.model('document', documentSchema)
