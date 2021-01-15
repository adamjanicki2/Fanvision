import React, { Component } from "react";

import "../../utilities.css";
import "./Profile.css";
import { get, post } from "../../utilities.js";


class Profile extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {
      name: "",
      gold_count: 0,
      silver_count: 0,
      bronze_count: 0,
    };
  }

  componentDidMount() {
    // remember -- api calls go here!
    get("/api/whoami").then((user) => {
      console.log(user.name);
      this.setState({name: user.name})
    })
  };

  render() {
    return (
      <>
        <h1>{this.state.name}</h1>
        <h2>This is your profile page!</h2>
        <h2>Gold: {this.state.gold_count}</h2>
        <h2>Silver: {this.state.silver_count}</h2>
        <h2>Bronze: {this.state.bronze_count}</h2>
      </>
    );
  }
}

export default Profile;
