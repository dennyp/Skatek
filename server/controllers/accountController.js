import createError from 'http-errors'
import jwt from 'jsonwebtoken'
import { User } from '../models/User.js'

export class AccountController {
  async login(req, res, next) {
    try {
      if (!req.body.email || !req.body.password) {
        next(createError(400, 'Saknar e-post eller användarnamn'))
      }

      const user = await User.authenticate(req.body.email, req.body.password)

      const userInfo = {
        id: user._id,
        firstname: user.firstName,
        lastname: user.lastName,
        email: user.email,
        isAdmin: user.isAdmin,
      }

      const accessToken = jwt.sign(userInfo, process.env.TOKEN_SECRET)

      res.status(201).json({ userInfo, accessToken })
    } catch (error) {
      next(createError(401))
    }
  }

  async profile(req, res, next) {
    try {
      const user = await User.findById(req.user._id)
      const returnUser = {
        id: user._id,
        firstname: user.firstName,
        lastname: user.lastName,
        email: user.email,
        isAdmin: user.isAdmin,
      }

      if (user) res.json(returnUser)
    } catch (error) {
      next(createError(404))
    }
  }
}
