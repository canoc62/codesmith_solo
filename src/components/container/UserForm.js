import React,  { Component } from 'react';

export default class UserForm extends Component {
  render() {
    return (
      <div>
        <input type='email' placeholder='email' className='email'/>
        <input type='password' placeholder='password' className='password'/>
        <button type='submit' className='loginBtn'>Log In</button>
      </div>
    )
  }
}