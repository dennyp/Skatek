import axios from 'axios'
import createError from 'http-errors'
import { Product } from '../models/Product.js'

export class productController {
  async find(req, res, next) {
    try {
      const id = req.params.id
      const productObj = await Product.getById(id)

      if (!productObj || typeof productObj === undefined) {
        next(createError(404))
        return
      }

      res.json(productObj)
    } catch (error) {
      next(createError(400))
    }
  }

  async findAll(req, res, next) {
    try {
      const products = await Product.getAll()
      res.json(products)
    } catch (error) {
      next()
    }
  }
}
