import createError from 'http-errors'
import mongoose from 'mongoose'
import { LightTrap } from '../models/LightTrap.js'

export class lightTrapController {
  async findAll(req, res, next) {
    try {
      const lightTraps = await LightTrap.getAll()

      res.json(lightTraps)
    } catch (error) {
      next(createError(404))
    }
  }

  async create(req, res, next) {
    try {
      if (Object.keys(req.body).length === 0) {
        next(createError(400))
        return
      }

      const obj = new LightTrap({
        name: req.body.name,
        placement: req.body.placement,
        department: req.body.department,
        productType: req.body.productType,
      })

      await obj.save()

      const newURL = `https://${req.get('host')}${req.originalUrl}/${obj._id}`
      res.location(newURL).status(201).json(obj)
    } catch (error) {
      next(createError(500))
    }
  }
}
