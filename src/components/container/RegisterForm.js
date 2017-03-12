import React,  { Component } from 'react';
import { connect } from 'react-redux';
import RegisterForm from './../presentational/AuthForm';

//import login from './../../actions/login';

class RegisterForm extends Component {
  constructor() {
    super();

    this.state = {
      username: '',
      password: ''
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
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
  handleClick(e) {
    const username = this.state.username;
    const password = this.state.password;
    this.props.dispatch(login({
      username,
      password
    }));
  }
  render() {
    return (
      //change to another auth form
      <RegisterForm 
        username={ this.state.username }
        password={ this.state.password }
        handleClick={ this.handleClick }
        handleUsernameChange={ this.handleUsernameChange }
        handlePasswordChange={ this.handlePasswordChange }
        btnText={'Register'}
      />
    )
  }
}

export default connect()(RegisterForm);