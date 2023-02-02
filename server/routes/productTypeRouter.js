import express from 'express'
import { productTypeController } from '../controllers/productTypeController.js'

export const router = express.Router()

const controller = new productTypeController()

router.get('/', (req, res, next) => controller.findAll(req, res, next))
router.post('/', (req, res, next) => controller.create(req, res, next))
