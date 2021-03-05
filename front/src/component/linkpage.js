import { NavLink } from "react-router-dom";
import ProgressBar from "react-bootstrap/ProgressBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faCopy } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import Timer from "react-compound-timer";
import Row from "react-bootstrap/Row";

const LinkPage = (props) => {
  const [copied, setCopyStatus] = useState(false);

  const creationTime = props.data.creation_time; 
  const expiryTime = props.data.expiry_time;

  const currTime = new Date().getTime();
  const curr = new Intl.DateTimeFormat("en-US", {
    hour: 'numeric',
    minute: 'numeric'
  }).format(currTime);
  let remainingTime = props.data.expiry_time * 1000 - currTime;
  const url = `http://localhost:3000/receivedlink/${props.data.id}`;

  const copyCodeToClipboard = () => {
    navigator.clipboard.writeText(url);
    setCopyStatus(true);
  };

    return (
      <div>
        <p className="mute-text" style={{ "font-weight": "700" }}>
          <Timer initialTime={remainingTime} direction="backward" lastUnit="m">
            <Timer.Minutes />
          </Timer>{" "}
          min left{" "}
        </p>
  
        <ProgressBar animated now={((expiryTime - (currTime/1000))/(expiryTime - creationTime)) * 100} />
        <br></br>
        {props.data.expiry_time === 0 ? (
          <React.Fragment>
            <h2 style={{ "font-weight": "700" }}>
              Your 1Secret Link is ready to share
            </h2>
            <input class="input"></input>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Row>
              <input value={url}></input>
              <div
                onClick={() => {
                  copyCodeToClipboard();
                }}
                class="copy"
              >
                <FontAwesomeIcon icon={faCopy} />
              </div>
            </Row>
          </React.Fragment>
        )}
  
        {props.data.expiry_time === 0 ? (
          <p className="expiration-time">
            To resend your password, please generate another link.
          </p>
        ) : (
          <p className="expiration-time">
            This link will expire in <span> </span>
            <Timer initialTime={remainingTime} direction="backward" lastUnit="m">
              <Timer.Minutes /> minutes <span> </span>
              <Timer.Seconds /> seconds
            </Timer>
          </p>
        )}
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
  
        {copied ? <div className="copied">Copied at {curr}</div> : null}
      </div>
    );
};

export default LinkPage;
