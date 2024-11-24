/* eslint-disable @typescript-eslint/no-unused-vars */
// Route: /api
import express from 'express'
import { routes as v1 } from './v1'
export const routes = express.Router()

routes.use('/v1', v1)

routes.get('/*', (req, res, next) => {
  res.json({
    message: 'Error: Route not found'
  })
})
