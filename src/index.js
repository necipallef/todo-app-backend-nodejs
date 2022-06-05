import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { router as sessionRouter } from './handlers/session.handler.js'

dotenv.config()

const app = new express()

app.use(express.json())
app.use(cors())

app.use('/session', sessionRouter)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`)
})
