import cookieParser from 'cookie-parser'
import cors from 'cors'
import 'dotenv/config'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import { connectDatabase } from './config/mongoose.js'
import { router } from './routes/homeRouter.js'

const PORT = process.env.PORT || 5000

const main = async () => {
  await connectDatabase()

  const app = express()

  const corsOptions = {
    credentials: true,
    origin: `${process.env.FRONTEND_URL}`,
  }

  app.use(cors(corsOptions))

  app.use(helmet())

  app.use(morgan('dev'))

  app.use(express.json())

  app.use(cookieParser())

  app.use('/api/v1', router)

  app.use((err, req, res, next) => {
    const status = err.status || 500
    res.status(status).json({
      status: err.status,
      message: err.message,
    })
  })

  app.listen(PORT, () => {
    console.log(`Listening on ${PORT}...`)
  })
}

main().catch(console.error)
