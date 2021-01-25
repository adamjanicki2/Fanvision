import React, { Component,useEffect } from "react";
import { Link, navigate } from "@reach/router";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import "./Navbar.css";
import logo from '../../public/img/fanvision32.png';
import { get, post } from "../../utilities.js";
const GOOGLE_CLIENT_ID = "911618425792-hk0acmfunco1f8qg441iih4pvm01cuae.apps.googleusercontent.com";

class Navbar extends Component {
    constructor(props) {
      super(props);
      this.state = {
        
      };
    }

    componentDidMount (){
     
    };
    
    navigate_home() {
      navigate('/');
    };

    render() {
      console.log(this.props.location);
      let picture_to_use=null;
      if (this.props.picture !== null){
        const SIZE_ = '36'; //dimensions of pfp, change this number to change the size, make sure to change width/h in navbar.css
        let arr = this.props.picture.split('/');
        arr[arr.length - 2] = arr[arr.length - 2][0]+SIZE_+arr[arr.length - 2].substring(3);
        picture_to_use = arr.join('/');
      }
      
      return (
        <nav className="Navbar-container">
          <img src={logo} className='Navbar-logo u-inlineBlock'/>
          {/*.Navbar-logo in Navbar.css, idk what im doing with this*/}
          <div className="Navbar-title u-inlineBlock" onClick={() => {this.navigate_home()}}>Fanvision</div>
          <div className="Navbar-routeContainer u-inlineBlock">
          {this.props.userId !== undefined ? (
              <Link to="/dashboard" className={this.props.location.pathname === '/dashboard'? "Navbar-route Route-clicked":"Navbar-route"}>
                Dashboard
              </Link>
            ) : (<div></div>)}
            {this.props.userId !== undefined ? (
              <Link to="/predictions" className={this.props.location.pathname === '/predictions'? "Navbar-route Route-clicked":"Navbar-route"} >
                Predict
              </Link>
            ) : (<div></div>)}
            {this.props.userId !== undefined ? (
              <Link to="/overallstandings" className={this.props.location.pathname === '/overallstandings'? "Navbar-route Route-clicked":"Navbar-route"} >
                Standings
              </Link>
            ) : (<div></div>)}
          </div>

          <div className='Navbar-logout u-inlineBlock Navbar-rightside'>
          {this.props.userId !== undefined? 
          <div className='Navbar-rightside'>
            <div className="u-inlineBlock Navbar-pfpContainer">
              <img src={picture_to_use} className='Navbar-pfp'/>
            </div>
            <Link to="/MyProfile" className='Navbar-route Navbar-name u-inlineBlock'>{this.props.name.split(" ")[0]} </Link>
          </div>
          :<div/>}
          {this.props.userId !== undefined? (
            <GoogleLogout
              clientId={GOOGLE_CLIENT_ID}
              buttonText="Logout"
              render={renderProps => (
                <button onClick={renderProps.onClick} disabled={renderProps.disabled} className='button-log'>Log Out</button>
              )}
              onLogoutSuccess={this.props.handleLogout}
              onFailure={(err) => console.log(err)}
            />
          ) : (
            <GoogleLogin
              clientId={GOOGLE_CLIENT_ID}
              buttonText="Login"
              render={renderProps => (
                <button onClick={renderProps.onClick} disabled={renderProps.disabled} className='button-log'>Log In</button>
              )}
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
