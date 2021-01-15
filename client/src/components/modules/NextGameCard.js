import React, { Component } from "react";
import "./NextGameCard.css";

class NextGameCard extends Component {
    constructor(props) {
      super(props);
      this.state = { //hard coded for now
          home_team: "DAL",
          away_team: "PHI",
          time: "18:00 ET",
      };
    }

    componentDidMount(){

    }

    render() {
        return(
            <>
                <div className="NextGameCard-container">
                    <div>{this.state.away_team} vs {this.state.home_team}</div>
                    <div className="NextGameCard-time">{this.state.time}</div>
                </div> 
            </>
        );
    }}
    export default NextGameCard;