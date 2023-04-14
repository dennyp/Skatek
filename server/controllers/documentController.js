import createError from 'http-errors'
import https from 'https'
import JSZip from 'jszip'
import mongoose from 'mongoose'
import cloudinary from '../config/cloudinary.js'
import { Document } from '../models/Document.js'

export class documentController {
  async create(req, res, next) {
    try {
      const files = req.files
      if (files.length === 0 || files === undefined) {
        next(createError(400))
        return
      }

      const savedFiles = await Promise.all(
        files.map(async (file) => {
          const { originalname, mimetype, size, path } = file

          const properName = Buffer.from(file.originalname, 'latin1').toString(
            'utf8'
          )

          const b64 = Buffer.from(file.buffer).toString('base64')
          const dataURI = 'data:' + file.mimetype + ';base64,' + b64

          const result = await cloudinary.uploader.upload(dataURI, {
            folder: 'documents',
            resource_type: 'raw',
          })

          const obj = new Document({
            name: properName,
            contentType: mimetype,
            size,
            url: result.secure_url,
            public_id: result.public_id,
            resource_type: result.resource_type,
            type: result.type,
            version: result.version,
          })

          return await obj.save()
        })
      )

      res.status(201).json({ files: savedFiles })
    } catch (error) {
      next(createError(error))
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params

      if (!id) {
        next(createError(400))
        return
      }

      const response = await Document.findByIdAndDelete(id)

      const result = await cloudinary.uploader.destroy(response.public_id, {
        resource_type: 'raw',
      })

      if (!response) {
        next(createError(404))
        return
      }

      res.status(204).end()
    } catch (error) {
      next(createError(500))
    }
  }

  async download(req, res, next) {
    try {
      const { id } = req.params

      const document = await Document.findById(id)

      const url = `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/${document.resource_type}/${document.type}/fl_attachment/v${document.version}/${document.public_id}`

      res.redirect(url)
    } catch (error) {
      next(createError(500))
    }
  }

  async findAll(req, res, next) {
    try {
      const files = await Document.find()

      if (!files) {
        next(createError(404))
      }

      res.json(files)
    } catch (error) {
      next(createError(500))
    }
  }
}
