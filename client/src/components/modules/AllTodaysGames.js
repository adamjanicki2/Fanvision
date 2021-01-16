import React, { Component } from "react";
import "./AllTodaysGames.css";
import NextGameCard from "./NextGameCard.js";
//renders the game cards at the top of the dashboard that shows today's games
class AllTodaysGames extends Component{
    constructor(props) {
        super(props);
        this.state= {
        };
      };
    
    parseSchedule = () => {
        let todays_games = this.props.today_schedule;
        html_output_str="";
        for (i=0; i<todays_games.length; i++){
            away_team = todays_games[i].away_team;
            home_team = todays_games[i].home_team;
            time = todays_games[i].time;
            html_output_str+="<NextGameCard " //idk what im doing
        }
    };

    componentDidMount(){
        console.log(this.props.today_schedule);
    }

    
    render(){
        return(
            <div>{this.props.today_schedule}</div>
        );
        
    };
}
export default AllTodaysGames;