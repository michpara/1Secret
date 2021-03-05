import { NavLink } from "react-router-dom";
import ProgressBar from "react-bootstrap/ProgressBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import React from 'react';
import Timer from "react-compound-timer";



const LinkPage = (props) => {
  const currTime = (new Date).getTime();
  let remainingTime = (props.data.expiry_time * 1000) - currTime;
  const url = `http://localhost:3000/receivedlink/${props.data.id}`
  return (
    <div>
      <p className="mute-text"  style={{ "font-weight": "700" }}> 
        <Timer     initialTime={remainingTime}
          direction="backward" lastUnit="m">
          <Timer.Minutes /> 
        </Timer> min left </p>
        

        <ProgressBar animated now={} />
        <br></br>
        {props.data.expiry_time === 0 ? 
        <React.Fragment> 
       
        <h2 style={{ "font-weight": "700" }}>
          Your 1Secret Link is expired
        </h2>
        <textarea class="input"></textarea>  
        </React.Fragment> :
      <React.Fragment> 
       
      <h2 style={{ "font-weight": "700" }}>
        Your 1Secret Link is ready to share
      </h2>
      <textarea class="input">{url}</textarea>  
      </React.Fragment>}
      
      {props.data.expiry_time === 0 ? <p className="expiration-time">To resend your password, please generate another link.
        </p> : <p className="expiration-time">This link will expire in <span> </span>
        <Timer     initialTime={remainingTime}
          direction="backward" lastUnit="m">
          
          <Timer.Minutes /> minutes <span> </span>
          <Timer.Seconds /> seconds 
        
        </Timer>
        </p> }
 
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
