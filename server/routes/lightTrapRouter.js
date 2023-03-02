import express from 'express'
import { lightTrapController } from '../controllers/lightTrapController.js'
import { verifyToken } from '../middleware/auth.js'

export const router = express.Router()

const controller = new lightTrapController()

router.get('/', verifyToken, (req, res, next) =>
  controller.findAll(req, res, next)
)

router.post('/', verifyToken, (req, res, next) =>
  controller.create(req, res, next)
)
