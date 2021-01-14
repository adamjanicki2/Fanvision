import React, { Component } from "react";
import { Link } from "@reach/router";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import "./Loginbar.css";


const GOOGLE_CLIENT_ID = "911618425792-hk0acmfunco1f8qg441iih4pvm01cuae.apps.googleusercontent.com";

class Loginbar extends Component {
    constructor(props) {
      super(props);
    }
  
    render() {
      return (
        <nav className="Navbar-container">
          <div className="Navbar-title u-inlineBlock">Fanvision</div>
          <div className="Navbar-routeContainer u-inlineBlock">
            <GoogleLogin
              clientId={GOOGLE_CLIENT_ID}
              buttonText="Login"
              onSuccess={this.props.handleLogin}
              onFailure={(err) => console.log(err)}
              className="Navbar-route Navbar-login"
            />
          
          </div>
        </nav>
      );
    }
  }
  
  export default Loginbar;
