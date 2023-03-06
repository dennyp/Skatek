import createError from 'http-errors'
import mongoose from 'mongoose'
import { LightTrapLog } from '../models/LightTrapLog.js'

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
