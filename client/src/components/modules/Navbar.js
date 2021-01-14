import React, { Component } from "react";
import { Link } from "@reach/router";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import "./Navbar.css";

//REPLACE THIS CLIENT ID WITH OUR OWN!!
const GOOGLE_CLIENT_ID = "911618425792-hk0acmfunco1f8qg441iih4pvm01cuae.apps.googleusercontent.com";

class Navbar extends Component {
    constructor(props) {
      super(props);
    }
  
    render() {
      return (
        <nav className="Navbar-container">
          <div className="Navbar-title u-inlineBlock">Fanvision</div>
          <div className="Navbar-routeContainer u-inlineBlock">
            <Link to="/dashboard" className="Navbar-route">
              Dashboard
            </Link>
            {this.props.userId && (
              <Link to="/predictions" className="Navbar-route">
                Predictions
              </Link>
            )}
            <Link to="/standings" className="Navbar-route">
              Standings
            </Link>
            <Link to="/profile" className="Navbar-route">
              Profile
            </Link>
            
            <GoogleLogout
              clientId={GOOGLE_CLIENT_ID}
              buttonText="Logout"
              onLogoutSuccess={this.props.handleLogout}
              onFailure={(err) => console.log(err)}
              className="Navbar-route Navbar-login"
            />
          
            
          </div>
        </nav>
      );
    }
  }
  
  export default Navbar;
