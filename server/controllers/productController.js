import axios from 'axios'
import { Product } from '../models/Product.js'

export class productController {
  async findAll(req, res, next) {
    try {
      const products = await Product.getAll()
      res.json(products)
    } catch (error) {
      next()
    }
  }
}
