import React, { Component } from "react";
import NextGameCard from "../modules/NextGameCard.js";
import PredictionCriteriaBox from "../modules/PredictionCriteriaBox.js";
import "../../utilities.css";
import "./Predictions.css";



class Predictions extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {};
  }

  componentDidMount() {
    // remember -- api calls go here!
  }

  render() {
    return (
      <>
        <h1>Prediction Entry</h1>
        <div className = "Predictions-predictionEntryContainer">
          <div className="Predictions-row">
            <div className="Predictions-column">
              <NextGameCard/>
              <PredictionCriteriaBox/>
            </div>
            <div className="Predictions-column">
              <NextGameCard/>
              <PredictionCriteriaBox/>
            </div>
            <div className="Predictions-column">
              <NextGameCard/>
              <PredictionCriteriaBox/>
            </div>
          <div/>
          <div className="Predictions-row">
            <div className="Predictions-column">
              <NextGameCard/>
              <PredictionCriteriaBox/>
            </div>
            <div className="Predictions-column">
              <NextGameCard/>
              <PredictionCriteriaBox/>
            </div>
            <div className="Predictions-column">
              <NextGameCard/>
              <PredictionCriteriaBox/>
            </div>
          </div>
          <div className="Predictions-row">
            <div className="Predictions-column">
              <NextGameCard/>
              <PredictionCriteriaBox/>
            </div>
            <div className="Predictions-column">
              <NextGameCard/>
              <PredictionCriteriaBox/>
            </div>
            <div className="Predictions-column">
              <NextGameCard/>
              <PredictionCriteriaBox/>
            </div>
          </div>
        </div>
        </div>
        <input type="submit" value="LOCK IN PREDICTIONS" className="Predictions-submitButton"></input>
      </>
    );
  }
}

export default Predictions;
