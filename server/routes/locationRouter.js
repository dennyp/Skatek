import express from 'express'
import { verifyToken } from '../config/auth.js'
import { locationController } from '../controllers/locationController.js'

export const router = express.Router()

const controller = new locationController()

router.get('/', verifyToken, (req, res, next) =>
  controller.findAll(req, res, next)
)
