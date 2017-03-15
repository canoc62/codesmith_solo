import { browserHistory } from 'react-router';
import fetch from 'isomorphic-fetch';

function signupAttempt() {
  return {
    type: 'SIGNUP_ATTEMPT'
  }
}

function signupSuccess(token, username) {
  localStorage.setItem('solo_project_user_token', token);
  localStorage.setItem('solo_project_username', username);
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
        console.log('SIGNUP SUCCESS, show data:', data);
        dispatch(signupSuccess(data.token, data.username));
        browserHistory.push('/profile');
      })
      .catch((error) => {
        console.log('SIGNUP FAIL error:', error);
        dispatch(signupFail());
      });
  }
}