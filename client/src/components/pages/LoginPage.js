import React, { Component } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";

import "../../utilities.css";
import "./LoginPage.css";

const GOOGLE_CLIENT_ID = "911618425792-hk0acmfunco1f8qg441iih4pvm01cuae.apps.googleusercontent.com";

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
     
        <h1>Fanvision</h1>
        <h2> What we still need to change:</h2>
        <ul>
          <li>Change the Database SRV for Atlas (server.js)</li>
          <li>Change the Database Name for MongoDB (server.js)</li>
          <li>Favicon not rendering up top</li>
        </ul>
  
      </>
    );
  }
}

export default LoginPage;
