import React, { Component } from "react";
import './NotFound.css';
class NotFound extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div className="NotFound-header">
          <header className="NotFound-headerText">404 Not Found</header>
          <h3 className="NotFound-headersubText">Oops! The requested page "{window.location.pathname}" could not be found.</h3>
        </div>
      
    );
  }
}

export default NotFound;
