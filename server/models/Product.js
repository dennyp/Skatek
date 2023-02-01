import mongoose, { Schema } from 'mongoose'

const productSchema = mongoose.Schema({
  _id: Schema.Types.ObjectId,
  name: Schema.Types.String,
  placement: Schema.Types.String,
})

export const Product = mongoose.model('product', productSchema)
