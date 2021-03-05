import { NavLink } from "react-router-dom";
import ProgressBar from "react-bootstrap/ProgressBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

let number = 25;

const ReceivedLink = () => {
  return (
    <div>
      <p className="mute-text"> {number} min left</p>
      <ProgressBar animated now={45} />
      <br></br>
      <h2>You've received a secret.</h2>
      <textarea class="input"></textarea>
      <p className="expiration-time">Your password will disappear in {number} mins.</p>
      <br></br>
    </div>
  );
};

export default ReceivedLink;
