import express from 'express'
import { getStudentController, updateStudentPageBalanceController } from '../../../controllers/studentController'

export const studentRouter = express.Router()

studentRouter.get('/:id', getStudentController)
studentRouter.put('/page', updateStudentPageBalanceController)
