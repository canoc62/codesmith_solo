import React,  { Component } from 'react';
import axios from 'axios';
import AuthForm from './../presentational/AuthForm';

export default class LoginForm extends Component {
  constructor() {
    super();

    this.state = {
      username: '',
      password: ''
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }
  handleUsernameChange(e) {
    this.setState({
      username: e.target.value
    });
  }
  handlePasswordChange(e) {
    this.setState({
      password: e.target.value
    });
  }
  handleClick(e) {
    e.preventDefault();
    console.log('this.state: ', this.state);
    axios({
      method: 'post',
      url: '/', 
      data: {
      username: this.state.username, 
      password: this.state.password 
    }})
      .then((res) => {console.log('res', res)})
      .catch((err) => {console.log('err:', err)});
    //this.setState({ username: '', password: '' });
  }
  render() {
    return (
      <AuthForm 
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