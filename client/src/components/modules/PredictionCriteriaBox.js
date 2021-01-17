import React, { Component } from "react";
import "./PredictionCriteriaBox.css";

class PredictionCriteriaBox extends Component {
    constructor(props) {
      super(props);
    }

    componentDidMount(){
        console.log(this.props.home_team)
    }

    render() {
        return(
            <>
                <div className = "PredictionCriteriaBox-container">
                    <div>
                        <label for="team-select">Predicted Winner:</label>
                        <select name="gameprediction" id="team-select">
                            <option disabled="disabled" selected="selected">--SELECT--</option>
                            <option value={this.props.away_team}>{this.props.away_team}</option>
                            <option value={this.props.home_team}>{this.props.home_team}</option>
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