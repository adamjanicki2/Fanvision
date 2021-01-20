import React, { Component } from "react";
import "./ResultGameCard.css";
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


class ResultGameCard extends Component {
    constructor(props) {
      super(props);
    }

    componentDidMount(){

    }

    getWinner (){
        const home_score = this.props.home_team_score;
        const away_score = this.props.away_team_score;
        if (home_score>away_score){
            return this.props.home_team;
        } else if (home_score<away_score){
            return this.props.away_team;
        } else {
            return "TIE"
        }}

    getMargin () {
        return Math.abs(this.props.home_team_score-this.props.away_team_score);
    }

    render() {
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

        let css_points = this.props.points_earned === 0? "Result-loss" : "Result-win";

        let home_img_src = this.props.home_team+"_logo"; 
        let away_img_src = this.props.away_team+"_logo";
        return(
            <>
                <div className="ResultGameCard-container">
                    <div className = "NextGameCard-logosContainer">
                      <img className="NextGameGard-logo" src={teamLogos[away_img_src]}/>
                      <img className="NextGameGard-logo" src={teamLogos[home_img_src]}/>
                    </div>
                    <div>{this.props.away_team} vs {this.props.home_team}</div>
                    <div className="ResultGameCard-scoreIdentifier">Final Score:</div>
                    <div className="ResultGameCard-scoreActual">{this.props.away_team_score} - {this.props.home_team_score}</div>
                    <div className="ResultGameCard-scoreIdentifier">Your Prediction:</div>
                    <div className="ResultGameCard-scorePredicted">{this.props.predicted_winner} by {this.props.predicted_margin}</div>
                    <div className="ResultGameCard-scoreIdentifier">Actual Result:</div>
                    <div className="ResultGameCard-scorePredicted">{this.getWinner()} by {this.getMargin()}</div>
                    <div className="ResultGameCard-scoreIdentifier">Points Earned:</div>
                    <div className={css_points}>{this.props.points_earned}</div>
                    <div className="ResultGameCard-pointBreakdown">{this.props.points_breakdown}</div>
                </div> 
            </>
        );
    }}
    export default ResultGameCard;