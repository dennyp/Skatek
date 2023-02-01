import express from 'express'
import createError from 'http-errors'
import { HomeController } from '../controllers/homeController.js'

export const router = express.Router()

const controller = new HomeController()

router.get('/', controller.index)

router.use('*', (req, res, next) => next(createError(404)))
