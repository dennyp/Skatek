import createError from 'http-errors'
import mongoose from 'mongoose'
import { File } from '../models/File.js'

export class fileController {
  async create(req, res, next) {
    try {
      if (Object.keys(req.file).length === 0 || req.file === undefined) {
        next(createError(400))
        return
      }

      const { originalname, mimetype, size, buffer } = req.file

      const obj = new File({
        name: originalname,
        contentType: mimetype,
        size,
        data: buffer,
      })

      await obj.save()

      const newURL = `https://${req.get('host')}${req.originalUrl}/${obj._id}`
      res.location(newURL).status(201).json(obj)
    } catch (error) {
      console.log(
        '🚀 ~ file: fileController.js:33 ~ fileController ~ create ~ error:',
        error
      )
      next(createError(500))
    }
  }
}
