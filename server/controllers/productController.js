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
      const { search = '' } = req.query

      const products = await Product.getAll(search)

      res.json(products)
    } catch (error) {
      next()
    }
  }

  async create(req, res, next) {
    try {
      const obj = new Product({
        name: req.body.name,
        placement: req.body.placement,
        department: req.body.department,
        location: req.body.location,
        productType: req.body.productType,
      })

      await obj.save()

      const newURL = `https://${req.get('host')}${req.originalUrl}/${obj._id}`
      res.location(newURL).status(201).json(obj)
    } catch (error) {
      next()
    }
  }

  async update(req, res, next) {
    try {
      const id = req.params.id
      const obj = await Product.getById(id)

      await obj.updateOne({
        name: req.body.name,
        placement: req.body.placement,
        department: req.body.department,
        location: req.body.location,
        productType: req.body.productType,
      })

      res.status(204).end()
    } catch (error) {
      next()
    }
  }
}
