import { browserHistory } from 'react-router';
import fetch from 'isomorphic-fetch';

function loginAttempt() {
  return {
    type: 'LOGIN_ATTEMPT'
  }
}

function loginSuccess(token, username) {
  localStorage.setItem('solo_project_user_token', token);
  localStorage.setItem('solo_project_username', username);
  console.log("LOCAL STORAGE:", localStorage);
  return {
    type: 'LOGIN_SUCCESS'
  }
}

function loginFail() {
  return {
    type: 'LOGIN_FAIL'
  }
}

export default function login(userData) {

  return function(dispatch) {
    dispatch(loginAttempt());

    return fetch('/login',{
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })
      .then((response) => {
        if (response.status !== 200) {
          console.log('ERRROORRR not 200, it is:', response.status);
          throw new Error(response.statusText);
        }
        console.log('response:', response);
        return response.json();
      })
      .then((data) => {
        console.log('HELLLo before going to profile, show data:', data);
        console.log('HEEELOOOOO', data.username);
        dispatch(loginSuccess(data.token, data.username));
        browserHistory.push('/profile/' + data.username);
        console.log('Browser pushed to profile!!!');
      })
      .catch((error) => {
        console.log('Hello fail!');
        console.log('Error:', error);
        dispatch(loginFail());
      });
  }
}