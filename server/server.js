import 'dotenv/config'

import cors from 'cors'
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

  app.use((req, res, next) => {
    // res.header('Access-Control-Allow-Origin', `${process.env.FRONTEND_URL}`)
    // res.header(
    //   'Access-Control-Allow-Methods',
    //   'GET, POST, OPTIONS, PUT, DELETE'
    // )
    // res.header(
    //   'Access-Control-Allow-Headers',
    //   'Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization'
    // )
    // res.header('Access-Control-Allow-Credentials', true)
    next()
  })

  app.use(helmet())

  app.use(morgan('dev'))

  app.use(express.json())

  app.use('/api/v1', router)

  app.use((err, req, res, next) => {
    res.status(err.status).json({
      status: err.status,
      message: err.message,
    })
  })

  app.listen(PORT, () => {
    console.log(`Listening on ${PORT}...`)
  })
}

main().catch(console.error)
