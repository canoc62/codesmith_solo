import React, { Component } from 'react';

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userid: this.props.params.userid
    }
  }
  componentDidMount() {
    console.log('User id from params: this.state.userid');
  }
  render() {
    return (
      <div>
        Profile
        <p>User Id: {this.state.userid}</p>
      </div>
    )
  }
}