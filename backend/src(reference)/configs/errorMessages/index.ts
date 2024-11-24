import AUTHENTICATION_ERROR_MESSAGES from './auth'
import USER_ERROR_MESSAGES from './user'

const ERROR_MESSAGES = {
  auth: AUTHENTICATION_ERROR_MESSAGES,
  user: USER_ERROR_MESSAGES,
  other: {
    invalidInput: 'Invalid input',
    invalidUser: 'Invalid user',
    invalidId: 'Invalid id',
    missingId: 'Id is required'
  }
}

export default ERROR_MESSAGES
