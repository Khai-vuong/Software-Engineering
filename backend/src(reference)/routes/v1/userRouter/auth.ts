// Route: /api/v1/auth
import express, { Request, Response } from 'express'
import { signUpController } from '../../../controllers/authController/signup'
import { loginController } from '../../../controllers/authController/login'
import expressAsyncHandler from 'express-async-handler'

export const authRouter = express.Router()

authRouter.post('/signup', signUpController)
authRouter.post('/login', loginController)
authRouter.get(
  '/status',
  expressAsyncHandler(async (req: Request, res: Response) => {
    const response: StatusResponse = req.isAuthenticated()
      ? { message: 'Authenticated', user: req.user }
      : { message: 'Not authenticated', user: null }
    res.json(response)
  })
)

interface StatusResponse {
  message: string
  user: Express.User | null
}
