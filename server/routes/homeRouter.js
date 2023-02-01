import express from 'express'
import createError from 'http-errors'
import { HomeController } from '../controllers/homeController.js'
import { router as productRouter } from '../routes/productRouter.js'

export const router = express.Router()

const controller = new HomeController()

router.get('/', controller.index)
router.use('/products', productRouter)
router.use('/products', productRouter)

router.use('*', (req, res, next) => next(createError(404)))
