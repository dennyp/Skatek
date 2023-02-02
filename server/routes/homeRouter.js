import express from 'express'
import createError from 'http-errors'
import { HomeController } from '../controllers/homeController.js'
import { router as departmentRouter } from '../routes/departmentRouter.js'
import { router as organizationRouter } from '../routes/organizationRouter.js'
import { router as productRouter } from '../routes/productRouter.js'

export const router = express.Router()

const controller = new HomeController()

router.get('/', controller.index)
router.use('/products', productRouter)
router.use('/organizations', organizationRouter)
router.use('/departments', departmentRouter)

router.use('*', (req, res, next) => next(createError(404)))
