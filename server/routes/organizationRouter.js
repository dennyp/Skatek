import express from 'express'
import { organizationController } from '../controllers/organizationController.js'
import { verifyToken } from '../middleware/auth.js'

export const router = express.Router()

const controller = new organizationController()

router.get('/', verifyToken, (req, res, next) =>
  controller.find(req, res, next)
)
