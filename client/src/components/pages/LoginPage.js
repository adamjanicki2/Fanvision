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
            <h3 className="LoginPage-descriptionItem">Fanvision is a competitive and social platform for NBA fans eager to demonstrate their predictive abilities. While sports betting platforms are a great way to leverage your NBA knowledge to win real money, the financial risks can pose a significant barrier of entry for many sports fans. Fanvision is a gambling-free alternative for NBA fans who want to predict game outcomes without betting money. Users compete against one another for medals, a spot atop the daily podium, and a high rank on the overall standings for everyone to see. </h3>
          </div>
        </div>
        <div className="LoginPage-footerContainer">
          <div className="LoginPage-howitworks">How it works</div>
          <div className="LoginPage-descriptionContainer">
            <h3 className="LoginPage-descriptionItem">Everyday starting at midnight eastern time, prediction entry for the day’s games will open. You may submit predictions until the first game of the day starts, at which point entries will no longer be accepted. If you save predictions and forget to lock them in, your saved picks will automatically be locked in when predictions are closed. 
                                                      The following morning, you will find your prediction results on the Dashboard, the medal winners from yesterday on the daily podium, and updated overall standings, where you can find out how your competitors performed.</h3>
            <h3 className="LoginPage-descriptionItem">You earn 15 points for guessing the correct winner, and can gain up to another 15 bonus points if you are within 10 points of the actual margin of victory. You will not receive bonus points if you choose the wrong winner, and margin bonus points are based on Mario Kart scoring. Use your basketball IQ and NBA knowledge to beat out other fans and earn your way to the top!</h3>
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
