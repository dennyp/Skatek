import express from 'express'
import { locationController } from '../controllers/locationController.js'

export const router = express.Router()

const controller = new locationController()

router.get('/', (req, res, next) => controller.findAll(req, res, next))
