import mongoose from 'mongoose'
const environment = ['production', 'test']
const MONGO_DEBUG = !environment.includes(process.env.NODE_ENV) ? true : false
const MONGODB_LOG_INFO = process.env.MONGODB_LOG_INFO || true
const { MONGODB_DSN = 'mongodb://127.0.0.1:27017/challenge' } = process.env
mongoose.Promise = global.Promise
mongoose.set('debug', MONGO_DEBUG)
const mongooseConnection= mongoose.createConnection(MONGODB_DSN, {
  useNewUrlParser: true
})

//CONSOLE LOG
//debts
if (MONGODB_LOG_INFO === true) {
    mongooseConnection.on('connected', () =>
    console.log(`Mongoose mongooseDebts connection connected`)
  )
  if (process.env.NODE_ENV === 'development') {
    mongooseConnection.on('error', err =>
      console.log(`Mongoose mongooseDebts connection err ${err}`)
    )
  }
  mongooseConnection.on('disconnected', () =>
    console.log('Mongoose mongooseDebts connectios disconnected')
  )
  mongooseConnection.on('open', () =>
    console.log('Mongoose mongooseDebts connection is open')
  )
}
export { mongooseConnection }
