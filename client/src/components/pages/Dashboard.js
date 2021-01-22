import React, { Component } from "react";
import "../../utilities.css";
import "./Dashboard.css";
import { get, post } from "../../utilities.js";
import NextGameCard from "../modules/NextGameCard.js";
import ResultGameCard from "../modules/ResultGameCard.js";
import {motion} from "framer-motion";



class Dashboard extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {
      name:null,
      user_id: null,
      today_schedule: [],
      yesterday_results: [],
      yesterday_predictions: [],
      predictionsEntered: false,
    };
  };

  componentDidMount() {
    //get name
    get("/api/whoami").then((user) => {
      console.log(user.name);
      this.setState({
        name: user.name,
      })
    })
    
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
    
    get("/api/lockinstatus").then((status) => {
      this.setState({predictionsEntered: status[0].status})
    }
    )
  });
  };

  //TODO determine how many points the user earned
  awardPoints (actual_margin, predicted_margin, correct_guess) {
    //maps difference between actual and predicted margin to the point reward value
    const margin_points = {
        0: 15,
        1: 12,
        2: 10,
        3: 8,
        4: 7,
        5: 6,
        6: 5,
        7: 4,
        8: 3,
        9: 2,
        10: 1, 
    };
    if (!correct_guess){
      return [0,0];
    }
    const margin_difference = Math.abs(actual_margin-predicted_margin)
    if ([0,1,2,3,4,5,6,7,8,9,10].includes(margin_difference)){
      return [15,margin_points[margin_difference]];
    } else {
      return [15,0];
    }
  }

 


  render() {
    
    let total_points=0;
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
        const point_reward = this.awardPoints(actual_margin, margin_predicted, correct_guess)
        total_points = total_points+ point_reward[0]+point_reward[1];
        resultsList.push(
          <ResultGameCard
            home_team={result[i].home_team}
            away_team={result[i].away_team}
            start_time={result[i].start_time}
            home_team_score={result[i].home_team_score}
            away_team_score={result[i].away_team_score}
            predicted_winner={this.state.yesterday_predictions.length-1>=i ? matchingPrediction.predicted_winner : '--'}
            predicted_margin={this.state.yesterday_predictions.length-1>=i ? matchingPrediction.predicted_margin : '--'}
            points_breakdown={point_reward[0].toString()+"+"+point_reward[1].toString()}
            points_earned = {point_reward[0]+point_reward[1]}
          />
        );
      };

    }
    else{
      resultsList = <div>No Games Yesterday :(</div>;
    }
    let html_to_display = this.state.user_id ? (
      <> 
      <div>
        <div className="Dashboard-header Dashboard-bg">
        <motion.div initial="hidden" animate="visible" variants={{hidden:{scale:.8,opacity:0 },
         visible:{scale:1,opacity:1,transition:{delay:.08,duration:.1}},}}>
          <header className="Dashboard-headerText">Dashboard</header>
        </motion.div>
        <motion.div initial="hidden" animate="visible" variants={{hidden:{scale:.8,opacity:0 },
         visible:{scale:1,opacity:1,transition:{delay:.2,durant:.1}},}}>
          <h3 className="Dashboard-headersubText">Welcome, {this.state.name.split(" ")[0]}.</h3>
          <h3 className="Dashboard-headersubText">Check in on the action.</h3>
        </motion.div>
        </div>
      </div>
          
       
        <div className="u-inlineBlock">
          <h2 className="u-inlineBlock predStatus">Today's Predictions: </h2>
          {this.state.predictionsEntered ? 
          (<h2 className="u-inlineBlock CompleteGreen">Complete</h2>) : (<h2 className="u-inlineBlock IncompleteRed">Incomplete</h2>)
          }
        </div>

        <h2 className="sectionheading">Today's Games</h2>
        <div className = "NextGameCard-allGamesContainer">{gamesList}</div>
        <h2 className="sectionheading">Yesterday's Results:</h2>
        <div className = "ResultGameCard-allGamesContainer">{resultsList}</div>
      </>
    ) : (<h2>Please log in to display dashboard!</h2>);
    return html_to_display;
  }
}

export default Dashboard;
