import React, { Component } from 'react';
import LoginFormContainer from './LoginFormContainer';

export default class Home extends Component {
  render() {
    return (
      <div>
        Home
        <LoginFormContainer />
      </div>
    )
  }
}