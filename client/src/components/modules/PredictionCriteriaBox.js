import React, { Component } from "react";
import "./PredictionCriteriaBox.css";

class PredictionCriteriaBox extends Component {
    constructor(props) {
      super(props);
      this.state = { //hard coded for now
          home_team: "DAL",
          away_team: "PHI",
          predicted_margin: null,
      };
    }

    componentDidMount(){

    }

    render() {
        return(
            <>
                <div className = "PredictionCriteriaBox-container">
                    <div>
                        <label for="team-select">Enter Predictions Below:</label>
                        <select name="gameprediction" id="team-select">
                            <option disabled="disabled" selected="selected">--Pick a Winner--</option>
                            <option value={this.state.away_team}>{this.state.away_team}</option>
                            <option value={this.state.home_team}>{this.state.home_team}</option>
                        </select>
                    </div>
                    <div>
                        <label for="margin-guess">Margin of Victory:</label>
                        <input type="number" id="margin-guess" name="margin-guess" min="0" max="200"></input>
                    </div>

                </div>
            </>
        );
    }}
    export default PredictionCriteriaBox;