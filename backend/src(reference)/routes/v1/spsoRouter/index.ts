import express from 'express'
import { blockLoggedInMiddleware, handleSpsoLogin } from '../../../controllers/authController/login'
import { handleSpsoSignUp } from '../../../controllers/authController/signup'
import { deleteSpsoController, getSpsoController, updateSpsoController } from '../../../controllers/spsoController'

export const spsoRouter = express.Router()

spsoRouter.post('/signup', [...blockLoggedInMiddleware, handleSpsoSignUp])
spsoRouter.post('/login', [...blockLoggedInMiddleware, handleSpsoLogin])
spsoRouter.get('/', getSpsoController)
spsoRouter.put('/', updateSpsoController)
spsoRouter.delete('/', deleteSpsoController)
