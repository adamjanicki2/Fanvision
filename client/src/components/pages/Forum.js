import React, { Component } from "react";
import '../../utilities.css';
import "./Forum.css";
import SinglePost from "../modules/SinglePost.js";
import PostInput from "../modules/PostInput.js";
import SingleComment from "../modules/SingleComment.js";
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
          <SinglePost user='Kevin LeBryant' title="LeBron Hater"></SinglePost>
          <SingleComment user="Lebron James"></SingleComment>
          <SinglePost user='Kevin LeBryant' title="LeBron Hater"></SinglePost>
          <SinglePost user='Kevin LeBryant' title="LeBron Hater"></SinglePost>
          <SinglePost user='Kevin LeBryant' title="LeBron Hater"></SinglePost>
        </div>
        
      
    );
  }
}
export default Forum;
