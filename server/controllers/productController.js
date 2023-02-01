import axios from 'axios'
import createError from 'http-errors'
import { Product } from '../models/Product.js'

export class productController {
  async find(req, res, next) {
    try {
      const id = req.params.id
      console.log(
        '🚀 ~ file: productController.js:9 ~ productController ~ find ~ id',
        id
      )
      const productObj = await Product.getById(id)

      if (!productObj || typeof productObj === undefined) {
        next(createError(404))
        return
      }

      res.json(productObj)
    } catch (error) {
      console.log(
        '🚀 ~ file: productController.js:22 ~ productController ~ find ~ error',
        error
      )
      next(createError(400))
    }
  }

  async findAll(req, res, next) {
    try {
      console.log(req.query)
      const products = await Product.getAll()
      res.json(products)
    } catch (error) {
      next()
    }
  }
}
