import mongoose, { Schema } from 'mongoose'

const productTypeSchema = mongoose.Schema(
  {
    name: Schema.Types.String,
  },
  { timestamps: true }
)

productTypeSchema.statics.getAll = async function () {
  return this.find()
}

export const ProductType = mongoose.model('producttype', productTypeSchema)
