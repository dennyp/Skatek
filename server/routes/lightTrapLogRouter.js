import express from 'express'
import { lightTrapLogController } from '../controllers/lightTrapLogController.js'
import { verifyToken } from '../middleware/auth.js'

export const router = express.Router()

const controller = new lightTrapLogController()

router.get('/', verifyToken, (req, res, next) =>
  controller.findAll(req, res, next)
)

router.get('/visual', verifyToken, (req, res, next) =>
  controller.findAllVisual(req, res, next)
)

router.post('/', verifyToken, (req, res, next) =>
  controller.create(req, res, next)
)
