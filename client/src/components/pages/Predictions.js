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
        this.setState({predictionsEntered: true})
      });


  };




  //Calling setPredictions(predictionData); will post predictionData for today's date for current user to mongo
  setPredictions = (predictionData) => {
    
    if (this.state.predictionsEntered){
      
      return
    }
    else{ post('/api/setpredictions', {predictions: predictionData}).then((result) => {
      //console.log(result);
      this.setState({predictionsEntered: true});
      });
    }
  };

  


  render() {
     
    let allPredictionEntries=[]
    //runs everytime a PredictionCriteriaBox is updated by the user's inputs
    const eventhandler = (data) => {
      console.log(data)
    //check that the prediction fields are all filled
      if (data.predicted_winner !== "" && data.predicted_margin !==0){
        const data_home_team = data.home_team
        //see if the game is already in allPredictionEntires
        let found = false;
        for(let i = 0; i < allPredictionEntries.length; i++) {
            if (allPredictionEntries[i].home_team == data_home_team) {
                found = true;
                console.log("found game already exists");
                break;
                }}
        if (found === false){ //if the game wasn't predicted yet, append to list
          console.log("game did not yet exist, pushed new game");
          allPredictionEntries.push(data);
        } else{
          console.log("modifying existing game")
          allPredictionEntries = allPredictionEntries.map(obj => [data].find(o => o.home_team === obj.home_team) || obj);
        }
      console.log(allPredictionEntries)
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
        {this.state.predictionsEntered ? 
          (<h2>You have locked in predictions for the day!</h2>) : (<button onClick={() => {this.setPredictions(this.state.predictionObjects)}} className="Predictions-submitButton">LOCK IN PREDICTIONS</button>)
          }
        
      </>
    );
  }
}

export default Predictions;
