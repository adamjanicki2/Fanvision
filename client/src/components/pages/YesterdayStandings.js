import React, { Component } from "react";

import "../../utilities.css";
import "./YesterdayStandings.css";



class YesterdayStandings extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {};
  }

  componentDidMount() {
    // remember -- api calls go here!
  }

  render() {
    return (
      <>
        <h1>Temp Standings Page</h1>
        <h2>This is so users can see results from only the day before</h2>
      </>
    );
  }
}

export default YesterdayStandings;
