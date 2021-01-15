import React, { Component } from "react";
import NextGameCard from "../modules/NextGameCard.js";
import "../../utilities.css";
import "./Dashboard.css";
import { get, post } from "../../utilities.js";


class Dashboard extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {
      name: '',
      predictionsEntered: false,
    };
  };

  componentDidMount() {
    //check for prediction entry status
  }

  // function getPredictionStatus(this){
  //   if (this.state.predictionsEntered === false){
  //     return "Incomplete";
  //   }
  //   return "Complete";
  // };


  render() {
    return (
      <>
        <h1>Dashboard</h1>
        <h2>Prediction Status: {this.state.predictionsEntered ? "Complete" : "Incomplete"}</h2>
        <h2>Upcoming Games</h2>
        <div className="NextGameCard-allGamesContainer">
          <NextGameCard/>
          <NextGameCard/>
          <NextGameCard/>
          <NextGameCard/>
          <NextGameCard/>
          <NextGameCard/>
          <NextGameCard/>
          <NextGameCard/>
          <NextGameCard/>
        </div>
        <h2>Previous Prediction Results</h2>
      </>
    );
  }
}

export default Dashboard;
