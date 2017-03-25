import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import gravatar from 'gravatar';
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

    const sessionToken = localStorage.getItem('devBase_user_token');
    // const sessionUsername = this.props.params.username;
    // const sessionData = { 
    //   sessionUsername: sessionUsername,
    //   sessionToken: sessionToken
    // };

    if (!sessionToken) {
      console.log('Pushing back to home!');
      browserHistory.push('/');
    }
    //this.refresher = setInterval(this.refreshSession,20000)
    // else {
    //   this.setState({ profilePhotoLink: gravatar.url('canoc4262@gmail.com', {s: '350', r: 'g', d: '404'}) });

    //   axios.get('http://localhost:8080/player-stats')
    //     .then((response) => {
    //       console.log('response from GET to database', response);
    //       this.setState({ statsPerGame: response })
    //     });
    // }
    else {
      console.log('about to fetch, session data', sessionToken);
       fetch('/check-session', {
        method: 'get',
        headers: {
          // 'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + sessionToken
        }
        //,body: JSON.stringify(sessionData)
      })
        .then((response) => {
          if (response.status !== 200) {
            console.log( 'FETCH ERROR from PROFILE component!');
            throw new Error(response.statusText);
          }

          console.log( 'before FETCH return from PROFILE component!');
          return response.json();
        })
        .then((data) => {
          // console.log('SIGNUP SUCCESS, show data:', data);
          // dispatch(signupSuccess(data.token, data.username));
          // browserHistory.push('/profile');

          console.log('Session Success!');


          this.setState({ profilePhotoLink: gravatar.url('canoc4262@gmail.com', {s: '350', r: 'g', d: '404'}) });

          // axios.get('http://localhost:8080/player-stats')
          //   .then((response) => {
          //     console.log('response from GET to database', response);
          //     this.setState({ statsPerGame: response })
          //   });
        })
        .catch((error) => {
          console.log('SIGNUP FAIL error:', error);
          // dispatch(signupFail());
          console.log('Session fail, back to home page!');
          browserHistory.push('/');
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
        <p>Username: {this.props.params.username}</p>
        <img src={this.state.profilePhotoLink} />
      </div>
    )
  }
}