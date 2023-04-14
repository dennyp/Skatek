import express from 'express'
import multer from 'multer'
import { documentController } from '../controllers/documentController.js'
import { verifyToken } from '../middleware/auth.js'

const storage = multer.memoryStorage()
const upload = multer({ storage })

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

router.delete('/:id', verifyToken, (req, res, next) =>
  controller.delete(req, res, next)
)
