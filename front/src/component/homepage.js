import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import { NavLink } from "react-router-dom";

const HomePage = () => {
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
            <textarea class="input"></textarea>
            <br></br>
            <Row style={{ margin: "10px 1px" }}>
              <p className="mute-text expires-spacing">Expires in: </p>
              <select name="time" class="dropdown">
                <option>15 mins</option>
                <option>30 min</option>
                <option>1 hour</option>
                <option>3 hours</option>
                <option>6 hours</option>
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
