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

    get("/api/getyesterdaypredictions").then((prediction) => {
      console.log("yesterday's prediction" + prediction[0].todays_predictions);
      this.setState({yesterday_predictions: prediction[0].todays_predictions});
    });
    
    get('/api/gettodaypredictions').then((prediction) => {
      // console.log(prediction);
      if (prediction.length !== 0){
        console.log("changing predictionsEntered to true")
         this.setState({predictionsEntered: true});
    }});
  });
  };

  //TODO determine how many points the user earned
  awardPoints (actual_margin, predicted_margin, correct_guess) {
    if (!correct_guess){
      return 0;
    }
    if (actual_margin === predicted_margin){
      //Take care of zero division error
      return Math.round(1.2*actual_margin);
    }
    //find relative error:
    const relative_error = Math.abs(actual_margin - predicted_margin)/actual_margin;
    return Math.round(1/relative_error);
  }

 


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
    let resultsList = [];
    const hadGames = this.state.yesterday_results.length !== 0;
    if (hadGames){
      for (let i=0;i<this.state.yesterday_results.length;i++){
        let result = this.state.yesterday_results;
        let home_team = result[i].home_team;
        console.log(home_team)
        //find the corresponding prediction object from yesterday
        let matchingPrediction = this.state.yesterday_predictions.filter(obj => {return obj.home_team === home_team})[0];
        console.log(matchingPrediction)
        console.log('------')
        const actual_margin = Math.abs(result[i].home_team_score - result[i].away_team_score);
        const margin_predicted = this.state.yesterday_predictions.length-1>=i ? matchingPrediction.predicted_margin : -1;
        const winner_predicted = this.state.yesterday_predictions.length-1>=i ? matchingPrediction.predicted_winner : '';
        const game_winner = result[i].away_team_score < result[i].home_team_score ? result[i].home_team : result[i].away_team;
        const correct_guess = winner_predicted === game_winner;
        resultsList.push(
          <ResultGameCard
            home_team={result[i].home_team}
            away_team={result[i].away_team}
            start_time={result[i].start_time}
            home_team_score={result[i].home_team_score}
            away_team_score={result[i].away_team_score}
            predicted_winner={this.state.yesterday_predictions.length-1>=i ? matchingPrediction.predicted_winner : '--'}
            predicted_margin={this.state.yesterday_predictions.length-1>=i ? matchingPrediction.predicted_margin : '--'}
            points_earned={this.awardPoints(actual_margin, margin_predicted, correct_guess)}
          />
        );
      };

    }
    else{
      resultsList = <div>No Games Yesterday :(</div>;
    }
    let html_to_display = this.state.user_id ? (
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
