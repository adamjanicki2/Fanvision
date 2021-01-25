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
    let isLoggedin = this.state.name !== null;
    let html_to_display = isLoggedin? (
      <>
      <div className="u-textCenter">
        <img src={this.state.picture} className='Profile-picture'/>
        <h1>{this.state.name}</h1>
        <h2>This is your profile page!</h2>
        <div className='u-inlineBlock'>
          <div className='u-inlineBlock Medal-img'>
            <img src={gold_medal}/>
            <h2>x{this.state.gold_dates.length}</h2>
          </div>
          <div className='u-inlineBlock Medal-img'>
            <img src={silver_medal}/>
            <h2>x{this.state.silver_dates.length}</h2>
          </div>
          <div className='u-inlineBlock Medal-img'>
            <img src={bronze_medal}/>
            <h2>x{this.state.bronze_dates.length}</h2>
          </div>
        </div>
      </div>
      </>
    ) : (<div></div>);
    return html_to_display;
  }
}

export default Profile;
