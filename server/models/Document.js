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
  },
  { timestamps: true }
)

export const Document = mongoose.model('document', documentSchema)
