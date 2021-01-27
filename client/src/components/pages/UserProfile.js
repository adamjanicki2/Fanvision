import React, { Component } from "react";

import "../../utilities.css";
import "./Profile.css";
import { get, post } from "../../utilities.js";
import gold_medal from '../../public/img/gold_medal.png';
import silver_medal from '../../public/img/silver_medal.png';
import bronze_medal from '../../public/img/bronze_medal.png';

class UserProfile extends Component {
    constructor(props) {
      super(props);
      // Initialize Default State
      this.state = {
        name: null,
        googleid: null,
        gold_dates: [],
        silver_dates: [],
        bronze_dates: [],
        picture: null,
        total_correct:null,
        total_wrong:null,
        season_points: null,
      };
    }

    componentDidMount() {
        get("/api/get_user", {_id_: this.props.userId}).then((user) => {
          let picture_to_use=null;
          if (user.picture !== null){
            const SIZE_ = '384'; //dimensions of pfp, change this number to change the size, make sure to change width/h in navbar.css
            if (user.picture.split('/')[user.picture.split('/').length - 2] === 's96-c'){
              let arr = user.picture.split('/');
              arr[arr.length - 2] = arr[arr.length - 2][0]+SIZE_+arr[arr.length - 2].substring(3);
              picture_to_use = arr.join('/');
            }else if (user.picture.split('=')[user.picture.split('=').length - 1] === 's96-c'){
              let arr = user.picture.split('=');
              arr[arr.length-1] = arr[arr.length - 1][0]+SIZE_+arr[arr.length - 1].substring(3);
              picture_to_use = arr.join('=');
            }else{
              picture_to_use = user.picture;
            }
          }
          get('/api/getuserscoreboard', {googleid: user.googleid}).then((user_scores) => {
            this.setState({
              name: user.name,
              gold_dates: user.gold_dates,
              silver_dates: user.silver_dates,
              bronze_dates: user.bronze_dates,
              picture: picture_to_use,
              googleid: user.googleid,
              total_correct: user_scores.total_wins,
              total_wrong: user_scores.total_losses,
              season_points: user_scores.current_score,
            });
          });
        });
    };

    render(){
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
          <div className='bg'>
          <div className="u-textCenter">
            <img src={this.state.picture} className='Profile-picture'/>
            <h1 className='name-header'>{this.state.name}</h1>
            <h2>All-Time Record: {this.state.total_correct}-{this.state.total_wrong}</h2>
            <h2>Season total: {this.state.season_points}</h2>
            <h2>{this.state.name.split(" ")[0]}'s Medals</h2>
            <div className='medalContainer'>
              <div className='medalAndDate'><div className = "goldMedal">x{this.state.gold_dates.length}</div><div className='Dates-list'>{gold_list}</div></div>
              <div className='medalAndDate'><div className = "silverMedal">x{this.state.silver_dates.length}</div><div className='Dates-list'>{silver_list}</div></div>
              <div className='medalAndDate'><div className = "bronzeMedal">x{this.state.bronze_dates.length}</div><div className='Dates-list'>{bronze_list}</div></div>
          
    
            </div>
          </div>
          </div>
          </>
          ) : (<div></div>);
          return html_to_display;
    };

}

export default UserProfile;