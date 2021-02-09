import React, { Component } from "react";
import "./SingleComment.css";
import { convertMilitary, dateConvert } from '../../utilities.js';

class SingleComment extends Component {
    constructor(props) {
      super(props);


      
    }

    componentDidMount(){
        
      }

      

    render() {
       return (
       <div className='PostInput-container'>
          {this.props.user} You a hater.
        </div>)
        
  }}         
    export default SingleComment;