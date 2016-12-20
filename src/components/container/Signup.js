import React, { Component } from 'react';
import SignupForm from './SignupForm';

export default class Signup extends Component {
  render() {
    return (
      <div>
        <h1>Sign Up!</h1>
        <SignupForm />
      </div>
    );
  }
}