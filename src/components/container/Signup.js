import React, { Component } from 'react';
import UserForm from './UserForm';

export default class Signup extends Component {
  render() {
    return (
      <div>
        <h1>Sign Up!</h1>
        <UserForm />
      </div>
    );
  }
}