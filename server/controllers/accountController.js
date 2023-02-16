import createError from 'http-errors'
import jwt from 'jsonwebtoken'
import { User } from '../models/User.js'

export class AccountController {
  async login(req, res, next) {
    try {
      const { email, password } = req.body
      const cookies = req.cookies
      console.log(`cookie available at login: ${JSON.stringify(cookies)}`)

      if (!email || !password) {
        next(createError(400, 'Saknar e-post eller användarnamn'))
      }

      const user = await User.authenticate(email, password)

      if (user) {
        const accessToken = jwt.sign(
          {
            id: user._id,
            firstname: user.firstName,
            lastname: user.lastName,
            email: user.email,
            isAdmin: user.isAdmin,
          },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: '1h',
          }
        )

        const newRefreshToken = jwt.sign(
          { email: user.email },
          process.env.REFRESH_TOKEN_SECRET,
          { expiresIn: '1d' }
        )

        let newRefreshTokenArray = !cookies?.jwt
          ? user.refreshToken
          : user.refreshToken.filter((rt) => rt !== cookies.jwt)

        if (cookies?.jwt) {
          const refreshToken = cookies.jwt
          const foundToken = await User.findOne({ refreshToken }).exec()
          if (!foundToken) {
            newRefreshTokenArray = []
          }

          res.clearCookie('jwt', {
            httpOnly: true,
            sameSite: 'None',
            secure: true,
          })
        }

        user.refreshToken = [...newRefreshTokenArray, newRefreshToken]
        const result = await user.save()
        res.cookie('jwt', newRefreshToken, {
          httpOnly: true,
          secure: true,
          sameSite: 'None',
          maxAge: 24 * 60 * 60 * 1000,
        })

        res.status(201).json({ user, accessToken })
      }
    } catch (error) {
      next(createError(401))
    }
  }

  async refresh(req, res, next) {
    try {
      const cookies = req.cookies

      if (!cookies?.jwt) return res.sendStatus(401)

      const refreshToken = cookies.jwt

      res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })

      const user = await User.findOne({ refreshToken }).exec()

      if (!user) {
        jwt.verify(
          refreshToken,
          process.env.REFRESH_TOKEN_SECRET,
          async (err, decoded) => {
            if (err) {
              return res.sendStatus(403)
            }
            console.log('attempted refresh token reuse!')
            const hackedUser = await User.findOne({
              email: decoded.email,
            }).exec()
            hackedUser.refreshToken = []
            const result = await hackedUser.save()
            console.log(result)
          }
        )
        return res.sendStatus(403)
      }

      const newRefreshTokenArray = user.refreshToken.filter(
        (rt) => rt !== refreshToken
      )

      jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        async (err, decoded) => {
          if (err) {
            console.log('expired refresh token')
            user.refreshToken = [...newRefreshTokenArray]
            const result = await user.save()
            console.log(result)
          }
          if (err || user.email !== decoded.email) return res.sendStatus(403)

          const accessToken = jwt.sign(
            {
              UserInfo: {
                email: decoded.email,
              },
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '1h' }
          )

          const newRefreshToken = jwt.sign(
            { email: user.email },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
          )

          user.refreshToken = [...newRefreshTokenArray, newRefreshToken]
          const result = await user.save()

          res.cookie('jwt', newRefreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            maxAge: 24 * 60 * 60 * 1000,
          })

          res.json({ accessToken })
        }
      )
    } catch (error) {}
  }

  async profile(req, res, next) {
    try {
      const user = await User.findById(req.user._id).select('-password')

      if (user) res.json(user)
    } catch (error) {
      next(createError(404))
    }
  }
}
