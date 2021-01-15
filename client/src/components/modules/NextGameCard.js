import React, { Component } from "react";
import "./NextGameCard.css";

class NextGameCard extends Component {
    constructor(props) {
      super(props);
      this.state = { //hard coded for now
          home_team: "DAL",
          away_team: "PHI",
          time: "18:00",
      };
    }

    componentDidMount(){

    }

    render() {
        return(
            <>
                <div className="NextGameCard-container">
                    <div>{this.state.away_team} @ {this.state.home_team}</div>
                    <div>{this.state.time}</div>
                </div>
            </>
        );
    }}
    export default NextGameCard;