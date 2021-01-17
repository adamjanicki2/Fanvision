import React, { Component } from "react";
import "./ResultGameCard.css";

class ResultGameCard extends Component {
    constructor(props) {
      super(props);
    }

    componentDidMount(){

    }

    render() {
        return(
            <>
                <div className="ResultGameCard-container">
                    <div>{this.props.away_team} vs {this.props.home_team}</div>
                    <div className="ResultGameCard-scoreIdentifier">Actual Result:</div>
                    <div className="ResultGameCard-scoreActual">{this.props.away_team_score} - {this.props.home_team_score}</div>
                    <div className="ResultGameCard-scoreIdentifier">Your Prediction:</div>
                    <div className="ResultGameCard-scorePredicted">{this.props.predicted_winner} by {this.props.predicted_margin}</div>
                    <div className="ResultGameCard-scoreIdentifier">Points Earned:</div>
                    <div>{this.props.points_earned}</div>
                </div> 
            </>
        );
    }}
    export default ResultGameCard;