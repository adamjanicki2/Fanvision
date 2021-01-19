import React, { Component } from "react";
import "./ResultGameCard.css";

class ResultGameCard extends Component {
    constructor(props) {
      super(props);
    }

    componentDidMount(){

    }

    getWinner (){
        const home_score = this.props.home_team_score;
        const away_score = this.props.away_team_score;
        if (home_score>away_score){
            return this.props.home_team;
        } else if (home_score<away_score){
            return this.props.away_team;
        } else {
            return "TIE"
        }}

    getMargin () {
        return Math.abs(this.props.home_team_score-this.props.away_team_score);
    }

    render() {
        let css_points = this.props.points_earned === 0? "Result-loss" : "Result-win";
        return(
            <>
                <div className="ResultGameCard-container">
                    <div>{this.props.away_team} vs {this.props.home_team}</div>
                    <div className="ResultGameCard-scoreIdentifier">Final Score:</div>
                    <div className="ResultGameCard-scoreActual">{this.props.away_team_score} - {this.props.home_team_score}</div>
                    <div className="ResultGameCard-scoreIdentifier">Your Prediction:</div>
                    <div className="ResultGameCard-scorePredicted">{this.props.predicted_winner} by {this.props.predicted_margin}</div>
                    <div className="ResultGameCard-scoreIdentifier">Actual Result:</div>
                    <div className="ResultGameCard-scorePredicted">{this.getWinner()} by {this.getMargin()}</div>
                    <div className="ResultGameCard-scoreIdentifier">Points Earned:</div>
                    <div className={css_points}>{this.props.points_earned}</div>
                    <div className="ResultGameCard-pointBreakdown">{this.props.points_breakdown}</div>
                </div> 
            </>
        );
    }}
    export default ResultGameCard;