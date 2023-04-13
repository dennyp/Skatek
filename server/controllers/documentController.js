import createError from 'http-errors'
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

          const zip = new JSZip()
          zip.file(originalname, file.buffer)
          const generatedZip = await zip.generateAsync({ type: 'nodebuffer' })
          const b64 = Buffer.from(generatedZip).toString('base64')
          const dataURI = 'data:' + file.mimetype + ';base64,' + b64

          const result = await cloudinary.uploader.upload(dataURI, {
            folder: 'documents',
            resource_type: 'raw',
          })

          const obj = new Document({
            name: originalname,
            contentType: mimetype,
            size,
            url: result.secure_url,
            public_id: result.public_id,
          })

          return await obj.save()
        })
      )

      res.status(201).json({ files: savedFiles })
    } catch (error) {
      next(createError(error))
    }
  }

  async download(req, res, next) {
    try {
      const { id } = req.params

      const document = await Document.findById(id)

      res.redirect(document.url)
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
