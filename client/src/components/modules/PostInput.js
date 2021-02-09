import React, { Component } from "react";
import "./PostInput.css";
import { convertMilitary, dateConvert } from '../../utilities.js';

class PostInput extends Component {
    constructor(props) {
      super(props);


      
    }

    componentDidMount(){
        
      }

      

    render() {
       return (
       <div className='PostInput-container'>
           <input className='PostInput-inputBox' placeholder='Type here to create a new forum post'></input>
           <button className='PostInput-button'>Post</button>
        </div>)
        
  }}         
    export default PostInput;