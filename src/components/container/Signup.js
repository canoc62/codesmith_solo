import React, { Component } from 'react';
import SignupFormContainer from './SignupFormContainer';

export default class Signup extends Component {
  render() {
    return (
      <div>
        <h1>Sign Up!</h1>

        <SignupFormContainer />
      </div>
    );
  }
}