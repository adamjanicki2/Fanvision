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

  render() {
    return (
      <>
        <h1>Temp Standings Page</h1>
        <h2>Hello World</h2>
      </>
    );
  }
}

export default OverallStandings;
