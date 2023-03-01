import express from 'express'
import { verifyToken } from '../middleware/auth.js'
import { AccountController } from '../controllers/accountController.js'

export const router = express.Router()

const controller = new AccountController()

router.post('/login', (req, res, next) => controller.login(req, res, next))
router.get('/profile', verifyToken, (req, res, next) =>
  controller.profile(req, res, next)
)
router.get('/refresh', (req, res, next) => controller.refresh(req, res, next))
