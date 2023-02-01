import mongoose from 'mongoose'

// Connection string to MongoDb
const CONNECTION_STRING = `${process.env.DB_URL}`
console.log('🚀 ~ file: mongoose.js:5 ~ CONNECTION_STRING', CONNECTION_STRING)

export const connectDatabase = async () => {
  mongoose.connection.on('connected', () =>
    console.log(`Connected to database ${process.env.DB_NAME}!`)
  )
  mongoose.connection.on('error', (err) =>
    console.log(`Error when connecting to database: ${err}`)
  )
  mongoose.connection.on('disconnected', () =>
    console.log('Disconnected from database.')
  )

  // For nodemon restarts
  process.on('SIGUSR2', () => {
    mongoose.connection.close(() => {
      console.log('Database disconnected due to nodemon restart.')
      process.exit(0)
    })
  })

  // For app termination
  process.on('SIGINT', function () {
    console.log('Database disconnected due to app termination.')
    process.exit(0)
  })

  console.log('Connecting to server...')
  return mongoose.connect(CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
}
