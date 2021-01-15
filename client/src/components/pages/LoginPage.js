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
      </>
    );
  }
}

export default LoginPage;
