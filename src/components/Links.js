import React, { Component } from 'react'
import { Link } from 'react-router';

export default class Links extends Component {
  render() {
    return (
      <nav>
        <Link to='/'>Home</Link>
        <Link to='/signup'>Sign Up</Link>
        <Link to='/profile'>Profile</Link>
      </nav>
    )
  }
}