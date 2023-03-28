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
        required: true,
      },
      url: {
        type: Schema.Types.String,
        required: true,
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
