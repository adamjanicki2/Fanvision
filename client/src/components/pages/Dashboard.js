import React, { Component } from "react";
import NextGameCard from "../modules/NextGameCard.js";
import AllTodaysGames from "../modules/AllTodaysGames.js";
import "../../utilities.css";
import "./Dashboard.css";
import { get, post } from "../../utilities.js";


class Dashboard extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {
      today_schedule: null,
      predictionsEntered: false,
    };
  };

  componentDidMount() {
    //check for prediction entry status

    //fetch today's games
    get("/api/todaygames").then((games) => {
      this.setState({
        today_schedule: games[0].games,
      });
      console.log(this.state.today_schedule);
      ;
    })
  };



 


  render() {
    return (
      <>
        <h1>Dashboard</h1>
        <h2>Prediction Status: {this.state.predictionsEntered ? "Complete" : "Incomplete"}</h2>
        <h2>Today's Games</h2>
        <h2>{JSON.stringify(this.state.today_schedule)}</h2>
        <h2>Previous Prediction Results</h2>
      </>
    );
  }
}

export default Dashboard;

       /* <div className="NextGameCard-allGamesContainer">
          <NextGameCard/>
          <NextGameCard/>
          <NextGameCard/>
          <NextGameCard/>
          <NextGameCard/>
          <NextGameCard/>
          <NextGameCard/>
          <NextGameCard/>
          <NextGameCard/>
        </div>*/