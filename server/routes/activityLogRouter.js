import express from 'express'

import { activityLogController } from '../controllers/activityLogController.js'

export const router = express.Router()

const controller = new activityLogController()

router.get('/', (req, res, next) => controller.findAll(req, res, next))
router.get('/:id', (req, res, next) => controller.find(req, res, next))
router.get('/department/:id', (req, res, next) =>
  controller.findByDepartment(req, res, next)
)
router.post('/', (req, res, next) => controller.create(req, res, next))
