import passport from 'passport'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import { JWT_SECRET } from '../constants'
import { PassportJwtPayload } from './types'

export const initializeJwtStrategy = (): void => {
  passport.use(
    'jwt',
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: JWT_SECRET
      },
      async (payload: PassportJwtPayload, done) => {
        // Verify the JWT payload and call the 'done' callback
        // with the user object or an error
        try {
          return done(null, payload)
        } catch (error) {
          console.error(error)
          return done(null, false, { message: 'Unauthorized' })
        }
      }
    )
  )
}
