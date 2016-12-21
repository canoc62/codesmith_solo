import React, { Component } from 'react';
import axios from 'axios';
import gravatar from 'gravatar';
import StatTable from './StatTable';
//import Game from './../../../server/db/postgres';

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
    this.setState({ profilePhotoLink: gravatar.url('canoc4262@gmail.com', {s: '350', r: 'g', d: '404'}) });
   
    // Game.findAll({
    //   where: {
    //     userId: null
    //   }
    // })
    // .then((result) => {
    //   //console.log('result for Game.findOne:', result);
    //   this.setState({ statsPerGame: result });
    // });
  }
  render() {
    return (
      <div>
        Profile
        <p>User Id: {this.state.userid}</p>
        <img src={this.state.profilePhotoLink} />
        <StatTable statsPerGame={this.state.stats}/>
      </div>
    )
  }
}