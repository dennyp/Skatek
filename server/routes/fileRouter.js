import express from 'express'
import { fileController } from '../controllers/fileController.js'
import { verifyToken } from '../middleware/auth.js'
import { upload } from '../middleware/multer.js'

export const router = express.Router()

const controller = new fileController()

router.post('/upload', verifyToken, upload.single('file'), (req, res, next) =>
  controller.create(req, res, next)
)
