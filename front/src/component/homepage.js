import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import { NavLink } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      <Card className="box" style={{ "border-radius": "8px" }}>
        <Card.Body>
          <h2 style={{ "font-weight": "900" }}>Your secret is safe with us.</h2>
          <Card.Text>
            <p>
              Control how others can access your shared information outside of
              1Password with time sensitive, sharable links.
            </p>
            <br></br>
            <p className="mute-text" style={{ "font-weight": "700" }}>
              Paste your 1Password ShareLink here:
            </p>
            <textarea class="input"></textarea>
            <br></br>
            <Row style={{ margin: "10px 1px" }}>
              <p
                className="mute-text expires-spacing"
                style={{ "font-weight": "700" }}
              >
                Expires in:{" "}
              </p>
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
