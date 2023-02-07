import express from 'express'
import { verifyToken } from '../config/auth.js'
import { organizationController } from '../controllers/organizationController.js'

export const router = express.Router()

const controller = new organizationController()

router.get('/', verifyToken, (req, res, next) =>
  controller.find(req, res, next)
)
