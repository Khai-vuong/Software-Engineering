import passport from 'passport'
import { Request } from 'express'
import { Strategy as LocalStrategy } from 'passport-local'
import bcryptjs from 'bcryptjs'
import { createSPSO } from '../model/SPSO'

export function initializeSpsoSignUp(): void {
  passport.use(
    'spsosignup',
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
      },
      async (req: Request, email: string, password: string, done) => {
        try {
          if (!email || !password) {
            return done(null, false, { message: 'Missing required fields' })
          }

          const hashPassword = await bcryptjs.hash(password, 10)
          const user = await createSPSO({
            email: email,
            password: hashPassword,
            name: req.body.name
          })

          return done(null, user)
        } catch (error) {
          if (error instanceof Error) {
            return done(null, false, { message: error.message })
          }
          console.error(error)
          return done(error)
        }
      }
    )
  )
}
