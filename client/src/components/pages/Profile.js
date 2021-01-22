import React, { Component } from "react";

import "../../utilities.css";
import "./Profile.css";
import { get, post } from "../../utilities.js";


class Profile extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {
      name: null,
      gold_dates: [],
      silver_dates: [],
      bronze_dates: [],
      picture: null,
    };
  }

  componentDidMount() {
    // remember -- api calls go here!
    get("/api/whoami").then((user) => {
      console.log(user.name);
      this.setState({
        name: user.name,
        gold_dates: user.gold_dates,
        silver_dates: user.silver_dates,
        bronze_dates: user.bronze_dates,
        picture: user.picture,
      })
    })
  };

  render() {
    let isLoggedin = this.state.name !== null;
    let html_to_display = isLoggedin? (
      <>
      <div className="u-textCenter">
        <img src={this.state.picture} className='Profile-picture'/>
        <h1>{this.state.name}</h1>
        <h2>This is your profile page!</h2>
        <h2>Gold Count: {this.state.gold_dates.length}</h2>
        {/* <h2>Gold Dates: {this.state.gold_dates}</h2> */}
        <h2>Silver Count: {this.state.silver_dates.length}</h2>
        {/* <h2>Silver Dates: {this.state.silver_dates}</h2> */}
        <h2>Bronze Count: {this.state.bronze_dates.length}</h2>
        {/* <h2>Bronze Dates: {this.state.bronze_dates}</h2> */}
      </div>
      </>
    ) : (<div>Please log in to display profile!</div>);
    return html_to_display;
  }
}

export default Profile;
