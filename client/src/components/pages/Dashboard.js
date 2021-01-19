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
      user_id: null,
      today_schedule: [],
      yesterday_results: [],
      yesterday_predictions: [],
      predictionsEntered: false,
    };
  };

  componentDidMount() {

    //call api to get today's games
    get("/api/todaygames").then((games) => {
      this.setState({
        today_schedule: games[0].games,
      });
     
    //call api to get yesterday's game scores/results
    get("/api/yesterdayresults").then((results) => {
      this.setState({yesterday_results: results[0].games,})
    });

    //call api to get user id
    get("/api/whoami").then((user) => {
      this.setState({user_id: user._id,})
    });

    
    get('/api/gettodaypredictions').then((prediction) => {
      console.log(prediction);
      if (prediction.length !== 0){
        console.log("changing predictionsEntered to true")
         this.setState({predictionsEntered: true});
    }});
  });
  };

  //TODO determine how many points the user earned
  awardPoints () {
    return 69;
  }

 


  render() {

    // const predictionsList = this.state.yesterday_predictions;
    //hardcoded predictions list for now
    const predictionsList = [{
      home_team: "SAS",
      away_team: "HOU",
      predicted_winner: "SAS",
      predicted_margin: 19,

    },
    {
      home_team: "BKN",
      away_team: "ORL",
      predicted_winner: "BKN",
      predicted_margin: 11,
    },
    {
      home_team: "TOR",
      away_team: "CHA",
      predicted_winner: "TOR",
      predicted_margin: 17,
    },
    {
      home_team: "MEM",
      away_team: "PHI",
      predicted_winner: "MEM",
      predicted_margin: 3,
    },
    {
      home_team: "MIA",
      away_team: "DET",
      predicted_winner: "MIA",
      predicted_margin: 8,
    },
    {
      home_team: "POR",
      away_team: "ATL",
      predicted_winner: "POR",
      predicted_margin: 1,
    }];

    
    
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
    let resultsList = [];
    const hadGames = this.state.yesterday_results.length !== 0;
    if (hadGames){
      for (let i=0;i<this.state.yesterday_results.length;i++){
        let result = this.state.yesterday_results;
        resultsList.push(
          <ResultGameCard
            home_team={result[i].home_team}
            away_team={result[i].away_team}
            start_time={result[i].start_time}
            home_team_score={result[i].home_team_score}
            away_team_score={result[i].away_team_score}
            predicted_winner={predictionsList[i].predicted_winner}
            predicted_margin={predictionsList[i].predicted_margin}
            points_earned={this.awardPoints()}
          />
        );
      };

    }
    else{
      resultsList = <div>No Games Yesterday :(</div>;
    }
    console.log(this.state.predictionsEntered);
    let html_to_display = true ? (
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
    ) : (<h2>Please log in to display dashboard!</h2>);
    return html_to_display;
  }
}

export default Dashboard;
