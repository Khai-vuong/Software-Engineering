import { SPSO, Student } from '@prisma/client'

type StudentWithoutPassword = Omit<Student, 'password'>
type SpsoWithoutPassword = Omit<SPSO, 'password'>
interface LogInResponse {
  token: string
  student: StudentWithoutPassword
}
interface SignUpResponse {
  message: string
  student: StudentWithoutPassword
}
interface SpsoLogInResponse {
  token: string
  spso: SpsoWithoutPassword
}
interface SpsoSignUpResponse {
  message: string
  spso: SpsoWithoutPassword
}
type UserRole = 'STUDENT' | 'SPSO'
