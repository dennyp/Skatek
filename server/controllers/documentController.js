import createError from 'http-errors'
import mongoose from 'mongoose'
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

          const obj = new Document({
            name: originalname,
            contentType: mimetype,
            size,
            path: path,
          })

          return await obj.save()
        })
      )

      res.status(201).json({ files: savedFiles })
    } catch (error) {
      next(createError(500))
    }
  }

  async download(req, res, next) {
    try {
      const { id } = req.params

      const document = await Document.findById(id)
      console.log(
        '🚀 ~ file: documentController.js:40 ~ documentController ~ download ~ document:',
        document
      )

      res.download(document.path, document.name)
    } catch (error) {
      console.log(
        '🚀 ~ file: documentController.js:44 ~ documentController ~ download ~ error:',
        error
      )
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
