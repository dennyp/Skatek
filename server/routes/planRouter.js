import express from 'express'
import multer from 'multer'
import { imageController } from '../controllers/imageController.js'
import { verifyToken } from '../middleware/auth.js'

const storage = multer.memoryStorage()
const upload = multer({ storage })

export const router = express.Router()

const controller = new imageController()

router.get('/:id', verifyToken, (req, res, next) =>
  controller.findAllInDepartment(req, res, next)
)

router.post('/', verifyToken, upload.single('file'), (req, res, next) =>
  controller.create(req, res, next)
)
