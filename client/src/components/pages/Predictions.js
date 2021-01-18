import React, { Component } from "react";
import NextGameCard from "../modules/NextGameCard.js";
import PredictionCriteriaBox from "../modules/PredictionCriteriaBox.js";
import "../../utilities.css";
import "./Predictions.css";
import { get, post } from "../../utilities.js";



class Predictions extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {
      today_schedule: [],
      user_id: null,
      predictionsEntered: false,
    };
  }

  componentDidMount() {
 
    //call api to get today's games
    get("/api/todaygames").then((games) => {
      this.setState({today_schedule: games[0].games})});

    //call api to get user id
    get("/api/whoami").then((user) => {
      this.setState({user_id: user._id});
    });

    //call api to check if user has already predicted today's games
    const moment = require('moment');
    require('moment-timezone');
    let today = Date();
    const today_str = moment(today).tz("America/New_York").format("YYYY-MM-DD");
    get('/api/getprediction', {date: today_str}).then((prediction) => {
      console.log("prediction:"+prediction)
      if (prediction.length !== 0){
        this.setState({predictionsEntered: true})
        }
      });
  };



  //TODO: fetches all content in PredictionCriteraBox Components and posts them to backend
  postPredictions() {
    console.log("you clicked the button amazing");
  };

  

  render() {

    //make list of NextGameCards for today's games
    //also make list of PredictionCriteriaBoxes for today's games
    let gamesList = null;
    let predictionCritList = null;
    const hasGames = this.state.today_schedule.length !== 0;
    if (hasGames){
      gamesList = this.state.today_schedule.map((game) => (
          <NextGameCard 
            home_team={game.home_team}
            away_team={game.away_team}
            start_time={game.start_time}
          />
      ));
      predictionCritList = this.state.today_schedule.map((game) => (
        <PredictionCriteriaBox
          home_team={game.home_team}
          away_team={game.away_team}
        />
    ));
    }
    else{
      predictionCritList = null
      gamesList = <div>No Games Today :(</div>;
      return (
        <>{gamesList}</>
        )
    };

    //list of items that are combination of the matchup and the input boxes
    let gameEntryVisualList= [];
    for (let i=1;i<gamesList.length+1;i++){
      gameEntryVisualList.push(<div className="Predictions-item">{gamesList[i]}{predictionCritList[i]}</div>)
    }

    return (
      <>
        <h1>Prediction Entry</h1>
        <div className = "NextGameCard-allGamesContainer">  
        {gameEntryVisualList}
        </div>
        <button onClick={this.postPredictions} disabled={this.state.predictionsEntered} className="Predictions-submitButton">LOCK IN PREDICTIONS</button>
      </>
    );
  }
}

export default Predictions;
