import React, { Component } from 'react';
import Links from './Links';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      loggedIn: false
    }
  }
 
  render() {
    return (
      <div>
        <Links />
        {this.props.children}
      </div>
    );
  }
}