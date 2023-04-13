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
    url: {
      type: Schema.Types.String,
    },
    public_id: {
      type: Schema.Types.String,
    },
    resource_type: {
      type: Schema.Types.String,
    },
    type: {
      type: Schema.Types.String,
    },
    version: {
      type: Schema.Types.Number,
    },
  },
  { timestamps: true }
)

export const Document = mongoose.model('document', documentSchema)
