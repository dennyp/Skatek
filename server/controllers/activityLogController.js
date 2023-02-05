import createError from 'http-errors'
import { ActivityLog } from '../models/ActivityLog.js'
import { Product } from '../models/Product.js'

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

  async findByDepartment(req, res, next) {
    try {
      const departmentId = req.params.id

      const products = await Product.getByDepartment(departmentId)

      const productsIds = products.map((product) => product._id)

      const activityLogsFromProducts = await ActivityLog.getByProducts(
        productsIds
      )
      // TODO: fetch all logs from each product in array
      // const logs = await ActivityLog.getByDepartmentId(departmentId)

      // if (!obj || typeof obj === undefined) {
      //   next(createError(404))
      //   return
      // }

      res.json(activityLogsFromProducts)
    } catch (error) {
      console.log(
        '🚀 ~ file: activityLogController.js:52 ~ activityLogController ~ findByDepartment ~ error',
        error
      )
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
