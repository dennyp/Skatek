import mongoose, { Schema } from 'mongoose'

const fileSchema = mongoose.Schema(
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
    data: Buffer,
  },
  { timestamps: true }
)

export const File = mongoose.model('file', fileSchema)
