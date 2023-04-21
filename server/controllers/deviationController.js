import createError from 'http-errors'
import { Deviation } from '../models/Deviation.js'

export class deviationController {
  async findOne(req, res, next) {
    try {
      const { id } = req.params
      const deviation = await Deviation.findById(id).populate('department')

      if (!deviation) {
        next(createError(404))
      }

      res.json(deviation)
    } catch (error) {
      next(createError(500))
    }
  }

  async findAll(req, res, next) {
    try {
      const deviations = await Deviation.find().populate('department')

      res.json(deviations)
    } catch (error) {
      next(createError(500))
    }
  }

  async create(req, res, next) {
    try {
      const { department, comment, date } = req.body

      const obj = new Deviation({
        department,
        comment,
        date,
      })

      obj.save()

      const newURL = `https://${req.get('host')}${req.originalUrl}/${obj._id}`
      res.location(newURL).status(201).json(obj)
    } catch (error) {
      next(createError(500))
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params

      if (id === undefined || id === null || id === '') {
        next(createError(400))
        return
      }

      const obj = await Deviation.findByIdAndUpdate(id, req.body, { new: true })

      if (!obj) {
        next(createError(404))
      }

      const newURL = `https://${req.get('host')}${req.originalUrl}/${obj._id}`
      res.location(newURL).status(201).json(obj)
    } catch (error) {
      next(createError(500))
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params

      if (id === undefined || id === null || id === '') {
        next(createError(400))
        return
      }

      const obj = await Deviation.findByIdAndDelete(id)

      if (!obj) {
        next(createError(404))
      }

      res.status(204).end()
    } catch (error) {
      next(createError(500))
    }
  }
}
