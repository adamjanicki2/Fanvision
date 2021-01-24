import React, { Component } from "react";

import "../../utilities.css";
import "./Profile.css";
import { get, post } from "../../utilities.js";

class UserProfile extends Component {
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
        get("/api/get_user", {_id_: this.props.userId}).then((user) => {
        console.log(user);
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
        });
    };

    render(){
        let isLoggedin = this.state.name !== null;
        let html_to_display = isLoggedin? (
            <>
            <div className="u-textCenter">
              <img src={this.state.picture} className='Profile-picture'/>
              <h1>{this.state.name}</h1>
              <h2>Gold Count: {this.state.gold_dates.length}</h2>
              {/* <h2>Gold Dates: {this.state.gold_dates}</h2> */}
              <h2>Silver Count: {this.state.silver_dates.length}</h2>
              {/* <h2>Silver Dates: {this.state.silver_dates}</h2> */}
              <h2>Bronze Count: {this.state.bronze_dates.length}</h2>
              {/* <h2>Bronze Dates: {this.state.bronze_dates}</h2> */}
            </div>
            </>
          ) : (<div></div>);
          return html_to_display;
    };

}

export default UserProfile;