import express from 'express'
import { lightTrapLogController } from '../controllers/lightTrapLogController.js'
import { verifyToken } from '../middleware/auth.js'

export const router = express.Router()

const controller = new lightTrapLogController()

router.get('/', verifyToken, (req, res, next) =>
  controller.findAll(req, res, next)
)

router.get('/visual-per-insect', verifyToken, (req, res, next) =>
  controller.findAllVisualPerInsect(req, res, next)
)

router.get('/visual-for-trap', verifyToken, (req, res, next) =>
  controller.findAllVisualForTrap(req, res, next)
)

router.get('/visual-total', verifyToken, (req, res, next) =>
  controller.findAllVisualTotal(req, res, next)
)

router.post('/', verifyToken, (req, res, next) =>
  controller.create(req, res, next)
)

router.delete('/:id', verifyToken, (req, res, next) =>
  controller.delete(req, res, next)
)
