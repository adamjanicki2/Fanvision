import React, { Component } from "react";

import "../../utilities.css";
import "./LoginPage.css";
import { get } from "../../utilities.js";


class LoginPage extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {};
  }

  componentDidMount() {
    //Here is where we scrape:
    //This code runs when the user hits the landing page, it scrapes if we haven't scraped in the last hour
    //That way when the dashboard loads and todays games are fetched, it has the updated scores in the db already!!!
    get('/api/5KdnT6mfJ56YhGVcHeXDW2Kls5be4D').then((response_message) => {
      console.log(response_message);
      get('/api/kYh5LipxVj6rMs7B4rzBuodK01bWNH').then((response_msg) => {
        console.log(response_msg);
      });
    });
  }

  render() {
    return (
      <>
        <div className="LoginPage-background">
          <header className="LoginPage-bigMessage">Predict.</header>
          <header className="LoginPage-bigMessage">Compete.</header>
          <header className="LoginPage-bigMessage">Win.</header>
        </div>
        <div className="LoginPage-footerContainer">
          <div className="LoginPage-bottomMessage">Put your prediction skills to the test.</div>
          <div className="LoginPage-descriptionContainer">
            <h3 className="LoginPage-descriptionItem">Fanvision is a platform for NBA fans eager to demonstrate their predictive abilities. For every leaguewide gameday, fans submit predictions for the outcome of each contest. Users are awarded points for guessing the correct winner and earn bonus points for accurately forecasting the margin of victory.</h3>
            <h3 className="LoginPage-descriptionItem">At the end of each day of action, your predictions are checked against actual game results and your point total is updated. Earn medals by topping the daily standings and compete against fellow fans to find out who makes the most accurate picks!</h3>
          </div>
      </div>
      </>

    );
  }
}

export default LoginPage;
