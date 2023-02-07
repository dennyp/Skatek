import express from 'express'
import { verifyToken } from '../config/auth.js'
import { activityLogController } from '../controllers/activityLogController.js'

export const router = express.Router()

const controller = new activityLogController()

router.get('/', verifyToken, (req, res, next) =>
  controller.findAll(req, res, next)
)
router.get('/:id', verifyToken, (req, res, next) =>
  controller.find(req, res, next)
)
router.get('/department/:id', verifyToken, (req, res, next) =>
  controller.findByDepartment(req, res, next)
)
router.post('/', verifyToken, (req, res, next) =>
  controller.create(req, res, next)
)
router.put('/:id', verifyToken, (req, res, next) =>
  controller.update(req, res, next)
)
