import createError from 'http-errors'
import mongoose from 'mongoose'
import cloudinary from '../config/cloudinary.js'
import { Image } from '../models/Image.js'

export class imageController {
  async create(req, res, next) {
    try {
      if (Object.keys(req.body).length === 0 || req.file === undefined) {
        next(createError(400))
        return
      }

      const { name, desc, department } = req.body

      const b64 = Buffer.from(req.file.buffer).toString('base64')
      const dataURI = 'data:' + req.file.mimetype + ';base64,' + b64

      const result = await cloudinary.uploader.upload(dataURI, {
        folder: 'plans',
      })

      const obj = new Image({
        name,
        desc,
        department,
        img: {
          public_id: result.public_id,
          url: result.secure_url,
        },
      })

      await obj.save()

      const newURL = `https://${req.get('host')}${req.originalUrl}/${obj._id}`
      res.location(newURL).status(201).json(obj)
    } catch (error) {
      next(createError(500))
    }
  }

  async findAllInDepartment(req, res, next) {
    try {
      const { id } = req.params

      if (!id) {
        next(createError(400))
      }

      const images = await Image.find({ department: id })

      if (!images) {
        next(createError(404))
      }

      res.json(images)
    } catch (error) {
      next(createError(500))
    }
  }
}
