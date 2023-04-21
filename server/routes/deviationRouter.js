import express from 'express'
import { deviationController } from '../controllers/deviationController.js'
import { verifyToken } from '../middleware/auth.js'

export const router = express.Router()

const controller = new deviationController()

router.get('/:id', verifyToken, (req, res, next) =>
  controller.findOne(req, res, next)
)
router.get('/', verifyToken, (req, res, next) =>
  controller.findAll(req, res, next)
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
