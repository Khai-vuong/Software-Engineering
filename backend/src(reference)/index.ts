/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { NextFunction, Request, Response } from 'express'
import path from 'path'
import { routes } from './routes'
import initializePassport from './passport'
import * as dotenv from 'dotenv'
import passport from 'passport'
import cors from 'cors'
import { HttpError } from './lib/error/HttpErrors'

dotenv.config()

const app = express()

initializePassport()
app.use(cors())
app.use(passport.initialize())
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.get('/test', (req, res) => {
  res.json({
    message: 'Hello World'
  })
})
app.use('/api', routes)
app.use('/*', (req, res, next) => {
  res.json({
    message: 'Error: Route not found'
  })
})

app.use((err: HttpError | Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof HttpError) {
    res.status(err.statusCode).json({
      message: err.message,
      errors: err.errors
    })
  } else
    res.status(500).json({
      message: 'Internal Server Error',
      errors: [err.message]
    })
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
