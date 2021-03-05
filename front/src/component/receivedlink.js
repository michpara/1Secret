import { NavLink } from "react-router-dom";
import {ProgressBar, input} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Timer from "react-compound-timer";

const ReceivedLink = (props) => {
  const history = useHistory();

  const currTime = (new Date).getTime() / 1000;

  const [title, setTitle] = useState("");
  const [fields, setField] = useState([]);
  const [remainingTime, setRemainingTime] = useState(null);
  const [creationTime, setCreationTime] = useState(null);
  const [expiryTime, setExpiryTime] = useState(null);


  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    let res = await axios.get(`http://localhost:8080/api/v1/secret/${props.secretId}`);  

    if (res.status != 200) {
      history.push({
        pathname: '/expired'
      });
      return;
    }

    let resdata = res.data;
    
    setRemainingTime(resdata.expiry_time - currTime);
    setExpiryTime(resdata.expiry_time);
    setCreationTime(resdata.creation_time);

    setTitle(resdata.title);
    setField(resdata.fields);
    setLoading(false);
    
    console.log(expiryTime - creationTime);
    
    console.log(((expiryTime - currTime))/(expiryTime - creationTime));
  }, []);

  if (loading == true) {
    return <div>loading</div>
  } else {
    return (
      <div>
        <p className="mute-text"  style={{ "font-weight": "700" }}> 
          <Timer     initialTime={remainingTime * 1000}
            direction="backward" lastUnit="m">
            <Timer.Minutes /> 
          </Timer> min left 
        </p>
        <ProgressBar animated now={((expiryTime - currTime)/(expiryTime - creationTime)) * 100} />
        <br></br>
        <h2>You've received a secret for {title}</h2>
        <p>Received from:</p>
        <textarea class="inputNarrow" value={fields.length > 0 ? fields[0].value : ""}></textarea>
        <p>Password:</p>
        <input type="password" className="inputNarrow" value={fields.length > 0 ? fields[1].value : ""}></input>
        <p className="expiration-time">This link will expire in <span> </span>
          <Timer     initialTime={remainingTime  * 1000}
            direction="backward" lastUnit="m">
            <Timer.Minutes /> minutes <span> </span>
            <Timer.Seconds /> seconds 
          </Timer>
          </p> 
        <br></br>
      </div>
    );
  }
};

export default ReceivedLink;
