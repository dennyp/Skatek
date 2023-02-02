import express from 'express'
import { departmentController } from '../controllers/departmentController.js'

export const router = express.Router()

const controller = new departmentController()

router.get('/', (req, res, next) => controller.findAll(req, res, next))
router.get('/:id', (req, res, next) => controller.find(req, res, next))
router.post('/', (req, res, next) => controller.create(req, res, next))
