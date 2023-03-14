import createError from 'http-errors'
import mongoose from 'mongoose'
import { ActivityLog } from '../models/ActivityLog.js'
import { Product } from '../models/Product.js'
import { getActivityLogPlotData } from '../visual/plotData.js'

export class activityLogController {
  async findAll(req, res, next) {
    try {
      const { page = 1, pageSize = 20, sort = null, search = '' } = req.query

      const generateSort = () => {
        const sortParsed = JSON.parse(sort)
        const sortFormatted = {
          [sortParsed.field]: sortParsed.sort === 'asc' ? 1 : -1,
        }
        return sortFormatted
      }

      const sortFormatted = Boolean(sort) ? generateSort() : {}

      const activityLogs = await ActivityLog.getAll(
        sortFormatted,
        page,
        pageSize
      )
      const total = await ActivityLog.countDocuments()

      res.json({ activityLogs, total })
    } catch (error) {
      next()
    }
  }

  async find(req, res, next) {
    try {
      const { id } = req.params

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

  async findAllVisual(req, res, next) {
    try {
      const {
        department,
        dateStart,
        dateEnd,
        dateStartTwo = '',
        dateEndTwo = '',
      } = req.query

      const products = await Product.getByDepartment(department)
      const productsIds = products.map((product) => product._id)

      const {
        readyToPlotProducts: activityLogsFromProductsPeriodOne,
        productObjects: productObjectsPeriodOne,
      } = await getActivityLogPlotData(productsIds, dateStart, dateEnd)

      const {
        readyToPlotProducts: activityLogsFromProductsPeriodTwo,
        productObjects: productObjectsPeriodTwo,
      } = await getActivityLogPlotData(productsIds, dateStartTwo, dateEndTwo)

      let plotData = {}
      if (activityLogsFromProductsPeriodOne.length > 0) {
        plotData = {
          labels: activityLogsFromProductsPeriodOne.map(
            (product) => `${product.product} - ${product.placement}`
          ),
          datasets: [
            {
              label: 'Period 1',
              data: activityLogsFromProductsPeriodOne.map(
                (product) => product.averageActivity
              ),
            },
            {
              label: 'Period 2',
              data: activityLogsFromProductsPeriodTwo.map(
                (product) => product.averageActivity
              ),
            },
          ],
        }
      }

      res.json({
        plotData,
        productObjects: [productObjectsPeriodOne, productObjectsPeriodTwo],
      })
    } catch (error) {
      next()
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

  async update(req, res, next) {
    try {
      const id = req.params.id
      const obj = await ActivityLog.getById(id)

      await obj.updateOne({
        activity: req.body.activity,
        comment: req.body.comment,
        dateLogged: req.body.dateLogged,
        product: req.body.product,
      })

      const newURL = `https://${req.get('host')}${req.originalUrl}/${obj._id}`
      res.location(newURL).status(201).json(obj)
    } catch (error) {
      next()
    }
  }
}
