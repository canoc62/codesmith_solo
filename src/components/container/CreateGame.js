import React, { Component } from 'react';
import axios from 'axios';

export default class CreateGame extends Component {
  constructor() {
    super();

    this.state = {
      opponent: '',
      targets: '',
      completionsAllowed: '',
      yardsAllowed: '',
      tdsGivenUp: ''
    }
    this.handleOpponentChange = this.handleOpponentChange.bind(this);
    this.handleTargetsChange = this.handleTargetsChange.bind(this);
    this.handleCompletionsAllowedChange = this.handleCompletionsAllowedChange.bind(this);
    this.handleYardsAllowedChange = this.handleYardsAllowedChange.bind(this);
    this.handleTDsGivenUpChange = this.handleTDsGivenUpChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  handleOpponentChange(e) {
    this.setState({
      opponent: e.target.value
    });
  }
  handleTargetsChange(e) {
    this.setState({
      targets: e.target.value
    });
  }
  handleCompletionsAllowedChange(e) {
    this.setState({
      completionsAllowed: e.target.value
    });
  }
  handleYardsAllowedChange(e) {
    this.setState({
      yardsAllowed: e.target.value
    });
  }
  handleTDsGivenUpChange(e) {
    this.setState({
      tdsGivenUp: e.target.value
    });
  }
  handleClick(e) {
    e.preventDefault();
    console.log('this.state: ', this.state);
    axios({
      method: 'post',
      url: '/create-game', 
      data: {
        opponent: this.state.opponent,
        targets: this.state.targets,
        completionsAllowed: this.state.completionsAllowed,
        yardsAllowed: this.state.yardsAllowed,
        tdsGivenUp: this.state.tdsGiven
    }})
      .then((res) => {console.log('res', res)})
      .catch((err) => {console.log('err:', err)});
    //this.setState({ username: '', password: '' });
  }
  render() {
    return (
      <div>
        <input type='text' placeholder='Opponent' value={ this.state.opponent } onChange={ this.handleOpponentChange } className='opponentInput'/>
        <input type='text' placeholder='Targets' value={ this.state.targets } onChange={ this.handleTargetsChange } className='targetsInput'/>
        <input type='text' placeholder='Completions Allowed' value={ this.state.completionsAllowed } onChange={ this.handleCompletionsAllowedChange } className='completionsAllowedInput'/>
        <input type='text' placeholder='Yards Allowed' value={ this.state.yardsAllowed } onChange={ this.handleYardsAllowedChange } className='YardsAllowedInput'/>
        <input type='text' placeholder='TDs Given Up' value={ this.state.tdsGivenUp } onChange={ this.handleTDsGivenUpChange } className='TDsGivenUpInput'/>
        <button type='button' className='createGameBtn' onClick={ this.handleClick }>{ "Add Game" }</button>
      </div>
    )
  }
}