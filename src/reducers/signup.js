const defaultSignupState = {
  signingup: false,
  signupFail: false,
  signupSuccess: false
}

export default function login(state=defaultSignupState, action) {
  switch(action.type) {
    case 'SIGNUP_ATTEMPT':
      return Object.assign({}, state, {
        signingup: true,
        signupFail: false,
        signupSuccess: false
      })
    case 'SIGNUP_FAIL':
      return Object.assign({}, state, {
        signingup: false,
        signupFail: true,
        signupSuccess: false
      })
    case 'SIGNUP_SUCCESS':
      return Object.assign({}, state, {
        signingup: false,
        signupFail: false,
        signupSuccess: true
      })
    default:
      return state;
  }
}