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
          {this.props.userId !== undefined ? (
              <Link to="/dashboard" className="Navbar-route">
                Dashboard
              </Link>
            ) : (<div></div>)}
            {this.props.userId !== undefined ? (
              <Link to="/predictions" className="Navbar-route">
                Prediction Entry
              </Link>
            ) : (<div></div>)}
            {this.props.userId !== undefined ? (
              <Link to="/overallstandings" className="Navbar-route">
                Overall Standings
              </Link>
            ) : (<div></div>)}
            {this.props.userId !== undefined ? (
              <Link to="/profile" className="Navbar-route">
                Profile
              </Link>
            ) : (<div></div>)}
            
            
          
            
          </div>
          <div className='Navbar-logout u-inlineBlock'>
          {this.props.userId !== undefined? (
            <GoogleLogout
              clientId={GOOGLE_CLIENT_ID}
              buttonText="Logout"
              onLogoutSuccess={this.props.handleLogout}
              onFailure={(err) => console.log(err)}
              
            />
          ) : (
            <GoogleLogin
              clientId={GOOGLE_CLIENT_ID}
              buttonText="Login"
              onSuccess={this.props.handleLogin}
              onFailure={(err) => console.log(err)}
              
            />
          )}
          </div>
        </nav>
      );
    }
  }
  
  export default Navbar;
