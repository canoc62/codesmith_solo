import React,  { Component } from 'react';
import SignupForm from './../presentational/SignupForm';
import PasswordMismatch from './../presentational/PasswordMismatch';

import signup from './../../actions/signup';

export default class SignupFormContainer extends Component {
  constructor() {
    super();

    this.state = {
      username: '',
      password: '',
      passwordConfirm: '',
      email: '',
      passwordMismatch: false
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handlePasswordConfirmChange = this.handlePasswordConfirmChange.bind(this);
  }
  handleUsernameChange(e) {
    this.setState({
      username: e.target.value
    });
  }
  handleEmailChange(e) {
    this.setState({
      email: e.target.value
    });
  }
  handlePasswordChange(e) {
    this.setState({
      password: e.target.value
    });
  }
  handlePasswordConfirmChange(e) {
    this.setState({
      passwordConfirm: e.target.value
    });
  }
  handleClick(e) {
    const username = this.state.username;
    const password = this.state.password;
    const passwordConfirm = this.state.passwordConfirm;
    const email = this.state.email;

    if (password === passwordConfirm) {
      this.setState({ passwordMismatch: false }, () => {
        this.props.dispatch(signup({
          username,
          password,
          passwordConfirm,
          email,
        }));
      });
      // this.props.dispatch(signup({
      //   username,
      //   password,
      //   passwordConfirm,
      //   email,
      // }));
    } else {
      this.setState({ passwordMismatch: true });
    }
  }
  render() {

    if (!this.state.passwordMismatch) {

      return (
        <SignupForm 
          username={ this.state.username }
          password={ this.state.password }
          passwordConfirm={ this.state.passwordConfirm }
          email={ this.state.email }
          handleClick={ this.handleClick }
          handleUsernameChange={ this.handleUsernameChange }
          handlePasswordChange={ this.handlePasswordChange }
          handlePasswordConfirmChange={ this.handlePasswordConfirmChange }
          handleEmailChange={ this.handleEmailChange }
          btnText={'Sign Up'}
        />
      )
    } else {
      return (
        <div>
          <PasswordMismatch />
          <SignupForm 
            username={ this.state.username }
            password={ this.state.password }
            passwordConfirm={ this.state.passwordConfirm }
            email={ this.state.email }
            handleClick={ this.handleClick }
            handleUsernameChange={ this.handleUsernameChange }
            handlePasswordChange={ this.handlePasswordChange }
            handlePasswordConfirmChange={ this.handlePasswordConfirmChange }
            handleEmailChange={ this.handleEmailChange }
            btnText={'Sign Up'}
          />
        </div>
      )
    }
  }
}