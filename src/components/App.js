import React, { Component } from 'react';
import Links from './Links';

export default class App extends Component {
 
  render() {
    return (
      <div>
        <h1>
          Corner Zone
        </h1>
        <Links />
        {this.props.children}
      </div>
    );
  }
}