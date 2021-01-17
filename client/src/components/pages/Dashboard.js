import React, { Component } from "react";
import "../../utilities.css";
import "./Dashboard.css";
import { get, post } from "../../utilities.js";
import NextGameCard from "../modules/NextGameCard.js";
import ResultGameCard from "../modules/ResultGameCard.js";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {
      today_schedule: [],
      yesterday_results: [],
      predictionsEntered: false,
    };
  };

  componentDidMount() {
    get("/api/todaygames").then((games) => {
      this.setState({
        today_schedule: games[0].games,
      });
     
    get("/api/yesterdayresults").then((results) => {
      // console.log(results[0].games);
      this.setState({yesterday_results: results[0].games,})
    });
  });
  };



 


  render() {

    
    //make list of games for today's games
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
      gamesList = <div>No Games Today :(</div>;
    }

    //make list of game results for yesterday's games
    let resultsList = null;
    const hadGames = this.state.yesterday_results.length !== 0;
    if (hadGames){
      resultsList = this.state.yesterday_results.map((result) => (
          <ResultGameCard
            home_team={result.home_team}
            away_team={result.away_team}
            start_time={result.start_time}
            home_team_score={result.home_team_score}
            away_team_score={result.away_team_score}
          />
      ));
    }
    else{
      resultsList = <div>No Games Yesterday :(</div>;
    }

    return (
      <>
        <h1>Dashboard</h1>
        <div className="u-inlineBlock">
          <h2 className="u-inlineBlock">Prediction Entry Status: </h2>
          {this.state.predictionsEntered ? 
          (<h2 className="u-inlineBlock CompleteGreen">Complete</h2>) : (<h2 className="u-inlineBlock IncompleteRed">Incomplete</h2>)
          }
        </div>

        <h2>Today's Games</h2>
        <div className = "NextGameCard-allGamesContainer">{gamesList}</div>
        <h2>Yesterday's Results</h2>
        <div className = "ResultGameCard-allGamesContainer">{resultsList}</div>
      </>
    );
  }
}

export default Dashboard;
