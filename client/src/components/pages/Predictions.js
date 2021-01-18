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
      predictionObjects: [],
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
      // console.log("prediction:"+prediction)
      if (prediction.length !== 0){
        this.setState({predictionsEntered: true})
        }
      });
  };



  //TODO: fetches all content in PredictionCriteraBox Components and posts them to backend
  postPredictions = () => {
    

  };
  //Calling setPredictions(predictionData); will post predictionData for today's date for current user to mongo
  setPredictions = (predictionData) => {
    post('/api/setpredictions', predictionData).then((result) => {
      console.log(result);
    });
  };

  


  render() {
    //make predictionsList with incomplete prediction objects
    const home_teams = this.state.today_schedule.map((game) => (game.home_team)); //list of home_teams playing today (indices line up)
    const away_teams = this.state.today_schedule.map((game) => (game.away_team)); //list of home_teams playing today
    let predictionsList = [];
    for (let i=0; i<home_teams.length; i++){
      predictionsList.push({
        home_team: home_teams[i], 
        away_team: away_teams[i],
        predicted_winner: "",
        predicted_margin: 0,
      }
      );
    }

    console.log("PREDICTIONS LIST:"+predictionsList)
    
    //runs everytime a PredictionCriteriaBox is updated by the user's inputs
    const eventhandler = (data) => {
    //check that the prediction fields are all filled
      if (data.predicted_winner !== "" && data.predicted_margin !==0){
        console.log(data)
        //replace the old prediction with the new one
      //   let obj = predictionsList.find((prediction, index) => {
      //     if (prediction.home_team === data.home_team) {
      //         predictionsList[index] = { 
      //           home_team: data.home_team, 
      //           away_team: data.away_team, 
      //           predicted_winner: data.predicted_winner,
      //           predicted_margin: data.predicted_margin
      //         }
      //         return true; // stop searching
      //     }
      // });
    
    }
    
  }

    //make list of NextGameCards for today's games
    let gamesList = null;
    //also make list of PredictionCriteriaBoxes for today's games
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
          onChange={eventhandler}
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
    for (let i=0;i<gamesList.length;i++){
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
