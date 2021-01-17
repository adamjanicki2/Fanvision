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
    };
  }

  componentDidMount() {
    // remember -- api calls go here!
    get("/api/todaygames").then((games) => {
      this.setState({today_schedule: games[0].games})});
    };
  
  makeEntryElement = (gamesList,predictionCritList) =>{
    
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
        <input type="submit" value="LOCK IN PREDICTIONS" className="Predictions-submitButton"></input>
      </>
    );
  }
}

export default Predictions;
