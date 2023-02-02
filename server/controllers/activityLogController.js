import createError from 'http-errors'
import { ActivityLog } from '../models/ActivityLog.js'

export class activityLogController {
  async findAll(req, res, next) {
    try {
      const activityLogs = await ActivityLog.getAll()
      res.json(activityLogs)
    } catch (error) {
      next()
    }
  }

  async find(req, res, next) {
    try {
      const id = req.params.id
      const obj = await ActivityLog.getById(id)

      if (!obj || typeof obj === undefined) {
        next(createError(404))
        return
      }

      res.json(obj)
    } catch (error) {
      next(createError(400))
    }
  }

  async create(req, res, next) {
    try {
      const obj = new ActivityLog({
        activity: req.body.activity,
        comment: req.body.comment,
        dateLogged: req.body.dateLogged,
        product: req.body.product,
      })

      await obj.save()

      const newURL = `https://${req.get('host')}${req.originalUrl}/${obj._id}`
      res.location(newURL).status(201).json(obj)
    } catch (error) {
      next()
    }
  }
}
