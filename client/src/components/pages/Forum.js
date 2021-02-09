import React, { Component } from "react";
import '../../utilities.css';
import "./Forum.css";
import PostCard from "../modules/PostCard.js";
import PostInput from "../modules/PostInput.js";
import { get, post } from "../../utilities.js";

class Forum extends Component {
  constructor(props) {
    super(props);
    this.state = {
        user: undefined,
    }
  }

  componentDidMount(){
    get("/api/whoami").then((user) => {
        this.setState({user: user});
    });
  };
  render() {
    return (

      
        <div>
          <h1 className='u-textCenter'>Forum!</h1>
          <PostInput></PostInput>
          <PostCard user='Kevin LeBryant' title="LeBron Hater"></PostCard>
          <PostCard user='Kevin LeBryant' title="LeBron Hater"></PostCard>
          <PostCard user='Kevin LeBryant' title="LeBron Hater"></PostCard>
          <PostCard user='Kevin LeBryant' title="LeBron Hater"></PostCard>
        </div>
        
      
    );
  }
}
export default Forum;
