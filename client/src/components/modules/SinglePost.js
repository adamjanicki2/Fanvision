import React, { Component } from "react";
import "./SinglePost.css";
import { convertMilitary, dateConvert } from '../../utilities.js';

class PostCard extends Component {
    constructor(props) {
      super(props);


      
    }

    componentDidMount(){
        
      }

      

    render() {
       return (
       <div className='PostCard-container'>
           <div className='PostCard-postTitle'>{this.props.title}</div>
           <div className='PostCard-username'>{this.props.user} posted at 02/08/21 12:00</div>
           <div className='PostCard-message'>I cannot believe this. As a lifelong NBA fan it’s disappointing to see LeFraud get a Mickey Mouse ring this year. Le3-6 needs to go cry to the refs to win game and get carried by AD. LeBum isn’t top 25 all time. Steph curry owns LeTrash in the Finals. Absolute Joke. Not my Goat.</div>
        </div>)
        
  }}         
    export default PostCard;