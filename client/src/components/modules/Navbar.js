import React, { Component,useEffect } from "react";
import { Link } from "@reach/router";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import "./Navbar.css";
import logo from '../../public/img/fanvision32.png';

const GOOGLE_CLIENT_ID = "911618425792-hk0acmfunco1f8qg441iih4pvm01cuae.apps.googleusercontent.com";

class Navbar extends Component {
    constructor(props) {
      super(props);
      this.state = {
        current_path: '/',
      };
    }


    render() {
      return (
        <nav className="Navbar-container">
          <img src={logo} className='Navbar-logo u-inlineBlock'/>
          {/*.Navbar-logo in Navbar.css, idk what im doing with this*/}
          <div className="Navbar-title u-inlineBlock">Fanvision</div>
          <div className="Navbar-routeContainer u-inlineBlock">
          {this.props.userId !== undefined ? (
              <Link to="/dashboard" className={this.state.current_path === '/dashboard'? "Navbar-route Route-clicked":"Navbar-route"} onClick={() => {this.setState({current_path: '/dashboard'})}}>
                Dashboard
              </Link>
            ) : (<div></div>)}
            {this.props.userId !== undefined ? (
              <Link to="/predictions" className={this.state.current_path === '/predictions'? "Navbar-route Route-clicked":"Navbar-route"} onClick={() => {this.setState({current_path: '/predictions'})}}>
                Prediction Entry
              </Link>
            ) : (<div></div>)}
            {this.props.userId !== undefined ? (
              <Link to="/overallstandings" className={this.state.current_path === '/overallstandings'? "Navbar-route Route-clicked":"Navbar-route"} onClick={() => {this.setState({current_path: '/overallstandings'})}}>
                Overall Standings
              </Link>
            ) : (<div></div>)}
            {/* {this.props.userId !== undefined ? (
              <Link to="/profile" className="Navbar-route">
                Profile
              </Link>
            ) : (<div></div>)} */}
            
            
          
            
          </div>
          <div className='Navbar-logout u-inlineBlock'>
          {this.props.userId !== undefined? <Link to="/profile" className='Navbar-route Navbar-name u-inlineBlock' onClick={() => {this.setState({current_path: '/profile'})}}>{this.props.name.split(" ")[0]} </Link> : <div/>}
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
