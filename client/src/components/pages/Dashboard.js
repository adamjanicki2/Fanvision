import React, { Component } from "react";
import "../../utilities.css";
import "./Dashboard.css";
import { get, post } from "../../utilities.js";
import NextGameCard from "../modules/NextGameCard.js";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {
      today_schedule: [],
      predictionsEntered: false,
    };
  };

  componentDidMount() {
    get("/api/todaygames").then((games) => {
      this.setState({
        today_schedule: games[0].games,
      });
      //console.log(this.state.today_schedule);
      
  });
  };



 


  render() {
    let gamesList = null;
    const hasGames = this.state.today_schedule.length !== 0;
    if (hasGames){
      gamesList = this.state.today_schedule.map((game) => (
          <NextGameCard 
            home_team={game.home_team}
            away_team={game.away_team}
            start_time={game.start_time}
          />
      ));
    }
    else{
      gamesList = <div>No Games today!</div>;
    }
    return (
      <>
        <h1>Dashboard</h1>
        <div className="u-inlineBlock">
          <h2 className="u-inlineBlock">Prediction Status: </h2>
          {this.state.predictionsEntered ? 
          (<h2 className="u-inlineBlock CompleteGreen">Complete</h2>) : (<h2 className="u-inlineBlock IncompleteRed">Incomplete</h2>)
          }
        </div>

        <h2>Today's Games</h2>
        {gamesList}
        <h2>Previous Prediction Results</h2>
      </>
    );
  }
}

export default Dashboard;
