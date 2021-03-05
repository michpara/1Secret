import logo from "./logo.svg";
import mainImg from "./assets/1secretimg.png";
import { NavLink, Switch, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import HomePage from "./component/homepage.js";

const App = () => (
  <div className="app">
    <h1 style={{ "text-align": "center" }}>1Secret</h1>
    <Main />
  </div>
);

const Main = () => (
  <Switch>
    <Route exact path="/" component={Home}></Route>
    <Route exact path="/link" component={Link}></Route>
  </Switch>
);

const Home = () => (
  <div className="home center">
    <Container>
      <Row>
        <Col>
          <HomePage></HomePage>
        </Col>
        <Col>
          <img src={mainImg} alt="main-img" class="mainpage-img center" />
        </Col>
      </Row>
    </Container>
  </div>
);

const Link = () => (
  <div className="link">
    <NavLink exact activeClassName="current" to="/">
      Generate Another Link
    </NavLink>
    <h1>Link</h1>
    <p>
      Ipsum dolor dolorem consectetur est velit fugiat. Dolorem provident
      corporis fuga saepe distinctio ipsam? Et quos harum excepturi dolorum
      molestias?
    </p>
    <p>
      Ipsum dolor dolorem consectetur est velit fugiat. Dolorem provident
      corporis fuga saepe distinctio ipsam? Et quos harum excepturi dolorum
      molestias?
    </p>
  </div>
);

export default App;
