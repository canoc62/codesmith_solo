import { browserHistory } from 'react-router';
import fetch from 'isomorphic-fetch';

function signupAttempt() {
  return {
    type: 'SIGNUP_ATTEMPT'
  }
}

function signupSuccess() {
  return {
    type: 'SIGNUP_SUCCESS'
  }
}

function signupFail() {
  return {
    type: 'SIGNUP_FAIL'
  }
}