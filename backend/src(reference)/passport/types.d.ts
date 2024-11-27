import { JwtPayload } from 'jsonwebtoken'
import { UserRole } from '../controllers/authController/type'

export interface UserTokenized {
  id: string
  role: UserRole
}

export interface PassportJwtPayload extends UserTokenized, JwtPayload {}
