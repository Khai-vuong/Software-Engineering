/* eslint-disable @typescript-eslint/no-explicit-any */
import { ValidationError } from 'express-validator'
import { HttpStatus, HttpStatusCode } from '../statusCode'

class HttpError extends Error {
  statusCode: HttpStatus
  errors: Array<any> | undefined

  constructor(message: string, statusCode: HttpStatus, formErrors?: ValidationError[]) {
    super(message)
    this.statusCode = statusCode
    this.name = HttpStatusCode[statusCode]
    this.errors = formErrors
  }
}

export { HttpError }
