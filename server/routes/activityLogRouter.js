import express from 'express'
import { activityLogController } from '../controllers/activityLogController.js'
import { verifyToken } from '../middleware/auth.js'

export const router = express.Router()

const controller = new activityLogController()

router.get('/', verifyToken, (req, res, next) =>
  controller.findAll(req, res, next)
)

router.get('/visual', verifyToken, (req, res, next) =>
  controller.findAllVisual(req, res, next)
)

router.get('/:id', verifyToken, (req, res, next) =>
  controller.find(req, res, next)
)

router.post('/', verifyToken, (req, res, next) =>
  controller.create(req, res, next)
)

router.put('/:id', verifyToken, (req, res, next) =>
  controller.update(req, res, next)
)

router.delete('/:id', verifyToken, (req, res, next) =>
  controller.delete(req, res, next)
)
