import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import bcryptjs from 'bcryptjs'
import { getStudentByUsername } from '../model/Student'

export const initializeLogin = (): void => {
  passport.use(
    'login',
    new LocalStrategy(
      {
        usernameField: 'username',
        passwordField: 'password'
      },
      async (username, password, done): Promise<void> => {
        // Verify the user's credentials and call the 'done' callback
        // with the user object or an error
        try {
          const user = await getStudentByUsername(username)

          if (!user) {
            return done(null, false, { message: 'User not found' })
          }

          if (bcryptjs.compareSync(password, user.password)) {
            return done(null, user)
          } else {
            return done(null, false, { message: 'Incorrect password' }) /*  */
          }
        } catch (error) {
          console.error(error)
          return done(error)
        }
      }
    )
  )
}
