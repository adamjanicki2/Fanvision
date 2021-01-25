import React, { Component } from "react";

import "../../utilities.css";
import "./Profile.css";
import { get, post } from "../../utilities.js";
import gold_medal from '../../public/img/gold_medal.png';
import silver_medal from '../../public/img/silver_medal.png';
import bronze_medal from '../../public/img/bronze_medal.png';
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
    
    get("/api/whoami").then((user) => {
      console.log(user.name);
      const SIZE_ = '384'; //dimensions of pfp, change this number to change the size
      let arr = user.picture.split('/');
      arr[arr.length - 2] = arr[arr.length - 2][0]+SIZE_+arr[arr.length - 2].substring(3);
      let picture_to_use = arr.join('/');
      this.setState({
        name: user.name,
        gold_dates: user.gold_dates,
        silver_dates: user.silver_dates,
        bronze_dates: user.bronze_dates,
        picture: picture_to_use,
      })
    })
  };

  render() {
    const gold_list = this.state.gold_dates.map((date) =>
    <h2>{date}</h2>
    );
    const silver_list = this.state.silver_dates.map((date) =>
    <h2>{date}</h2>
    );
    const bronze_list = this.state.bronze_dates.map((date) =>
      <h2>{date}</h2>
    );
    let isLoggedin = this.state.name !== null;
    let html_to_display = isLoggedin? (
      <>
      <div className="u-textCenter">
        <img src={this.state.picture} className='Profile-picture'/>
        <h1>{this.state.name}</h1>
        <h2>Your Medals</h2>
        <div className='medalContainer'>
          <div><div className = "goldMedal">x{this.state.gold_dates.length}</div><div className='Dates-list'>{gold_list}</div></div>
          <div><div className = "silverMedal">x{this.state.silver_dates.length}</div><div className='Dates-list'>{silver_list}</div></div>
          <div><div className = "bronzeMedal">x{this.state.bronze_dates.length}</div><div className='Dates-list'>{bronze_list}</div></div>
      

        </div>
      </div>
      </>
    ) : (<div></div>);
    return html_to_display;
  }
}

export default Profile;
