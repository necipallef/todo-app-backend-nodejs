import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { router as sessionRouter } from './handlers/session.handler.js'
import { router as userRouter } from './handlers/user.handler.js'
import { router as todoRouter } from './handlers/todo.handler.js'
import { contentTypeJSONMiddleware } from './middlewares/contentTypeJSON.middleware.js'
import { connectDB } from './db/sequelize.js'

dotenv.config()

await connectDB()

const app = new express()

app.use(express.json())
app.use(cors())
// app.use(contentTypeJSONMiddleware())

app.use('/session', sessionRouter)
app.use('/user', userRouter)
app.use('/todo', todoRouter)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`)
})
