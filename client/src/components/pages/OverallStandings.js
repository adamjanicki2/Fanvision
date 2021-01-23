import React, { Component } from "react";
import { get } from "../../utilities.js";

import "../../utilities.css";
import "./OverallStandings.css";
import Loader from 'react-loader-spinner';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import {motion} from "framer-motion";
class OverallStandings extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {
      user_id: null,
      scoreboard: [],
    };
  }

  componentDidMount() {
    get("/api/whoami").then((user) => {
      this.setState({user_id: user._id,})
    });

    get('/api/getscoreboard').then((board) => {
      this.setState({scoreboard: board});
    });

  }


  render() {
    let isScores = this.state.scoreboard.length !== 0;
    let score_table = isScores ? (
    <>
    
    {/* <h1 className='u-textCenter'>2020-2021 NBA Season Player Standings</h1> */}
    <div>
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
      </div>

    <table>
        <tbody>
        <tr className='table-header'>
          <th>Rank</th>
          <th>Player Name</th>
          <th>Total Points</th>
          <th>Medals</th>
        </tr>
    {this.state.scoreboard.map((entry, i) => 
      <tr className='table-entry'>
        <td>{i+1}</td>
        <td>{entry.name}</td>
        <td>{entry.current_score}</td>
        <td>{entry.gold} Gold, {entry.silver} Silver, {entry.bronze} Bronze</td>
      </tr>
    )}
    </tbody>
    </table>
    </>) : (<div className="center-screen"><Loader type="Grid" color="black" height={50} width={50}/></div>);

    let html_to_return = this.state.user_id ? score_table : (<h2>Please log in and refresh to display Standings!</h2>);


    return html_to_return;
  }
}

export default OverallStandings;
