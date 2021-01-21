import React, { Component } from "react";
import "./PredictionCriteriaBox.css";

class PredictionCriteriaBox extends Component {
    constructor(props) {
      super(props);
      this.state = {
        home_team: this.props.home_team,
        away_team: this.props.away_team,
        predicted_winner: "",
        predicted_margin: 0,
      };
    }

    componentDidMount(){
    }

    // called whenever the user makes entry into predicted winner box
    handleChangeWinner = (event) => {
        this.setState({
            predicted_winner: event.target.value,
        });
    };

    // called whenever the user makes entry into margin box
    handleChangeMargin = (event) => {
        this.setState({predicted_margin: event.target.value},)
    };

    componentDidUpdate() {
        if (this.props.onChange){
            this.props.onChange(this.state);
        }
    }
       
    

    render() {

        let options_html = (<></>)
        if (this.props.saved_winner === undefined){
            options_html = (
            <>
            <select name="gameprediction" id="team-select" onChange={this.handleChangeWinner}>
                <option value='none' selected disabled hidden>--SELECT--</option>
                <option value={this.props.away_team}>{this.props.away_team}</option>
                <option value={this.props.home_team}>{this.props.home_team}</option>
            </select>
            </>);
        }else if (this.props.saved_winner === this.props.away_team){
            options_html = (
            <>
            <select name="gameprediction" id="team-select" onChange={this.handleChangeWinner}>
                <option value='none' selected disabled hidden>--SELECT--</option>
                <option selected value={this.props.away_team}>{this.props.away_team}</option>
                <option value={this.props.home_team}>{this.props.home_team}</option>
            </select>
            </>);
        }else if (this.props.saved_winner === this.props.home_team){
            options_html = (
            <>
            
            <select name="gameprediction" id="team-select" onChange={this.handleChangeWinner}>
                <option value='none' selected disabled hidden>--SELECT--</option>
                <option value={this.props.away_team}>{this.props.away_team}</option>
                <option selected value={this.props.home_team}>{this.props.home_team}</option>
            </select>
            </>);
        }

        return(
            <>
                <div className = "PredictionCriteriaBox-container">
                    <div>
                        <label for="team-select">Predicted Winner:</label>
                        <>{options_html}</>
                    </div>
                    <div>
                        <label for="margin-guess">Margin of Victory:</label>
                        {this.props.saved_margin === undefined ?
                        (<input type="number" id="margin-guess" name="margin-guess" min="0" max="200" onChange={this.handleChangeMargin}></input>):
                        (<input type="number" id="margin-guess" name="margin-guess" min="0" max="200" defaultValue={this.props.saved_margin} onChange={this.handleChangeMargin}></input>)
                        }
                            
                        
                    </div>

                </div>
            </>
        );
    }}
    export default PredictionCriteriaBox;