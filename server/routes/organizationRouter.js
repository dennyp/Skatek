import express from 'express'
import { organizationController } from '../controllers/organizationController.js'

export const router = express.Router()

const controller = new organizationController()

router.get('/', (req, res, next) => controller.find(req, res, next))
