import { browserHistory } from 'react-router';
import fetch from 'isomorphic-fetch';

function signupAttempt() {
  return {
    type: 'SIGNUP_ATTEMPT'
  }
}

function signupSuccess(token, username) {
  localStorage.setItem('devBase_user_token', token);
  localStorage.setItem('devBase_username', username);
  return {
    type: 'SIGNUP_SUCCESS'
  }
}

function signupFail() {
  return {
    type: 'SIGNUP_FAIL'
  }
}

export default function signup(userData) {

  return function (dispatch) {
    dispatch(signupAttempt());

    return fetch('/signup', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })
      .then((response) => {
        if (response.status !== 200) {
          throw new Error(response.statusText);
        }

        return response.json();
      })
      .then((data) => {
        dispatch(signupSuccess(data.token, data.username));

        browserHistory('/profile');
      })
      .catch((error) => {
        dispatch(signupFail());
      });
  }
}