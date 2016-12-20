import React, { Component } from 'react';
import axios from 'axios';
import gravatar from 'gravatar';

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userid: this.props.params.userid,
      profilePhotoLink: ''
    }
  }
  componentDidMount() {
    console.log('User id from params: this.state.userid');
    this.setState({ profilePhotoLink: gravatar.url('canoc4262@gmail.com', {s: '350', r: 'g', d: '404'}) });
  }
  render() {
    return (
      <div>
        Profile
        <p>User Id: {this.state.userid}</p>
        <img src={this.state.profilePhotoLink} />
      </div>
    )
  }
}