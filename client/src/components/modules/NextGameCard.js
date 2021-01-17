import React, { Component } from "react";
import "./NextGameCard.css";


class NextGameCard extends Component {
    constructor(props) {
      super(props);
    }

    componentDidMount(){

    }

    render() {
        return(
            <>
                <div className="NextGameCard-container">
                    <div>{this.props.away_team} vs {this.props.home_team}</div>
                    <div className="NextGameCard-time">{this.props.start_time}</div>
                </div> 
            </>
        );
    }}
    export default NextGameCard;