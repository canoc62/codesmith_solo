import React, { Component } from 'react';
import StatRow from './StatRow';

export default class StatTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      statsPerGame: []
    }
  }
  componentDidMount() {
    this.setState({ statsPerGame: this.props.statsPerGame });
  }
  render() {
    const statRows = [];

    this.state.statsPerGame.forEach( (game) => {
      let newStatRow = <StatRow 
        opponent={ game.opponent }
        targets={ game.targets }
        completionsAllowed={ game.completionsAllowed }
        yardsAllowed={ game.yardsAllowed }
        tdsGivenUp={ game.tdsGivenUp }
        />  
      statRows.push(newStatRow);
    });

    return (
      <table>
        <tr>
          <th>
            Game
          </th>
          <th>
            Targets
          </th>
          <th>
            Catches Allowed
          </th>
          <th>
            Yards Allowed
          </th>
          <th>
            TD Given Up
          </th>
        </tr>
        { statRows }
      </table>
    );
  }
}