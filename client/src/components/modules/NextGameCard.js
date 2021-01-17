import React, { Component } from "react";
import "./NextGameCard.css";


class NextGameCard extends Component {
    constructor(props) {
      super(props);
    }

    componentDidMount(){

    }

    render() {
        const teamStadiums = {
            ATL: "State Farm Arena",
            BKN: "Barclays Center",
            BOS: "TD Garden",
            CHA: "Spectrum Center",
            CHI: "United Center",
            CLE: "Rocket Mortgage Fieldhouse",
            DAL: "American Airlines Center",
            DEN: "Pepsi Center",
            DET: "Little Caesars Arena",
            GSW: "Chase Center",
            HOU: "Toyota Center",
            IND: "Bankers Life Fieldhouse",
            LAC: "Staples Center",
            LAL: "Staples Center",
            MEM: "FedEx Forum",
            MIA: "American Airlines Arena",
            MIL: "Fiserv Forum",
            MIN: "Target Center",
            NOP: "Smoothie King Center",
            NYK: "Madison Square Garden",
            OKC: "Chesapeake Energy Arena",
            ORL: "Amway Center",
            PHI: "Wells Fargo Center",
            PHX: "Talking Stick Resort Arena",
            POR: "Moda Center",
            SAC: "Golden 1 Center",
            SAS: "AT&T Center",
            TOR: "Scotiabank Arena",
            UTA: "Vivint Smart Home Arena",
            WAS: "Capital One Arena",
          };
          const teamCities = {
            ATL: "Atlanta, GA",
            BKN: "Brooklyn, NY",
            BOS: "Boston, MA",
            CHA: "Charlotte, NC",
            CHI: "Chicago, IL",
            CLE: "Cleveland, OH",
            DAL: "Dallas, TX",
            DEN: "Denver, CO",
            DET: "Detroit, MI",
            GSW: "San Francisco, CA",
            HOU: "Houston, TX",
            IND: "Indianapolis, IN",
            LAC: "Los Angeles, CA",
            LAL: "Los Angeles, CA",
            MEM: "Memphis, TN",
            MIA: "Miami, FL",
            MIL: "Milwaukee, WI",
            MIN: "Minneapolis, MN",
            NOP: "New Orleans, LA",
            NYK: "New York City, NY",
            OKC: "Oklahoma City, OK",
            ORL: "Orlando, FL",
            PHI: "Philadelphia, PA",
            PHX: "Phoenix, AZ",
            POR: "Portland, OR",
            SAC: "Sacramento, CA",
            SAS: "San Antonio, TX",
            TOR: "Toronto, ON",
            UTA: "Salt Lake City, UT",
            WAS: "Washington, D.C.",
          };

        let game_stadium = teamStadiums[this.props.home_team];
        let game_city = teamCities[this.props.home_team];

        return(
            <>
                <div className="NextGameCard-container">
                    <div>{this.props.away_team} vs {this.props.home_team}</div>
                    <div className="NextGameCard-time">{this.props.start_time} PM ET</div>
                    <div className="NextGameCard-time"> {game_stadium}</div>
                    <div className="NextGameCard-time"> {game_city}</div>
                </div> 
            </>
        );
    }}
    export default NextGameCard;