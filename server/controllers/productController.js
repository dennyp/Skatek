import axios from 'axios'
import createError from 'http-errors'
import mongoose from 'mongoose'
import { Product } from '../models/Product.js'

export class productController {
  async find(req, res, next) {
    try {
      const { id } = req.params
      const obj = await Product.getById(id)

      if (!obj || typeof obj === undefined) {
        next(createError(404))
        return
      }

      res.json(obj)
    } catch (error) {
      next(createError(500))
    }
  }

  async findAll(req, res, next) {
    try {
      const { search = '', filter = false } = req.query

      let products
      if (mongoose.isValidObjectId(search) && filter === 'true') {
        products = await Product.getAllLightTraps(search)
      } else if (!search) {
        products = await Product.getAll()
      } else {
        products = await Product.getAll(search)
      }

      res.json(products)
    } catch (error) {
      next(createError(500))
    }
  }

  async findAllLightTraps(req, res, next) {
    try {
      const products = await Product.getAllLightTraps()

      if (!products || typeof products === undefined) {
        next(createError(404))
        return
      }

      res.json(products)
    } catch (error) {
      next(createError(400))
    }
  }

  async create(req, res, next) {
    try {
      if (Object.keys(req.body).length === 0) {
        next(createError(400))
        return
      }

      const obj = new Product({
        name: req.body.name,
        placement: req.body.placement,
        department: req.body.department,
        location:
          req.body.location ||
          mongoose.Types.ObjectId('63dba451d817d5eb2e74e08e'),
        productType: req.body.productType,
      })

      await obj.save()

      const newURL = `https://${req.get('host')}${req.originalUrl}/${obj._id}`
      res.location(newURL).status(201).json(obj)
    } catch (error) {
      next(createError(500))
    }
  }

  async update(req, res, next) {
    try {
      if (Object.keys(req.body).length === 0) {
        next(createError(400))
        return
      }

      const { id } = req.params
      const obj = await Product.getById(id)

      if (!obj || typeof obj === undefined) {
        next(createError(404))
        return
      }

      await obj.updateOne({
        name: req.body.name,
        placement: req.body.placement,
        department: req.body.department,
        location:
          req.body.location ||
          mongoose.Types.ObjectId('63dba451d817d5eb2e74e08e'),
        productType: req.body.productType,
        active: req.body.active,
      })

      res.status(204).end()
    } catch (error) {
      next(createError(500))
    }
  }
}
