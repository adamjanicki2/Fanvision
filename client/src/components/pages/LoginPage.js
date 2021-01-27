import React, { Component } from "react";

import "../../utilities.css";
import "./LoginPage.css";
import { get } from "../../utilities.js";
import { motion } from "framer-motion";


class LoginPage extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {};
  }

  componentDidMount() {
    //Here is where we scrape:
    //This code runs when the user hits the landing page, it scrapes if we haven't scraped in the last hour
    //That way when the dashboard loads and todays games are fetched, it has the updated scores in the db already!!!
  }

  render() {
    return (
      <>
      <div className='bg'>
        
        <div className="LoginPage-background">
        <motion.div initial="hidden" animate="visible" variants={{hidden:{scale:.8,opacity:0 },
         visible:{scale:1,opacity:1,transition:{delay:1}},}}>
          <header className="LoginPage-bigMessage">Predict.</header>
          </motion.div>
          <motion.div initial="hidden" animate="visible" variants={{hidden:{scale:.8,opacity:0 },
         visible:{scale:1,opacity:1,transition:{delay:2}},}}>
          <header className="LoginPage-bigMessage">Compete.</header>
          </motion.div>
          <motion.div initial="hidden" animate="visible" variants={{hidden:{scale:.8,opacity:0 },
         visible:{scale:1,opacity:1,transition:{delay:3}},}}>
          <header className="LoginPage-bigMessage">Win.</header>
          </motion.div>
        </div>
        <div className='LoginPage-contentContainer'>
        <div className="LoginPage-verticalContainer">
        <div className="LoginPage-footerContainer">
          <div className="LoginPage-howitworks">what it is</div>
          <div className="LoginPage-descriptionContainer">
            <h3 className="LoginPage-descriptionItem">Fanvision is a competitive and social platform for NBA fans eager to demonstrate their predictive abilities. While sports gambling platforms are a great way to leverage your NBA knowledge and win real money, the risk factors make them unsuitable for many people. Fanvision is a gambling-free alternative for NBA fans who want to predict game outcomes without betting money. Users compete against one another for medals and a spot on atop the daily podium and overall standings for everyone to see. </h3>
          </div>
        </div>
        <div className="LoginPage-footerContainer">
          <div className="LoginPage-howitworks">How it works</div>
          <div className="LoginPage-descriptionContainer">
            <h3 className="LoginPage-descriptionItem">Everyday starting at midnight eastern time, predictions for the day’s games will open. You may submit predictions until the first game of the day starts, at which point entries will no longer be accepted. If you save predictions and forget to lock in, your saved predictions will automatically be locked in. 
                                                      The following morning, you will find your own prediction results on the Dashboard, the medal winners from yesterday on the daily podium, and updated overall standings. Use your future-telling abilities and NBA knowledge to beat out other fans and earn your way to the top! </h3>
          </div>
          
          </div>
      
      </div>
      <div className="LoginPage-graphic"></div>
      </div>
      </div>
      </>

    );
  }
}

export default LoginPage;
