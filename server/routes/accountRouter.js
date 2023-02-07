import express from 'express'
import { verifyToken } from '../config/auth.js'
import { AccountController } from '../controllers/accountController.js'

export const router = express.Router()

const controller = new AccountController()

router.post('/login', (req, res, next) => controller.login(req, res, next))
router.get('/profile', verifyToken, (req, res, next) =>
  controller.profile(req, res, next)
)
