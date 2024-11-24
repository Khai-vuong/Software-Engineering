/* eslint-disable @typescript-eslint/no-unused-vars */
import { SPSO, Student } from '@prisma/client'
import passport from 'passport'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../../constants'
import { NextFunction, Request, Response } from 'express'
import { PassportJwtPayload, UserTokenized } from '../../passport/types'
import { HttpError } from '../../lib/error/HttpErrors'
import { HttpStatus } from '../../lib/statusCode'
import { IVerifyOptions } from 'passport-local'
import ERROR_MESSAGES from '../../configs/errorMessages'
import expressAsyncHandler from 'express-async-handler'
import { LogInResponse, SpsoLogInResponse, UserRole } from './type'
import { createLogInTime } from '../../model/LogInTimes'

export function generateToken(user: Student | SPSO) {
  // Check if the user is a student or SPSO
  const role: UserRole = 'username' in user ? 'STUDENT' : 'SPSO'

  const userTokenized: UserTokenized = { id: user.id, role: role }
  return jwt.sign(userTokenized, JWT_SECRET, {
    expiresIn: '1h'
  })
}

export const blockLoggedIn = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) throw new HttpError(ERROR_MESSAGES.auth.logIn.alreadyLoggedIn, HttpStatus.BadRequest)
  next()
})

export const blockNotLoggedIn = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  if (!req.isAuthenticated()) throw new HttpError(ERROR_MESSAGES.auth.logIn.notLoggedIn, HttpStatus.Unauthorized)
  next()
})

export const onlyAllowSPSO = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  if ((req.user as PassportJwtPayload)?.role !== 'SPSO')
    throw new HttpError(ERROR_MESSAGES.auth.notSPSO, HttpStatus.Unauthorized)
  next()
})

export const onlyAllowStudent = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  if ((req.user as PassportJwtPayload).role !== 'STUDENT')
    throw new HttpError(ERROR_MESSAGES.auth.notStudent, HttpStatus.Unauthorized)
  next()
})

export const handleLogin = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('login', async (err: Error, user: Student, info: IVerifyOptions) => {
    if (err) {
      return next(new HttpError(err.message, HttpStatus.InternalServerError))
    }

    if (!user) {
      return next(new HttpError(info.message, HttpStatus.Unauthorized))
    }
    // req.login(user, { session: false }, async (error) => {
    //   if (error) return next(error)

    //   const token = generateToken(user) // generate token
    //   const { password, ...studentWithoutPassword } = user // remove password from user object
    //   const response: LogInResponse = { token, student: studentWithoutPassword }
    //   res.json(response)
    // })
    await createLogInTime(user.id)
    const token = generateToken(user) // generate token
    const { password, ...studentWithoutPassword } = user // remove password from user object
    const response: LogInResponse = { token, student: studentWithoutPassword }
    res.json(response)
  })(req, res, next)
})

export const handleSpsoLogin = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('spsologin', async (err: Error, user: SPSO, info: IVerifyOptions) => {
    if (err) {
      return next(new HttpError(err.message, HttpStatus.InternalServerError))
    }

    if (!user) {
      return next(new HttpError(info.message, HttpStatus.Unauthorized))
    }

    const token = generateToken(user) // generate token
    const { password, ...spsoWithoutPassword } = user // remove password from user object
    const response: SpsoLogInResponse = { token, spso: spsoWithoutPassword }
    res.json(response)
  })(req, res, next)
})

export const isLoginAuth = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  await passport.authenticate(
    'jwt',
    { session: false },
    (err: Error, user: PassportJwtPayload, info?: IVerifyOptions) => {
      if (err) {
        return next(err)
      }

      if (!user) {
        return next()
      }
      req.logIn(user, { session: false }, (error) => {
        if (error) return next(error)
      })

      next()
    }
  )(req, res, next)
})

export const loginController = [blockLoggedIn, handleLogin]
export const spsoLoginController = [blockLoggedIn, handleSpsoLogin]
export const blockLoggedInMiddleware = [isLoginAuth, blockLoggedIn]
export const blockNotLoggedInMiddleware = [isLoginAuth, blockNotLoggedIn]
export const onlyAllowSPSOMiddleware = [...blockLoggedInMiddleware, onlyAllowSPSO]
export const onlyAllowStudentMiddleware = [...blockLoggedInMiddleware, onlyAllowStudent]
