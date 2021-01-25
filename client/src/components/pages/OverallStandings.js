import React, { Component } from "react";
import { get, dateConvert } from "../../utilities.js";
import { navigate } from "@reach/router";
import "../../utilities.css";
import "./OverallStandings.css";
import Loader from 'react-loader-spinner';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import {motion} from "framer-motion";
import podium_img from "../../public/img/podium.png";
class OverallStandings extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {
      user_id: null,
      scoreboard: [],
      time:'',
      name:null,
      gold_winner:'',
      silver_winner:'',
      bronze_winner:'',
    };
  }

  componentDidMount() {
    get("/api/whoami").then((user) => {
      this.setState({user_id: user._id, name:user.name})
    });

    get('/api/getscoreboard').then((board) => {
      this.setState({scoreboard: board});
    });

    get('/api/current_time').then((res) => {
      this.setState({time:res.time});
    });

    get('/api/getpodium').then((res) => {
      this.setState({gold_winner: res.gold.name, silver_winner: res.silver.name, bronze_winner:res.bronze.name});
    })

  }

   
  render() {
  
    let isScores = this.state.scoreboard.length !== 0;
    let score_table = isScores ? (
    <>
    
      <div className="Standings-header">
      <motion.div initial="hidden" animate="visible" variants={{hidden:{scale:.8,opacity:0 },
        visible:{scale:1,opacity:1,transition:{delay:.08,duration:.1}},}}>
        <header className="Standings-headerText">Standings</header>
      </motion.div>
      <motion.div initial="hidden" animate="visible" variants={{hidden:{scale:.8,opacity:0 },
        visible:{scale:1,opacity:1,transition:{delay:.2,durant:.1}},}}>
        <h3 className="Standings-headersubText">See who's on top.</h3>
      </motion.div>
      </div>
     
      
      <h1 className="podiumheadertext">Yesterday's Podium</h1>
    <div src={podium_img} className='Podium'>
      <div className="medalWinnersContainer">
        <div className="bronzeMedalWinner">{this.state.bronze_winner}</div>
        <div className="goldMedalWinner">{this.state.gold_winner}</div>
        <div className="silverMedalWinner">{this.state.silver_winner}</div>
      </div>
    </div>
    
    <h1 className="overallstandingstext"> Overall Standings</h1>

    <h1 className="updatedText">(Updated as of {dateConvert(this.state.time.substring(0,10))} @ {this.state.time.slice(-5)} ET)</h1>
    <div className="table-container">
    <table className='styled-table'>
       <thead >
        <tr>
          <th className='tableheadertext'>Rank</th>
          <th className='tableheadertext'>Player Name</th>
          <th className='tableheadertext'>Total Points</th>
          <th className='tableheadertext'>Yesterday Points</th>
        </tr>
        </thead>
    <tbody>
    {this.state.scoreboard.map((entry, i) => 
      <tr>
        
        {entry.name === this.state.name ? <td className = 'extra-bold your-row'>{i+1}</td> : <td className = 'extra-bold'>{i+1}</td>}
        {entry.name === this.state.name ? <td className='your-row'><div className='Name-link' onClick={() => {navigate("/MyProfile")}}>{entry.name}</div></td> : <td><div className='Name-link' onClick={() => {navigate(`/profile/${entry.user_id}`)}}>{entry.name}</div></td>}
        {entry.name === this.state.name ? <td className = 'your-row'>{entry.current_score}</td> : <td>{entry.current_score}</td>}
        {entry.name === this.state.name ? <td className = 'your-row'>+{entry.last_day_score}</td> : <td>+{entry.last_day_score}</td>}

      </tr>
    )}
    </tbody>
    </table>
    </div>
    
    

    </>) : (<div className="center-screen"><Loader type="Grid" color="black" height={50} width={50}/></div>);

    let html_to_return = this.state.user_id ? score_table : (<div></div>);


    return <div className = 'bg'>{html_to_return}</div>;
  }
}

export default OverallStandings;
