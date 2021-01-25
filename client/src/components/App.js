import React, { Component } from "react";
import { Router } from "@reach/router";
import NotFound from "./pages/NotFound.js";
import LoginPage from "./pages/LoginPage.js";
import Dashboard from "./pages/Dashboard.js";
import OverallStandings from "./pages/OverallStandings.js";
import Profile from "./pages/Profile.js";
import UserProfile from "./pages/UserProfile.js";
import Predictions from "./pages/Predictions.js";
import Navbar from "./modules/Navbar.js";
import { navigate } from "@reach/router";
import "./pages/LoginPage.css";
import "../utilities.css";
import Popup from 'reactjs-popup';
import { socket } from "../client-socket.js";
import { get, post } from "../utilities";
import { motion,AnimatePresence } from "framer-motion";

/**
 * Define the "App" component as a class.
 */
class App extends Component {
  // makes props available in this component
  constructor(props) {
    super(props);
    this.state = {
      userId: undefined,
      user_name: '',
      user_picture: null,
    };
  }

  componentDidMount() {
    get("/api/whoami").then((user) => {
      if (user._id) {
        // they are registed in the database, and currently logged in.
        this.setState({ userId: user._id , user_name: user.name, user_picture: user.picture});
      }
    });
    get('/api/5KdnT6mfJ56YhGVcHeXDW2Kls5be4D').then((response_message) => {
      console.log(response_message);
      get('/api/kYh5LipxVj6rMs7B4rzBuodK01bWNH').then((response_msg) => {
        console.log(response_msg);
      });
    });
  }

  handleLogin = (res) => {
    console.log(`Logged in as ${res.profileObj.name}`);
    const userToken = res.tokenObj.id_token;
    post("/api/login", { token: userToken }).then((user) => {
      this.setState({ userId: user._id , user_name: user.name, user_picture: user.picture});
      post("/api/initsocket", { socketid: socket.id });
      //post('/api/setlockinstatus', { googleid: user.googleid});
    });
    navigate('/');
  };

  handleLogout = () => {
    this.setState({ userId: undefined, user_name: "", user_picture: null});
    post("/api/logout");
    navigate('/');
  };

  render() {


    return (
      <>
      <Navbar
          handleLogin={this.handleLogin}
          handleLogout={this.handleLogout}
          userId={this.state.userId}
          name={this.state.user_name}
          picture={this.state.user_picture}
        />

        <Router>
          <LoginPage path="/" userId={this.state.userId}/>
          <Dashboard path="/dashboard" userId={this.state.userId}/>
          <OverallStandings path="/overallstandings" userId={this.state.userId}/>
          <Predictions path="/predictions" userId={this.state.userId}/>
          <Profile path="/MyProfile" userId={this.state.userId}/>
          <UserProfile path="/profile/:userId"/>
          <NotFound default />
        </Router>
      </>
    );
  }
}

export default App;
