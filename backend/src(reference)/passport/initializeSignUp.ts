import passport from 'passport'
import { Request } from 'express'
import { Strategy as LocalStrategy } from 'passport-local'
import bcryptjs from 'bcryptjs'
import { createStudent } from '../model/Student'

export function initializeSignUp(): void {
  passport.use(
    'signup',
    new LocalStrategy(
      {
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
      },
      async (req: Request, username: string, password: string, done) => {
        try {
          if (!username || !password) {
            return done(null, false, { message: 'Missing required fields' })
          }

          const hashPassword = await bcryptjs.hash(password, 10)
          const user = await createStudent({
            username,
            password: hashPassword,
            printBalance: 0,
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
