import { NavLink } from "react-router-dom";
import ProgressBar from "react-bootstrap/ProgressBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

let number = 25;

const LinkPage = () => {
  return (
    <div>
      <p className="mute-text" style={{ "font-weight": "700" }}>
        {" "}
        {number} min left
      </p>
      <ProgressBar animated now={45} />
      <br></br>
      <h2 style={{ "font-weight": "700" }}>
        Your 1Secret Link is ready to share
      </h2>
      <textarea class="input"></textarea>
      <p>This link will expire in {number} min.</p>
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
