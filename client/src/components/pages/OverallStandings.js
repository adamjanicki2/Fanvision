import React, { Component } from "react";

import "../../utilities.css";
import "./OverallStandings.css";



class OverallStandings extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {};
  }

  componentDidMount() {
    // remember -- api calls go here!
  }

  makeStandingsTable = () => { //table hard coded for now
  
  }

  render() {
    return (
      <>
        <h1>2020-2021 NBA Season Player Standings</h1>
        <table>
        <tbody>
        <tr>
          <th>Rank</th>
          <th>Player Name</th>
          <th>Total Points</th>
          <th>Accolades</th>
        </tr>
        <tr>
          <td>1</td>
          <td>Billy Bob</td>
          <td>150</td>
          <td>1 Gold</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Jimmy John</td>
          <td>94</td>
          <td>1 Silver</td>
        </tr>
        </tbody>
      </table>
      </>
    );
  }
}

export default OverallStandings;
