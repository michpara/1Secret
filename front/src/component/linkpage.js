import { NavLink } from "react-router-dom";
import ProgressBar from "react-bootstrap/ProgressBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

let number = 25;

const LinkPage = () => {
  return (
    <div>
      <p className="mute-text"> {number} min left</p>
      <ProgressBar animated now={45} />
      <br></br>
      <h2>Link</h2>
      <textarea class="input"></textarea>
      <p className="expiration-time">This link will expire in {number} min.</p>
      <br></br>
      <br></br>
      <NavLink exact activeClassName="current" to="/">
        Generate Another Link <FontAwesomeIcon icon={faChevronRight} />
      </NavLink>
    </div>
  );
};

export default LinkPage;
