import express from 'express'
import { documentController } from '../controllers/documentController.js'
import { verifyToken } from '../middleware/auth.js'
import { upload } from '../middleware/multer.js'

export const router = express.Router()

const controller = new documentController()

router.get('/', verifyToken, (req, res, next) =>
  controller.findAll(req, res, next)
)

router.get('/download/:id', verifyToken, (req, res, next) =>
  controller.download(req, res, next)
)

router.post('/', verifyToken, upload.array('files'), (req, res, next) =>
  controller.create(req, res, next)
)
