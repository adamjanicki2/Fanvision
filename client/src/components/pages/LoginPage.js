import React, { Component } from "react";

import "../../utilities.css";
import "./LoginPage.css";



class LoginPage extends Component {
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
        <div className="LoginPage-background">
        <h1>Temp log in page</h1>
        <h2> What we still need to change:</h2>
        <ul>
          <li>Favicon not rendering up top</li>
        </ul>
        </div>
        <div className="LoginPage-footerContainer">
          <div className="LoginPage-bottomMessage">Put your prediction skills to the test.</div>
          <div className="LoginPage-descriptionContainer">
            <h3 className="LoginPage-descriptionItem">Fanvision is a platform where sports fans try to forecast the winner of every NBA game played on that day. Users are awarded points for guessing the correct winner and receive bonus points for accuracy of predictions about margin of victory.</h3>
            <h3 className="LoginPage-descriptionItem">At the end of each day of action, these predictions are checked against game results, and point totals for each user are updated. Fans can compete against each other to find out who is the most accurate predictor of them all.</h3>
          </div>
      </div>
      </>

    );
  }
}

export default LoginPage;
