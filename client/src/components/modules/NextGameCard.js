import React, { Component } from "react";
import "./NextGameCard.css";
import ATL_logo from '../../public/img/logos/ATL.png';
import BKN_logo from '../../public/img/logos/BKN.png';
import BOS_logo from '../../public/img/logos/BOS.png';
import CHA_logo from '../../public/img/logos/CHA.png';
import CHI_logo from '../../public/img/logos/CHI.png';
import CLE_logo from '../../public/img/logos/CLE.png';
import DAL_logo from '../../public/img/logos/DAL.png';
import DEN_logo from '../../public/img/logos/DEN.png';
import DET_logo from '../../public/img/logos/DET.png';
import GSW_logo from '../../public/img/logos/GSW.png';
import HOU_logo from '../../public/img/logos/HOU.png';
import IND_logo from '../../public/img/logos/IND.png';
import LAC_logo from '../../public/img/logos/LAC.png';
import LAL_logo from '../../public/img/logos/LAL.png';
import MEM_logo from '../../public/img/logos/MEM.png';
import MIA_logo from '../../public/img/logos/MIA.png';
import MIL_logo from '../../public/img/logos/MIL.png';
import MIN_logo from '../../public/img/logos/MIN.png';
import NOP_logo from '../../public/img/logos/NOP.png';
import NYK_logo from '../../public/img/logos/NYK.png';
import OKC_logo from '../../public/img/logos/OKC.png';
import ORL_logo from '../../public/img/logos/ORL.png';
import PHI_logo from '../../public/img/logos/PHI.png';
import PHX_logo from '../../public/img/logos/PHX.png';
import POR_logo from '../../public/img/logos/POR.png';
import SAC_logo from '../../public/img/logos/SAC.png';
import SAS_logo from '../../public/img/logos/SAS.png';
import TOR_logo from '../../public/img/logos/TOR.png';
import UTA_logo from '../../public/img/logos/UTA.png';
import WAS_logo from '../../public/img/logos/WAS.png';
import { convertMilitary, dateConvert } from '../../utilities.js';

class NextGameCard extends Component {
    constructor(props) {
      super(props);
      
    }

    componentDidMount(){
      
        
      }

      

    render() {
        const teamStadiums = {
            ATL: "State Farm Arena",
            BKN: "Barclays Center",
            BOS: "TD Garden",
            CHA: "Spectrum Center",
            CHI: "United Center",
            CLE: "Rocket Mortgage Fieldhouse",
            DAL: "American Airlines Center",
            DEN: "Pepsi Center",
            DET: "Little Caesars Arena",
            GSW: "Chase Center",
            HOU: "Toyota Center",
            IND: "Bankers Life Fieldhouse",
            LAC: "Staples Center",
            LAL: "Staples Center",
            MEM: "FedEx Forum",
            MIA: "American Airlines Arena",
            MIL: "Fiserv Forum",
            MIN: "Target Center",
            NOP: "Smoothie King Center",
            NYK: "Madison Square Garden",
            OKC: "Chesapeake Energy Arena",
            ORL: "Amway Center",
            PHI: "Wells Fargo Center",
            PHX: "Talking Stick Resort Arena",
            POR: "Moda Center",
            SAC: "Golden 1 Center",
            SAS: "AT&T Center",
            TOR: "Scotiabank Arena",
            UTA: "Vivint Smart Home Arena",
            WAS: "Capital One Arena",
          };
          const teamCities = {
            ATL: "Atlanta, GA",
            BKN: "Brooklyn, NY",
            BOS: "Boston, MA",
            CHA: "Charlotte, NC",
            CHI: "Chicago, IL",
            CLE: "Cleveland, OH",
            DAL: "Dallas, TX",
            DEN: "Denver, CO",
            DET: "Detroit, MI",
            GSW: "San Francisco, CA",
            HOU: "Houston, TX",
            IND: "Indianapolis, IN",
            LAC: "Los Angeles, CA",
            LAL: "Los Angeles, CA",
            MEM: "Memphis, TN",
            MIA: "Miami, FL",
            MIL: "Milwaukee, WI",
            MIN: "Minneapolis, MN",
            NOP: "New Orleans, LA",
            NYK: "New York City, NY",
            OKC: "Oklahoma City, OK",
            ORL: "Orlando, FL",
            PHI: "Philadelphia, PA",
            PHX: "Phoenix, AZ",
            POR: "Portland, OR",
            SAC: "Sacramento, CA",
            SAS: "San Antonio, TX",
            TOR: "Toronto, ON",
            UTA: "Salt Lake City, UT",
            WAS: "Washington, D.C.",
          };
          const teamLogos = {
            ATL_logo:ATL_logo,
            BKN_logo:BKN_logo,
            BOS_logo:BOS_logo,
            CHA_logo:CHA_logo,
            CHI_logo:CHI_logo,
            CLE_logo:CLE_logo,
            DAL_logo:DAL_logo,
            DEN_logo:DEN_logo,
            DET_logo:DET_logo,
            GSW_logo:GSW_logo,
            HOU_logo:HOU_logo,
            IND_logo:IND_logo,
            LAC_logo:LAC_logo,
            LAL_logo:LAL_logo,
            MEM_logo:MEM_logo,
            MIA_logo:MIA_logo,
            MIL_logo:MIL_logo,
            MIN_logo:MIN_logo,
            NOP_logo:NOP_logo,
            NYK_logo:NYK_logo,
            OKC_logo:OKC_logo,
            ORL_logo:ORL_logo,
            PHI_logo:PHI_logo,
            PHX_logo:PHX_logo,
            POR_logo:POR_logo,
            SAC_logo:SAC_logo,
            SAS_logo:SAS_logo,
            TOR_logo:TOR_logo,
            UTA_logo:UTA_logo,
            WAS_logo:WAS_logo,

          }
          

        let home_team = this.props.home_team; //both of these will be a three letter abbreviation
        let away_team = this.props.away_team;
        let home_img_src = home_team+"_logo"; 
        let away_img_src = away_team+"_logo";
        let game_stadium = teamStadiums[this.props.home_team];
        let game_city = teamCities[this.props.home_team];

        let game_date = this.props.start_time.substring(0,10)
        let eng_game_date = dateConvert(game_date)

        if (home_team)
        
        return(       
                <div className="NextGameCard-container1">
                  <div className = "NextGameCard-matchup">
                    <div className = "NextGameCard-teamContainerTop">
                      <img className="NextGameGard-logo" src={teamLogos[away_img_src]}/>
                      <h1 className="NextGameCard-abbrev">{this.props.away_team}</h1>
                    </div>
                    <div className = "NextGameCard-teamContainerBottom">
                      <img className="NextGameGard-logo" src={teamLogos[home_img_src]}/>
                      <h1 className="NextGameCard-abbrev">{this.props.home_team}</h1>
                    </div>
                  </div>
                  <div className="NextGameCard-setting">
                    <div className="NextGameCard-time">{eng_game_date} {convertMilitary(this.props.start_time.split(' ')[1])} ET</div>
                    <div className="NextGameCard-time"> {game_stadium}</div>
                    <div className="NextGameCard-time"> {game_city}</div>
                  </div>
                </div>
             );
   
  }}         
    export default NextGameCard;