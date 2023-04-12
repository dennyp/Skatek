import express from 'express'
import createError from 'http-errors'
import { HomeController } from '../controllers/homeController.js'
import { router as accountRouter } from '../routes/accountRouter.js'
import { router as activityLogRouter } from '../routes/activityLogRouter.js'
import { router as departmentRouter } from '../routes/departmentRouter.js'
import { router as documentRouter } from '../routes/documentRouter.js'
import { router as lightTrapLogRouter } from '../routes/lightTrapLogRouter.js'
import { router as lightTrapRouter } from '../routes/lightTrapRouter.js'
import { router as locationRouter } from '../routes/locationRouter.js'
import { router as organizationRouter } from '../routes/organizationRouter.js'
import { router as planRouter } from '../routes/planRouter.js'
import { router as productRouter } from '../routes/productRouter.js'
import { router as productTypeRouter } from '../routes/productTypeRouter.js'

export const router = express.Router()

const controller = new HomeController()

router.get('/', controller.index)
router.use('/users', accountRouter)
router.use('/products', productRouter)
router.use('/organizations', organizationRouter)
router.use('/departments', departmentRouter)
router.use('/producttypes', productTypeRouter)
router.use('/locations', locationRouter)
router.use('/activitylogs', activityLogRouter)
router.use('/lighttraps', lightTrapRouter)
router.use('/lighttraplogs', lightTrapLogRouter)
router.use('/plans', planRouter)
router.use('/documents', documentRouter)

router.use('*', (req, res, next) => next(createError(404)))
