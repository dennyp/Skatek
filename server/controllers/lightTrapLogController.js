import createError from 'http-errors'
import mongoose from 'mongoose'
import { LightTrapLog } from '../models/LightTrapLog.js'
import { Product } from '../models/Product.js'
import { getLightTrapLogPlotData } from '../visual/plotData.js'

export class lightTrapLogController {
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

      const lightTrapLogs = await LightTrapLog.getAll(
        sortFormatted,
        page,
        pageSize
      )

      const total = await LightTrapLog.countDocuments()

      res.json({ lightTrapLogs, total })
    } catch (error) {
      next(createError(500))
    }
  }

  async findAllVisual(req, res, next) {
    try {
      const { department, dateStart, dateEnd } = req.query

      const products = await Product.getByDepartment(department)
      const productsIds = products.map((product) => product._id)

      const { readyToPlotProducts, productObjects } =
        await getLightTrapLogPlotData(productsIds, dateStart, dateEnd)

      let plotData = {}
      if (readyToPlotProducts.length > 0) {
        let data = []
        readyToPlotProducts.forEach((product) => {
          const obj = {
            data: [
              product.averageFlyActivity,
              product.averageBananaflyActivity,
              product.averageWaspActivity,
              product.averageNeuropteranActivity,
              product.averageDaddylonglegsActivity,
              product.averageMiscActivity,
            ],
            productName: `${product.product} - ${product.placement}`,
          }

          data.push(obj)
        })

        plotData = {
          labels: [
            'Flugor',
            'Bananflugor',
            'Getingar',
            'Nätvingar',
            'Harkrankar',
            'Övrigt',
          ],
          datasets: data,
        }
      }

      res.json({
        plotData,
        productObjects: [productObjects],
      })
    } catch (error) {
      next(createError(500))
    }
  }

  async create(req, res, next) {
    try {
      const obj = new LightTrapLog({
        comment: req.body.comment,
        dateLogged: req.body.dateLogged,
        product: req.body.product,
        flyActivity: parseInt(req.body.flyActivity),
        bananaflyActivity: parseInt(req.body.bananaFlyActivity),
        waspActivity: parseInt(req.body.waspActivity),
        neuropteranActivity: parseInt(req.body.neuropteranActivity),
        daddylonglegsActivity: parseInt(req.body.daddylonglegsActivity),
        miscActivity: parseInt(req.body.miscActivity),
      })

      await obj.save()

      const newURL = `https://${req.get('host')}${req.originalUrl}/${obj._id}`
      res.location(newURL).status(201).json(obj)
    } catch (error) {
      next(createError(500))
    }
  }
}
