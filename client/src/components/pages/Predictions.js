import React, { Component } from "react";
import NextGameCard from "../modules/NextGameCard.js";
import PredictionCriteriaBox from "../modules/PredictionCriteriaBox.js";
import "../../utilities.css";
import "./Predictions.css";
import { get, post } from "../../utilities.js";
import Popup from "reactjs-popup";
import TodayPredictionCard from "../modules/TodayPredictionCard.js";
import {motion} from "framer-motion";
const moment = require('moment');
require('moment-timezone');



class Predictions extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {
      today_schedule: [],
      user_id: null,
      lockedIn: false,
      predictionObjects: [],
      earliest_start_time: '',
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

    get('/api/get_earliest_game').then((game_) => {
      this.setState({ earliest_start_time: game_.time});
    });
    
    get('/api/current_time').then((res_) => {
      this.setState({ current_time: res_.time});
    });

    //call api to check if user has already predicted today's games
    get('/api/gettodaypredictions').then((prediction) => {
      if (prediction.length !== 0){
        this.setState({
          predictionObjects: prediction[0].todays_predictions,
          });
    //call api for lockedIn status
    get("/api/lockinstatus").then((res) => {
      this.setState({lockedIn: res[0].status})
    }
    )

    
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
    //correct the messed up crap in predictionData (dont allow margin 0)
    for (let i = 0; i<predictionData.length; i++){
      if (predictionData[i].predicted_margin===0){
        const home_team = predictionData[i].home_team;
        const state_pred = this.state.predictionObjects.find(obj => {
          return obj.home_team === home_team
        })
        predictionData[i]['predicted_margin'] = state_pred.predicted_margin;
      }

    }
    if (this.marginsValid(predictionData)===false){
      window.alert("Predicted margins invalid");
      return
    }
    if(window.confirm('To Confirm Predictions, click OK:')){
      console.log('PRINTING PREDICTION DATA:')
      console.log(predictionData);
      if (this.state.lockedIn){
        return
      }
      else{ 
        //check if there is already a saved prediction. if there is delete it first before posting new one
        if (this.state.predictionObjects.length!==0){
          let today = Date(); //this line is working
          const today_str = moment(today).tz("America/New_York").format("YYYY-MM-DD");    
          post('/api/deletesavedprediction', {date:today_str}).then((result) => {
            console.log("deleted saved prediction")
            })
          }
        post('/api/setpredictions', {predictions: predictionData}).then((result) => {
        //console.log(result);
        this.setState({
          predictionObjects: predictionData,
        });
        });
      }
      post("/api/changelockinstatus", {status: true}).then((result) => {
        this.setState({lockedIn:true})
      })
      window.location.reload()
  }
    
};

  //Calling savePredictions(predictionData); will post predictionData for today's date for current user to mongo without locking in
  savePredictions = (predictionData) => {
    if (this.state.lockedIn){
      return
    }
    

    //correct the messed up crap in predictionData (dont allow margin 0)
    for (let i = 0; i<predictionData.length; i++){
      if (predictionData[i].predicted_margin===0){
        const home_team = predictionData[i].home_team;
        const state_pred = this.state.predictionObjects.find(obj => {
          return obj.home_team === home_team
        })
        predictionData[i]['predicted_margin'] = state_pred.predicted_margin;
      }

    }
    if (this.marginsValid(predictionData)===false){
      window.alert("Predicted margins invalid");
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
        //do not change lockedIn state
        this.setState({
          predictionObjects: predictionData,
        });
        });
      window.alert("Predictions Saved!");
      // window.location.reload() //refresh the page after clicking button and posting prediction
  };


//ensure user entered margins all are positive numbers
  marginsValid = (predictionData) => {
    const all_margins = predictionData.map(pred => pred.predicted_margin);
    for (let i=0; i<all_margins.length; i++){
      if(isNaN(all_margins[i])){
        return false;
      } 
    };
    return true
  };
  
  isBefore = (earliest_game_time) => {
    let is_current_time_before = true;
    get('/api/current_time').then((current_time) => {
      if (earliest_game_time !== ''){
        let min_cur = current_time.time.split(' ')[1];
        let min_early = earliest_game_time.split(' ')[1];
        let num_cur = parseInt(min_cur.split(':')[0]) + parseInt(min_cur.split(':')[1])/60;
        let num_early = parseInt(min_early.split(':')[0]) + parseInt(min_early.split(':')[1])/60;
        is_current_time_before = num_cur < num_early;
      }
    });
    return is_current_time_before;
  };

  render() {
    console.log(this.isBefore(this.state.earliest_start_time))
    if (this.state.lockedIn===true){
      let TodayPredictionCardList = [];
      const predictionObjects = this.state.predictionObjects;

      for (let i=0;i<predictionObjects.length;i++){
        const home_team = predictionObjects[i].home_team;
        let matchingGame = this.state.today_schedule.filter(obj => {return obj.home_team === home_team})[0];
        if (matchingGame===undefined){
          window.location.reload();
        }
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
        <div className="Predictions-header">
          <header className="Predictions-headerText">Prediction Entry</header>
          <h3 className="Predictions-headersubText">You've locked in your predictions for today.</h3>
          <h3 className="Predictions-headersubText">View them below.</h3>
        </div>
    

        <div className="NextGameCard-allGamesContainer">{TodayPredictionCardList}</div>
        
        </>
      )
      
    }
     //make deep copy of predictionObjects
    let allPredictionEntries = JSON.parse(JSON.stringify(this.state.predictionObjects));
  
    
    //runs everytime a PredictionCriteriaBox is updated by the user's inputs
    const eventhandler = (data) => {


        //if not all fields are populated, check if the game has been saved previosuly
        if (data.predicted_winner === "" || data.predicted_margin ===0){
          const data_home_team = data.home_team
          //see if the game is already in allPredictionEntires
          let found = false;
          let index = null;
          for(let i = 0; i < allPredictionEntries.length; i++) {
              if (allPredictionEntries[i].home_team == data_home_team) {
                  found = true;
                  index = i;
                  break;
                  }}
          if (found){
            if (data.predicted_winner === ""){
            allPredictionEntries[index] = {
              home_team: data.home_team, 
              away_team: data.away_team, 
              predicted_winner: allPredictionEntries[index].predicted_winner,
              predicted_margin: data.predicted_margin,
            }
          }else if (data.predicted_margin===0){
            allPredictionEntries[index] = {
              home_team: data.home_team, 
              away_team: data.away_team, 
              predicted_winner: data.predicted_winner,
              predicted_margin: allPredictionEntries[index].predicted_margin,
            }
          }
          }
        }


      //check that all of the prediction fields are all filled
       else if (data.predicted_winner !== "" && data.predicted_margin !==0){
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
              saved_winner={undefined}
              saved_margin= {undefined}
              onChange={eventhandler}
            />) };

        if (this.isBefore(this.state.earliest_start_time)===false){
          return(
            <>
            <h2>It is too late to submit predictions today.</h2>
            <div className="NextGameCard-allGamesContainer">{gamesList}</div>
            </>
          )
        }
    
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

        <div className="Predictions-header">
        <motion.div initial="hidden" animate="visible" variants={{hidden:{scale:.5,opacity:0 },
         visible:{scale:1,opacity:1,transition:{delay:.2}},}}>
          <header className="Predictions-headerText">Prediction Entry</header>
        </motion.div>
        <motion.div initial="hidden" animate="visible" variants={{hidden:{scale:.5,opacity:0 },
         visible:{scale:1,opacity:1,transition:{delay:.32}},}}>
          <h3 className="Predictions-headersubText"> It's GAMEDAY!</h3>
          <h3 className="Predictions-headersubText"> Lock in your predictions below.</h3>
        </motion.div>
        </div>
    

        {this.state.lockedIn ? 
          (<><div className = "NextGameCard-allGamesContainer">{gamesList}</div><h2 className='u-textCenter'>You have locked in predictions for the day!</h2></>) : 
          (<><div className = "NextGameCard-allGamesContainer">  {gameEntryVisualList}</div>
          <div className="Predictions-buttonContainer">
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => {this.savePredictions(allPredictionEntries)}} className="Predictions-submitButton">
            Save
          </motion.button>
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}onClick={() => {this.setPredictions(allPredictionEntries)}} className="Predictions-submitButton">LOCK IN PREDICTIONS</motion.button>
          </div>
          </>)
          }
        
      </>
    ) : (<h2 className="sectionheading">Please log in to display prediction entry!</h2>);
    return html_to_return;
  }
}

export default Predictions;
