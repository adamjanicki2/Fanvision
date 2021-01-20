import React, { Component } from "react";
import NextGameCard from "../modules/NextGameCard.js";
import PredictionCriteriaBox from "../modules/PredictionCriteriaBox.js";
import "../../utilities.css";
import "./Predictions.css";
import { get, post } from "../../utilities.js";
import Popup from "reactjs-popup";
import TodayPredictionCard from "../modules/TodayPredictionCard.js";
const moment = require('moment');
require('moment-timezone');



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
    get('/api/gettodaypredictions').then((prediction) => {
      if (prediction.length !== 0){
        this.setState({
          predictionObjects: prediction[0].todays_predictions,
          });
    }   
   });
  };




  //Calling setPredictions(predictionData); will post predictionData for today's date for current user to mongo
  setPredictions = (predictionData) => {
    console.log(predictionData);
    if(predictionData.length<this.state.today_schedule.length){
      window.alert("Predictions not Complete!")
      return
    };
    if(window.confirm('To Confirm Predictions, click OK:')){
      console.log('PRINTING PREDICTION DATA:')
      console.log(predictionData);
      if (this.state.predictionsEntered){
        return
      }
      else{ post('/api/setpredictions', {predictions: predictionData}).then((result) => {
        //console.log(result);
        this.setState({
          predictionsEntered: true,
          predictionObjects: predictionData,
        });
        });
      }
      window.location.reload() //refresh the page after clicking button and posting prediction
  }};

  //Calling savePredictions(predictionData); will post predictionData for today's date for current user to mongo without locking in
  savePredictions = (predictionData) => {
    if (this.state.predictionsEntered){
      return
    }

    //check if there is already a saved prediction. if there is delete it first before posting new one
    if (this.state.predictionObjects.length!==0){
      let today = Date(); //this line is working
      const today_str = moment(today).tz("America/New_York").format("YYYY-MM-DD");    
      post('/api/deletesavedprediction', {date:today_str}).then((result) => {
        console.log("deleted saved prediction")
        })
      }
    
     post('/api/setpredictions', {predictions: predictionData}).then((result) => {
        //do not change predictionsEntered state
        this.setState({
          predictionObjects: predictionData,
        });
        });
      
      window.location.reload() //refresh the page after clicking button and posting prediction
  };


  
  render() {

    if (this.state.predictionsEntered===true){
      let TodayPredictionCardList = [];
      const predictionObjects = this.state.predictionObjects;

      for (let i=0;i<predictionObjects.length;i++){
        const home_team = predictionObjects[i].home_team;
        let matchingGame = this.state.today_schedule.filter(obj => {return obj.home_team === home_team})[0];
        if (matchingGame===undefined){
          window.location.reload();
        }
        console.log(matchingGame)
        TodayPredictionCardList.push(
          <TodayPredictionCard
            away_team= {predictionObjects[i].away_team}
            home_team= {predictionObjects[i].home_team}
            start_time= {matchingGame.start_time}
            predicted_winner= {predictionObjects[i].predicted_winner}
            predicted_margin= {predictionObjects[i].predicted_margin}
          />
          )
      }

      return(
        <>
        <h1>Prediction Entry</h1>
        <h2>Your Predictions are Locked In:</h2>
        <div className="NextGameCard-allGamesContainer">{TodayPredictionCardList}</div>
        
        </>
      )
      
    }
     
    let allPredictionEntries=[]
    //runs everytime a PredictionCriteriaBox is updated by the user's inputs
    const eventhandler = (data) => {
      allPredictionEntries = this.state.predictionObjects;
      console.log(allPredictionEntries);
    //check that the prediction fields are all filled
      if (data.predicted_winner !== "" && data.predicted_margin !==0){
        const data_home_team = data.home_team
        //see if the game is already in allPredictionEntires
        let found = false;
        for(let i = 0; i < allPredictionEntries.length; i++) {
            if (allPredictionEntries[i].home_team == data_home_team) {
                found = true;
                break;
                }}
        if (found === false){ //if the game wasn't predicted yet, append to list
          allPredictionEntries.push(data);
        } else{
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
            predictionObjects={this.state.predictionObjects}
          />
      ));
      predictionCritList = [];
      const savedPredictions = this.state.predictionObjects;
      for (let i=0;i<this.state.today_schedule.length;i++){
        var found = false;
        let saved_winner = null;
        let saved_margin = null;
        for(let j = 0; j < savedPredictions.length; j++) {
          if (savedPredictions[j].home_team === this.state.today_schedule[i].home_team) {
            saved_winner = savedPredictions[j].predicted_winner;
            saved_margin = savedPredictions[j].predicted_margin;
            found = true;
            break;
          }
          };
        if (found){
          predictionCritList.push(
            <PredictionCriteriaBox
              home_team={this.state.today_schedule[i].home_team}
              away_team={this.state.today_schedule[i].away_team}
              saved_winner={saved_winner}
              saved_margin={saved_margin}
              onChange={eventhandler}
            /> 
          )
        } else{
          predictionCritList.push(
            <PredictionCriteriaBox
              home_team={this.state.today_schedule[i].home_team}
              away_team={this.state.today_schedule[i].away_team}
              saved_winner={ undefined}
              saved_margin= {undefined}
              onChange={eventhandler}
            />) };
    
    }}else{
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
    let html_to_return = this.state.user_id ? (
      <>

        <h1>Prediction Entry</h1>
        
        {this.state.predictionsEntered ? 
          (<><div className = "NextGameCard-allGamesContainer">{gamesList}</div><h2 className='u-textCenter'>You have locked in predictions for the day!</h2></>) : 
          (<><div className = "NextGameCard-allGamesContainer">  {gameEntryVisualList}</div>
          <button onClick={() => {this.savePredictions(allPredictionEntries)}} className="Predictions-submitButton">Save Predictions</button>
          <button onClick={() => {this.setPredictions(allPredictionEntries)}} className="Predictions-submitButton">LOCK IN PREDICTIONS</button>
          </>)
          }
        
      </>
    ) : (<h2>Please log in to display prediction entry!</h2>);
    return html_to_return;
  }
}

export default Predictions;
