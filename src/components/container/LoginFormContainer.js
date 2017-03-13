import React,  { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import LoginForm from './../presentational/LoginForm';

import login from './../../actions/login';

class LoginFormContainer extends Component {
  constructor() {
    super();

    this.state = {
      username: '',
      password: ''
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    //this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }
  handleUsernameChange(e) {
    this.setState({
      username: e.target.value
    });
  }
  // handleEmailChange(e) {
  //   this.setState({
  //     email: e.target.value
  //   });
  // }
  handlePasswordChange(e) {
    this.setState({
      password: e.target.value
    });
  }
  handleClick(e) {
    // e.preventDefault();
    // console.log('this.state: ', this.state);
    // axios({
    //   method: 'post',
    //   url: '/login', 
    //   data: {
    //   username: this.state.username, 
    //   email: this.state.email,
    //   password: this.state.password 
    // }})
    //   .then((res) => {console.log('res', res)})
    //   .catch((err) => {console.log('err:', err)});
    // //this.setState({ username: '', password: '' });
    const username = this.state.username;
    const password = this.state.password;
    this.props.dispatch(login({
      username,
      password
    }));
  }
  render() {
    return (
      <LoginForm 
        username={ this.state.username }
        password={ this.state.password }
        handleClick={ this.handleClick }
        handleUsernameChange={ this.handleUsernameChange }
        handlePasswordChange={ this.handlePasswordChange }
        btnText={'Log In'}
      />
    )
  }
}

export default connect()(LoginFormContainer);