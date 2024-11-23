import { initializeJwtStrategy } from './initializeJwtStrategy'
import { initializeLogin } from './initializeLogin'
import { initializeSignUp } from './initializeSignUp'
import { initializeSpsoLogin } from './initializeSpsoLogin'
import { initializeSpsoSignUp } from './initializeSpsoSignUp'

export default function initializePassport() {
  initializeJwtStrategy()
  initializeLogin()
  initializeSignUp()
  initializeSpsoLogin()
  initializeSpsoSignUp()
}
