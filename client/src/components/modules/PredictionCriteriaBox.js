import React, { Component } from "react";
import "./PredictionCriteriaBox.css";

class PredictionCriteriaBox extends Component {
    constructor(props) {
      super(props);
      this.state = {
        predicted_winner: "",
        predicted_margin: 0,
      };
    }

    componentDidMount(){
        console.log(this.props.home_team)
    }

    // called whenever the user makes entry into predicted winner box
    handleChangeWinner = (event) => {
        this.setState({
        predicted_winner: event.target.value,
        });
    };

    // called whenever the user makes entry into margin box
    handleChangeMargin = (event) => {
        this.setState({
          predicted_margin: event.target.value,
        });
      };

    render() {
        return(
            <>
                <div className = "PredictionCriteriaBox-container">
                    <div>
                        <label for="team-select">Predicted Winner:</label>
                        <select name="gameprediction" id="team-select" onChange={this.handleChangeWinner}>
                            <option disabled="disabled" selected="selected">--SELECT--</option>
                            <option value={this.props.away_team}>{this.props.away_team}</option>
                            <option value={this.props.home_team}>{this.props.home_team}</option>
                        </select>
                    </div>
                    <div>
                        <label for="margin-guess">Margin of Victory:</label>
                        <input type="number" id="margin-guess" name="margin-guess" min="0" max="200" onChange={this.handleChangeMargin}></input>
                    </div>

                </div>
            </>
        );
    }}
    export default PredictionCriteriaBox;