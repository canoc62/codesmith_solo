import React,  { Component } from 'react';
import { connect } from 'react-redux';
import SignupForm from './../presentational/SignupFormContainer';

import signup from './../../actions/signup';

class SignupFormContainer extends Component {
  constructor() {
    super();

    this.state = {
      username: '',
      password: '',
      passwordConfirm,
      email: ''
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
    this.props.dispatch(signup({
      username,
      password,
      email,
    }));
  }
  render() {
    return (
      //change to another auth form
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
  }
}

export default connect()(SignupFormContainer);