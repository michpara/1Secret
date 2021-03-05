import right from "../assets/right.png";
import left from "../assets/left.png";
import errorcode from "../assets/404.png";
import text from "../assets/404text.png";
import Col from "react-bootstrap/Col";

const ErrorPage = () => {
  return (
    <div>
      <img src={left} class="left" />
      <img src={right} class="right" />
      <div className="center" style={{ "text-align": "center" }}>
        <div className="center">
          <Col>
            <img src={errorcode} style={{ margin: "20px" }} />
            <img src={text} />
          </Col>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
