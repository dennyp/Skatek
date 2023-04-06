import express from 'express'
import { productController } from '../controllers/productController.js'
import { verifyToken } from '../middleware/auth.js'

export const router = express.Router()

const controller = new productController()

router.get('/', verifyToken, (req, res, next) =>
  controller.findAllLightTraps(req, res, next)
)

router.get('/department/:id', verifyToken, (req, res, next) =>
  controller.findAllLightTrapsInDepartment(req, res, next)
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
