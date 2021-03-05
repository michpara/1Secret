import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import { NavLink } from "react-router-dom";
import axios from 'axios';
import React, { useState } from 'react';

const HomePage = () => {
  const [expireTime, setExpireTime] = useState(15);
  const [sharelink, setSharelink] = useState("");

  const changeExpireTime = (e) => {
    setExpireTime(parseInt(e.target.value, 10) * 60);
  }

  const changeSharelink = (e) => {
    setSharelink(e.target.value);
  }

  const generateLink = async (e) => {
    e.preventDefault();
    let data = {
      link: sharelink, 
      expiry_time: expireTime,
    }
    let res = await axios.post('http://localhost:8080/api/v1/generate', data);
    // let res = await axios.get('http://localhost:8080/api/v1/secret/1');


    let resdata = res.data;
    console.log(resdata);
  }

  return (
    <div>
      <Card className="box" style={{ "border-radius": "30px" }}>
        <Card.Body>
          <Card.Title>
            <h2>Your secret is safe with us.</h2>
          </Card.Title>
          <Card.Text>
            <p>
              Go ahead and share your passwords safely and securely with
              time-sensitive, shareable links. You control how others can access
              your shared information outside of 1Password.
            </p>
            <br></br>
            <p className="mute-text">Paste your 1Password ShareLink here:</p>
            <textarea class="input" onChange={changeSharelink}></textarea>
            <br></br>
            <Row style={{ margin: "10px 1px" }}>
              <p className="mute-text">Expires in: </p>
              <select name="time" class="dropdown" onChange={changeExpireTime}> 
                <option value={15}>15 min</option>
                <option value={30}>30 min</option>
                <option value={60}>1 hour</option>
                <option value={180}>3 hours</option>
                <option value={360}>6 hours</option>
              </select>
            </Row>
          </Card.Text>
          <NavLink
            exact
            activeClassName="current"
            to="/link"
            className="navlink"
          >
            <Button
              variant="primary"
              style={{
                "border-radius": "50px",
                padding: "10px 50px",
                "background-color": "#0572EC",
              }}
              onClick={generateLink}
            >
              Generate Link
            </Button>
          </NavLink>
        </Card.Body>
      </Card>{" "}
    </div>
  );
};

export default HomePage;
