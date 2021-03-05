import { NavLink } from "react-router-dom";
import ProgressBar from "react-bootstrap/ProgressBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import Timer from "react-compound-timer";
import React from "react";


let number = 25;
let value = 100000000;
let init = 10000000000;

const LinkPage = (props) => {
  return (
    <div>
      <p className="mute-text"  style={{ "font-weight": "700" }}> 
        <Timer     initialTime={value}
          direction="backward" lastUnit="m">
          <Timer.Minutes /> 
        </Timer> min left </p>
        
      <ProgressBar animated now={value} />
      <br></br>
      <h2 style={{ "font-weight": "700" }}>
        Your 1Secret Link is ready to share
      </h2>
      <textarea class="input"></textarea>
      <p className="expiration-time">This link will expire in <span> </span>
        <Timer     initialTime={value}
          direction="backward" lastUnit="m">
          
          <Timer.Minutes /> minutes <span> </span>
          <Timer.Seconds /> seconds 
        
        </Timer>
        </p> 
      <br></br>
       
       
       
      

      <br></br>
      <NavLink
        exact
        activeClassName="current"
        style={{ "font-family": "Raleway" }}
        to="/"
      >
        Generate Another Link <FontAwesomeIcon icon={faChevronRight} />
      </NavLink>

    </div>
  );
};



export default LinkPage;
