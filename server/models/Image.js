import mongoose, { Schema } from 'mongoose'

const imageSchema = mongoose.Schema(
  {
    name: {
      type: Schema.Types.String,
    },
    desc: { type: Schema.Types.String },
    img: {
      public_id: {
        type: Schema.Types.String,
      },
      url: {
        type: Schema.Types.String,
      },
    },
    department: {
      type: Schema.Types.ObjectId,
      ref: 'department',
    },
  },
  { timestamps: true }
)

export const Image = mongoose.model('image', imageSchema)
