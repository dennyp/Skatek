import express from 'express'
import { productTypeController } from '../controllers/productTypeController.js'
import { verifyToken } from '../middleware/auth.js'

export const router = express.Router()

const controller = new productTypeController()

router.get('/', verifyToken, (req, res, next) =>
  controller.findAll(req, res, next)
)
router.post('/', verifyToken, (req, res, next) =>
  controller.create(req, res, next)
)
