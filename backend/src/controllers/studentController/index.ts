import expressAsyncHandler from 'express-async-handler'
import { getStudentById, updateStudentPrintBalance } from '../../model/Student'
import { HttpStatus } from '../../lib/statusCode'
import { Request, Response } from 'express'
import { getLogInTimesAll, getLogInTimesToday, getLogInTimesYesterday } from '../../model/LogInTimes'
import { PassportJwtPayload } from '../../passport/types'

export const getStudentController = expressAsyncHandler(async (req: Request, res: Response) => {
  const student = await getStudentById(req.params.id)
  res.status(HttpStatus.OK).json(student)
})

export const updateStudentPageBalanceController = expressAsyncHandler(async (req: Request, res: Response) => {
  const response = await updateStudentPrintBalance(req.body.id, parseInt(req.body.printBalance))
  res.status(HttpStatus.OK).json(response)
})

export const getLogInTimesController = expressAsyncHandler(async (req: Request, res: Response) => {
  const response = await getLogInTimesAll((req.user as PassportJwtPayload).id)
  res.status(HttpStatus.OK).json({ logInTimes: response })
})

export const getLogInTimesTodayController = expressAsyncHandler(async (req: Request, res: Response) => {
  const response = await getLogInTimesToday((req.user as PassportJwtPayload).id)
  res.status(HttpStatus.OK).json({ logInTimes: response })
})
export const getLogInTimesYesterdayController = expressAsyncHandler(async (req: Request, res: Response) => {
  const response = await getLogInTimesYesterday((req.user as PassportJwtPayload).id)
  res.status(HttpStatus.OK).json({ logInTimes: response })
})
