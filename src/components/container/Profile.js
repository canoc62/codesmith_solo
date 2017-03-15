import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import gravatar from 'gravatar';
import StatTable from './StatTable';
import axios from 'axios';

//import refreshSession from './../actions/refreshSession';

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userid: this.props.params.userid,
      profilePhotoLink: '',
      statsPerGame: []
    }
  }
  componentDidMount() {

    console.log('local storage solo_project_user_token:', localStorage.getItem('solo_project_user_token'));
    if (!localStorage.getItem('solo_project_user_token')) {
      browserHistory.push('/');
    }
    //this.refresher = setInterval(this.refreshSession,20000)
    else {
      this.setState({ profilePhotoLink: gravatar.url('canoc4262@gmail.com', {s: '350', r: 'g', d: '404'}) });

      axios.get('http://localhost:8080/player-stats')
        .then((response) => {
          console.log('response from GET to database', response);
          this.setState({ statsPerGame: response })
        });
    }
  }
  // componentWillUnmount() {
  //   clearInterval(this.refresher);
  // }
  render() {
    return (
      <div>
        Profile
        <p>User Id: {this.state.userid}</p>
        <img src={this.state.profilePhotoLink} />
        <StatTable statsPerGame={this.state.statsPerGame}/>
      </div>
    )
  }
}