import express from 'express'
import { verifyToken } from '../middleware/verifyToken'

export const router = express.Router()

const controller = new lightTrapController()

router.get('/', verifyToken, (req, res, next) =>
  controller.findAll(req, res, next)
)
