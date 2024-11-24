// Route: /api/v1
import express from 'express'
import { authRouter } from './userRouter/auth'
import { blockNotLoggedInMiddleware, isLoginAuth, onlyAllowSPSO } from '../../controllers/authController/login'
import { configRouter } from './configRouter'
import { fileTypeRouter } from './fileTypeRouter'
import { locationRouter } from './locationRouter'
import { printerRouter } from './printerRouter'
import { printingLogRouter } from './printingLogRouter'
import { spsoRouter } from './spsoRouter'
import { studentRouter } from './studentRouter'
import {
  getLogInTimesController,
  getLogInTimesTodayController,
  getLogInTimesYesterdayController
} from '../../controllers/studentController'

export const routes = express.Router()

routes.use('/auth', [isLoginAuth, authRouter])
routes.use('/config', [...blockNotLoggedInMiddleware, onlyAllowSPSO, configRouter])
routes.use('/filetype', fileTypeRouter)
routes.use('/location', locationRouter)
routes.use('/printer', [...blockNotLoggedInMiddleware, printerRouter])
routes.use('/printinglog', [...blockNotLoggedInMiddleware, printingLogRouter])
routes.use('/spso', spsoRouter)
routes.use('/student', studentRouter)

const getLogInTimeRouter = express.Router()
getLogInTimeRouter.get('/', getLogInTimesController)
getLogInTimeRouter.get('/today', getLogInTimesTodayController)
getLogInTimeRouter.get('/yesterday', getLogInTimesYesterdayController)
routes.use('/getlogintimes', [...blockNotLoggedInMiddleware, getLogInTimeRouter])
